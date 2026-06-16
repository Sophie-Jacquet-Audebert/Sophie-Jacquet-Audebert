// supabase/functions/send-notification/index.ts
// Edge Function : envoie un email via Resend lors d'un nouveau contact ou RDV.
// Appelée par un trigger DB (webhook) ou directement depuis le front après insertion.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM_EMAIL = Deno.env.get("NOTIFY_FROM_EMAIL") ?? "notifications@votre-domaine.fr";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Payload = {
  type: "contact" | "appointment";
  record: Record<string, unknown>;
};

function buildEmail(payload: Payload): { subject: string; html: string } {
  const r = payload.record;

  if (payload.type === "contact") {
    return {
      subject: `Nouveau message de contact — ${r.prenom} ${r.nom}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>De :</strong> ${r.prenom} ${r.nom} (${r.email})</p>
        <p><strong>Téléphone :</strong> ${r.telephone ?? "—"}</p>
        <p><strong>Motif :</strong> ${r.motif}</p>
        <p><strong>Source :</strong> ${r.source ?? "—"}</p>
        <p><strong>Message :</strong></p>
        <p>${String(r.message).replace(/\n/g, "<br/>")}</p>
      `,
    };
  }

  return {
    subject: `Nouvelle demande de rendez-vous — ${r.prenom} ${r.nom}`,
    html: `
      <h2>Nouvelle demande de rendez-vous</h2>
      <p><strong>Date :</strong> ${r.date} à ${r.heure}</p>
      <p><strong>Motif :</strong> ${r.motif}</p>
      <p><strong>Patient(e) :</strong> ${r.prenom} ${r.nom}</p>
      <p><strong>Email :</strong> ${r.email}</p>
      <p><strong>Téléphone :</strong> ${r.telephone ?? "—"}</p>
    `,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload: Payload = await req.json();

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Lit les préférences de notification + email destinataire dans settings
    const { data: settings, error: settingsError } = await supabase
      .from("settings")
      .select("notify_email, notify_on_contact, notify_on_appointment")
      .eq("id", 1)
      .single();

    if (settingsError || !settings?.notify_email) {
      return new Response(
        JSON.stringify({ skipped: true, reason: "no notify_email configured" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const shouldNotify =
      payload.type === "contact" ? settings.notify_on_contact : settings.notify_on_appointment;

    if (!shouldNotify) {
      return new Response(JSON.stringify({ skipped: true, reason: "notifications disabled" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { subject, html } = buildEmail(payload);

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: settings.notify_email,
        subject,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      return new Response(JSON.stringify({ error: errText }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ sent: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

/*
DEPLOIEMENT :
  supabase secrets set RESEND_API_KEY=re_xxx NOTIFY_FROM_EMAIL="Sophie Jacquet-Audebert <notifications@votredomaine.fr>"
  supabase functions deploy send-notification

APPEL DEPUIS LE FRONT (après insertion contact/RDV) :
  await supabase.functions.invoke('send-notification', {
    body: { type: 'contact', record: insertedRow }
  })
*/
