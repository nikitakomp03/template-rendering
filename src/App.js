import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import OrgSelect from "./pages/OrgSelect";
import TemplateList from "./pages/TemplateList";
import TemplateCreateEdit from "./pages/TemplateCreateEdit";
import TemplatePreview from "./pages/TemplatePreview";

function App() {
  const { user, activeOrg } = useAuth();

  // Non-super-admin must select org
  if (!user?.is_super_admin && !activeOrg) {
    return <OrgSelect />;
  }

  return (
    <BrowserRouter>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<TemplateList />} />
          <Route path="/templates/create" element={<TemplateCreateEdit />} />
          <Route path="/templates/:id/edit" element={<TemplateCreateEdit />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/templates/:id/preview"element={<TemplatePreview />}
/>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
