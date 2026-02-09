import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AppLayout from "./components/layout/AppLayout";

import OrgSelect from "./pages/OrgSelect";
import TemplateList from "./pages/TemplateList";
import TemplateCreateEdit from "./pages/TemplateCreateEdit";
import TemplatePreview from "./pages/TemplatePreview";
import UserList from "./pages/UserList";

function App() {
  const { user, activeOrg, isSystem, isAdmin } = useAuth();

  // Non-system users must select org
  if (!isSystem && !activeOrg) {
    return <OrgSelect />;
  }

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* Redirect root */}
          <Route path="/" element={<Navigate to="/templates" />} />

          {/* Templates */}
          <Route path="/templates" element={<TemplateList />} />
          <Route
            path="/templates/:id/preview"
            element={<TemplatePreview />}
          />

          {/* Create / Edit – SYSTEM & ADMIN only */}
          {(isSystem || isAdmin) && (
            <>
              <Route
                path="/templates/create"
                element={<TemplateCreateEdit />}
              />
              <Route
                path="/templates/:id/edit"
                element={<TemplateCreateEdit />}
              />
            </>
          )}

          {/* Users – SYSTEM & ADMIN only */}
          {(isSystem || isAdmin) && (
            <Route path="/users" element={<UserList />} />
          )}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/templates" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
