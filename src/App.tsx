import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { UniversityProvider } from './components/UniversityProvider'
import Community from './pages/Community'
import Feed from './pages/Feed'
import Hub from './pages/Hub'
import More from './pages/More'

export default function App() {
  return (
    <UniversityProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/community" element={<Community />} />
            <Route path="/more" element={<More />} />
            <Route path="*" element={<Navigate to="/feed" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UniversityProvider>
  )
}
