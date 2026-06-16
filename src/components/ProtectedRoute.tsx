import type { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'
import Login from '../pages/Login'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="login-screen">
        <p className="text-muted">Chargement…</p>
      </div>
    )
  }

  if (!session) return <Login />

  return <>{children}</>
}
