-- ============================================================
-- Actualités : visuel d'illustration + reprise des contenus
-- (rencontre de l'ancien site + immersion "Prendre sa place")
-- ============================================================

-- ---------- Visuel optionnel sur les articles ----------
alter table public.articles
  add column if not exists image_url text;

comment on column public.articles.image_url is
  'Chemin ou URL du visuel illustrant l''article (ex : /immersion-prendre-sa-place.jpg). NULL = pas de visuel.';

-- ---------- Immersion "Prendre sa place" ----------
insert into public.articles
  (category, title, subtitle, text, tags, info, status, icon, image_url, published, sort_order)
select
  'Immersion',
  'Immersion : prendre sa place',
  'Et si tout commençait par la naissance ?',
  $a$Comprendre d'où je viens pour mieux avancer. Découvrir l'impact des premières empreintes de vie.

Au programme : travail individuel et en groupe, enseignements, ateliers créatifs, mise en mouvement du corps, hypnose, méditation, mémoire cellulaire, breathwork.

Points clés : trouver le sens des premières empreintes de vie, découvrir mes besoins, connaître mes fondations pour mieux atteindre mon potentiel.

Animée par Perrine Gillet, thérapeute hypnose et EMDR, et Sophie Jacquet-Audebert, psychologue clinicienne et thérapeute en mémoire cellulaire.

Lieu : 16 rue des Cognots, 89400 Ormoy. Accès : gare de Laroche-Migennes, A6 sortie 18 depuis Paris, A6 sortie 19 depuis Dijon ou Lyon.$a$,
  array['Hypnose', 'Méditation', 'Mémoire cellulaire', 'Breathwork', 'Ateliers créatifs'],
  'Du mercredi 7 octobre 16h au dimanche 11 octobre 11h · Ormoy (89) · 500 € dont 50 € à l''inscription · 10 participants maximum',
  'Inscriptions ouvertes',
  '◇',
  '/immersion-prendre-sa-place.jpg',
  true,
  1
where not exists (
  select 1 from public.articles where title = 'Immersion : prendre sa place'
);

-- ---------- Rencontre reprise de l'ancien site ----------
insert into public.articles
  (category, title, subtitle, text, tags, info, status, icon, image_url, published, sort_order)
select
  'Rencontre',
  'Petits outils de base pour Êtres Humains',
  'Un petit tour au pays de vous-même, pour cheminer plus léger dans la vie',
  $a$Cette rencontre de 2h vous propose de faire un petit tour au pays de vous-même afin de cheminer plus léger dans la vie.

Lors de cette entrevue, je partage quelques outils de vie, ces « facilitateurs de bien-être » que j'ai rencontrés, observés, compris, et qu'il me semble important de vous transmettre. J'essaie aussi de mettre en lumière les cachettes favorites des vieilleries encombrantes que nous traînons, nous autres les humains.

Cette petite pause vous offre la possibilité de distinguer ce qui, du passé, peut être déposé, mais aussi ce dont vous pouvez vous saisir aujourd'hui.$a$,
  array['Connaissance', 'Discernement', 'Vivre conscient', 'Responsable', 'Centré'],
  'Chez vous, jusqu''à 15 personnes · Durée 2h',
  'Sur demande',
  '◇',
  null,
  true,
  2
where not exists (
  select 1 from public.articles where title = 'Petits outils de base pour Êtres Humains'
);
