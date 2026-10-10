import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { AuthProvider } from './components/AuthProvider'
import { Layout } from './components/Layout'
import { UniversityProvider } from './components/UniversityProvider'
import Community from './pages/Community'
import Feed from './pages/Feed'
import Hub from './pages/Hub'
import Login from './pages/Login'
import More from './pages/More'

export default function App() {
  return (
    <UniversityProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/hub" element={<Hub />} />
              <Route path="/community" element={<Community />} />
              <Route path="/more" element={<More />} />
              <Route path="*" element={<Navigate to="/feed" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </UniversityProvider>
  )
}
