import { Outlet } from 'react-router'
import { Header } from './Header'
import { TabBar } from './TabBar'

/** Mobile app frame: sticky header, scrollable page, fixed bottom tab bar. */
export function Layout() {
  return (
    <div className="mx-auto min-h-dvh max-w-md bg-page">
      <Header />
      <main className="flex flex-col gap-6 px-4 pt-6 pb-28">
        <Outlet />
      </main>
      <TabBar />
    </div>
  )
}
