import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import LoginPage from './features/auth/LoginPage';
import DashboardPage from './features/dashboard/DashboardPage';
import VotersPage from './features/voters/VotersPage';
import VolunteersPage from './features/volunteers/VolunteersPage';
import CampaignsPage from './features/campaigns/CampaignsPage';
import PlaceholderPage from './features/misc/PlaceholderPage';

function ProtectedRoute({ children, roles }) {
  const { token, user } = useSelector((state) => state.auth);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/app" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="voters" element={<VotersPage />} />
        <Route path="volunteers" element={<VolunteersPage />} />
        <Route path="campaigns" element={<CampaignsPage />} />
        <Route
          path="funds"
          element={
            <ProtectedRoute roles={['admin', 'manager']}>
              <PlaceholderPage title="Fund Management" />
            </ProtectedRoute>
          }
        />
        <Route path="grievances" element={<PlaceholderPage title="Grievance & Feedback" />} />
        <Route path="analytics" element={<PlaceholderPage title="Analytics & Reports" />} />
        <Route path="media" element={<PlaceholderPage title="Media & Content Management" />} />
        <Route
          path="settings"
          element={
            <ProtectedRoute roles={['admin']}>
              <PlaceholderPage title="Settings" />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
}


