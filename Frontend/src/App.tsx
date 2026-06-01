import { Navigate, Route, Routes } from 'react-router-dom'
import { ControlShell } from './components/ControlShell'
import { PublicShell } from './components/PublicShell'
import { fiches, roadmaps, themeVariants } from './data/siteContent'
import { AdminPage } from './pages/AdminPage'
import { AdminPeintresPage } from './pages/AdminPeintresPage'
import { AuthPage } from './pages/AuthPage'
import { DashboardPeintrePage } from './pages/DashboardPeintrePage'
import { FicheDetailPage } from './pages/FicheDetailPage'
import { FichesPage } from './pages/FichesPage'
import { HomePage } from './pages/HomePage'
import { RoadmapDetailPage } from './pages/RoadmapDetailPage'
import { RoadmapsPage } from './pages/RoadmapsPage'
import { ThemeShowcasePage } from './pages/ThemeShowcasePage'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicShell>
            <HomePage />
          </PublicShell>
        }
      />
      <Route path="/connexion" element={<AuthPage />} />
      <Route
        path="/fiches"
        element={
          <PublicShell>
            <FichesPage />
          </PublicShell>
        }
      />
      <Route
        path="/fiches/:slug"
        element={
          <PublicShell>
            <FicheDetailPage fiches={fiches} />
          </PublicShell>
        }
      />
      <Route
        path="/roadmaps"
        element={
          <PublicShell>
            <RoadmapsPage />
          </PublicShell>
        }
      />
      <Route
        path="/roadmaps/:slug"
        element={
          <PublicShell>
            <RoadmapDetailPage roadmaps={roadmaps} fiches={fiches} />
          </PublicShell>
        }
      />
      <Route
        path="/themes"
        element={
          <PublicShell>
            <ThemeShowcasePage themeVariants={themeVariants} />
          </PublicShell>
        }
      />
      <Route
        path="/admin"
        element={
          <ControlShell>
            <AdminPage />
          </ControlShell>
        }
      />
      <Route
        path="/admin/peintres"
        element={
          <ControlShell>
            <AdminPeintresPage />
          </ControlShell>
        }
      />
      <Route
        path="/dashboard/peintre"
        element={<DashboardPeintrePage />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
