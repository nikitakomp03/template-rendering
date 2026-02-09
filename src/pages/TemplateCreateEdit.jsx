import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export const SCOPES = {
  SYSTEM: "SYSTEM",
  ORG: "ORG",
  USER: "USER",
};

const mockTemplates = [
  {
    id: "1",
    name: "Welcome Email",
    key: "WELCOME_EMAIL",
    type: "EMAIL",
    scope: SCOPES.SYSTEM,
    status: "ACTIVE",
    content: "<h1>Welcome {{name}}</h1>",
  },
  {
    id: "2",
    name: "Reset Password",
    key: "RESET_PASSWORD",
    type: "EMAIL",
    scope: SCOPES.ORG,
    status: "ACTIVE",
    content: "<p>Reset link: {{link}}</p>",
  },
];

function TemplateCreateEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isEdit = Boolean(id);
  const template = isEdit
    ? mockTemplates.find((t) => t.id === id)
    : null;

  // ✅ ALL HOOKS FIRST (NO CONDITIONS ABOVE THIS)
  const [name, setName] = useState(template?.name || "");
  const [key, setKey] = useState(template?.key || "");
  const [type, setType] = useState(template?.type || "EMAIL");
  const [scope, setScope] = useState(template?.scope || SCOPES.ORG);
  const [content, setContent] = useState(template?.content || "");

  // ---------------- PERMISSIONS ----------------
  const canManage =
    user?.is_super_admin || user?.role === "ADMIN";

  if (!canManage) {
    return <div className="alert alert-danger">Access Denied</div>;
  }

  if (isEdit && !template) {
    return <div className="alert alert-danger">Template not found</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      key,
      type,
      scope,
      content,
      mode: isEdit ? "EDIT" : "CREATE",
    });

    navigate("/");
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header">
        <h5 className="mb-0">
          {isEdit ? "Edit Template" : "Create Template"}
        </h5>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Template Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Key */}
          <div className="mb-3">
            <label className="form-label">Template Key</label>
            <input
              className="form-control"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              disabled={isEdit}
              required
            />
          </div>

          {/* Type */}
          <div className="mb-3">
            <label className="form-label">Template Type</label>
            {isEdit ? (
              <span className="badge bg-secondary">{type}</span>
            ) : (
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="EMAIL">EMAIL</option>
                <option value="SMS">SMS</option>
                <option value="PUSH">PUSH</option>
              </select>
            )}
          </div>

          {/* Scope */}
          <div className="mb-3">
            <label className="form-label">Scope</label>
            {isEdit ? (
              <span className="badge bg-dark">{scope}</span>
            ) : (
              <select
                className="form-select"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
              >
                {user.is_super_admin && (
                  <option value={SCOPES.SYSTEM}>SYSTEM</option>
                )}
                <option value={SCOPES.ORG}>ORG</option>
                <option value={SCOPES.USER}>USER</option>
              </select>
            )}
          </div>

          {/* Content */}
          <div className="mb-3">
            <label className="form-label">Template Content</label>
            <textarea
              className="form-control"
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary">
            {isEdit ? "Update Template" : "Create Template"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TemplateCreateEdit;
