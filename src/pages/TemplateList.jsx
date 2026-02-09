import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const templates = [
  {
    id: 1,
    name: "Welcome Email",
    key: "WELCOME_EMAIL",
    type: "EMAIL",
    scope: "SYSTEM",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "OTP SMS",
    key: "OTP_SMS",
    type: "SMS",
    scope: "ORG",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Invoice PDF",
    key: "INVOICE_PDF",
    type: "PDF",
    scope: "ADMIN",
    status: "INACTIVE",
  },
];

const typeConfig = {
  EMAIL: {
    label: "Email",
    color: "#e7f1ff",
    text: "#0d6efd",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
  },
  SMS: {
    label: "SMS",
    color: "#e9f7ef",
    text: "#198754",
    icon: "https://cdn-icons-png.flaticon.com/512/2462/2462719.png",
  },
  PUSH: {
    label: "Push",
    color: "#fff3cd",
    text: "#ffc107",
    icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
  },
  PDF: {
    label: "PDF",
    color: "#fdecea",
    text: "#dc3545",
    icon: "https://cdn-icons-png.flaticon.com/512/337/337946.png",
  },
};

const scopeConfig = {
  SYSTEM: { label: "System", bg: "#f3e8ff", text: "#6f42c1" },
  ORG: { label: "Org", bg: "#e7f1ff", text: "#0d6efd" },
  ADMIN: { label: "Admin", bg: "#e9f7ef", text: "#198754" },
  USER: { label: "User", bg: "#f8f9fa", text: "#6c757d" },
};

export default function TemplatesList() {
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [scopeFilter, setScopeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // ✅ FINAL permission logic
  const canManageTemplates =
    user?.is_super_admin || user?.role === "ADMIN";

  const handleDelete = (id) => {
    if (window.confirm("Delete this template?")) {
      console.log("Deleted template:", id);
    }
  };

  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.key.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "ALL" || t.type === typeFilter;

      const matchesScope =
        scopeFilter === "ALL" || t.scope === scopeFilter;

      const matchesStatus =
        statusFilter === "ALL" || t.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesScope &&
        matchesStatus
      );
    });
  }, [search, typeFilter, scopeFilter, statusFilter]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Templates</h2>

        {canManageTemplates && (
          <Link
            to="/templates/create"
            className="btn btn-primary"
          >
            + Create Template
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="d-flex gap-3 mb-4">
        <input
          className="form-control"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select w-auto"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="ALL">All Types</option>
          <option value="EMAIL">EMAIL</option>
          <option value="SMS">SMS</option>
          <option value="PUSH">PUSH</option>
          <option value="PDF">PDF</option>
        </select>

        <select
          className="form-select w-auto"
          value={scopeFilter}
          onChange={(e) => setScopeFilter(e.target.value)}
        >
          <option value="ALL">All Scopes</option>
          <option value="SYSTEM">SYSTEM</option>
          <option value="ORG">ORG</option>
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>

        <select
          className="form-select w-auto"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Key</th>
              <th>Type</th>
              <th>Scope</th>
              <th>Status</th>
              <th className="text-end pe-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTemplates.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No templates found
                </td>
              </tr>
            ) : (
              filteredTemplates.map((t) => {
                const type = typeConfig[t.type];
                const scope = scopeConfig[t.scope];

                return (
                  <tr key={t.id}>
                    <td className="fw-semibold">{t.name}</td>
                    <td className="text-muted">{t.key}</td>

                    <td>
                      <span
                        className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill"
                        style={{ background: type.color, color: type.text }}
                      >
                        <img src={type.icon} width={16} alt="" />
                        {type.label}
                      </span>
                    </td>

                    <td>
                      <span
                        className="px-3 py-1 rounded-pill fw-medium"
                        style={{
                          background: scope.bg,
                          color: scope.text,
                        }}
                      >
                        {scope.label}
                      </span>
                    </td>

                    <td>
                      {t.status === "ACTIVE" ? (
                        <span className="badge bg-success-subtle text-success">
                          ● Active
                        </span>
                      ) : (
                        <span className="badge bg-secondary-subtle text-secondary">
                          ● Inactive
                        </span>
                      )}
                    </td>

                    <td className="text-end pe-4">
                      <Link
                        to={`/templates/${t.id}/preview`}
                        className="btn btn-sm btn-dark me-2"
                      >
                        👁 Preview
                      </Link>

                      {canManageTemplates && (
                        <>
                          <Link
                            to={`/templates/${t.id}/edit`}
                            className="btn btn-sm btn-warning me-2"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(t.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
