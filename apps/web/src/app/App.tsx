import { Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from '../components/SiteLayout';
import { HomePage, HospitalityPage, PosPage, SolutionsPage } from '../features/marketing/pages';
import { NotFoundPage } from '../features/marketing/NotFoundPage';

export function App() {
  return (
    <SiteLayout>
      <Routes>
        {/* Core Application Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/pos" element={<PosPage />} />
        <Route path="/hospitality" element={<HospitalityPage />} />

        {/* Backwards-compatible legacy .html redirects */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/solutions.html" element={<Navigate to="/solutions" replace />} />
        <Route path="/pos.html" element={<Navigate to="/pos" replace />} />
        <Route path="/hospitality.html" element={<Navigate to="/hospitality" replace />} />

        {/* Fallback 404 handler to prevent blank page on unknown routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  );
}
