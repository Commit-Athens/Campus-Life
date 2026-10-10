import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { AgentWidget } from './AgentWidget'
import { Header } from './Header'
import { TabBar } from './TabBar'

/** Jump to the top whenever the user opens another screen in the app shell. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/** Mobile app frame: sticky header, scrollable page, fixed bottom tab bar. Requires login. */
export function Layout() {
  const { account } = useAuth()
  if (!account) return <Navigate to="/welcome" replace />

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-page">
      <ScrollToTop />
      <Header />
      <main className="flex flex-col gap-6 px-4 pt-6 pb-28">
        <Outlet />
      </main>
      <AgentWidget />
      <TabBar />
    </div>
  )
}
