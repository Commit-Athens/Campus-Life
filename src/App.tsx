import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { AuthProvider } from './components/AuthProvider'
import { Layout } from './components/Layout'
import { PointsProvider } from './components/PointsProvider'
import { Splash } from './components/Splash'
import { ThemeProvider } from './components/ThemeProvider'
import { UniversityProvider } from './components/UniversityProvider'
import Community from './pages/Community'
import Feed from './pages/Feed'
import Hub from './pages/Hub'
import Login from './pages/Login'
import More from './pages/More'
import Onboarding from './pages/Onboarding'
import Posts from './pages/Posts'
import Start from './pages/Start'

const SPLASH_MS = 1200

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), SPLASH_MS)
    return () => window.clearTimeout(timer)
  }, [])

  if (showSplash) return <Splash />

  return (
    <ThemeProvider>
      <UniversityProvider>
        <AuthProvider>
          <PointsProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/welcome" element={<Onboarding />} />
                <Route path="/start" element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route element={<Layout />}>
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/hub" element={<Hub />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/more" element={<More />} />
                  <Route path="*" element={<Navigate to="/feed" replace />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </PointsProvider>
        </AuthProvider>
      </UniversityProvider>
    </ThemeProvider>
  )
}
