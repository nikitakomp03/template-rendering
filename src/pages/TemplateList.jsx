import React from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const templates = [
  {
    id: 1,
    name: "Welcome Email",
    key: "WELCOME_EMAIL",
    type: "EMAIL",
    scope: "SYSTEM",
  },
  {
    id: 2,
    name: "Reset Password",
    key: "RESET_PASSWORD",
    type: "EMAIL",
    scope: "ORG",
  },
  {
    id: 3,
    name: "OTP SMS",
    key: "OTP_SMS",
    type: "SMS",
    scope: "USER",
  },
];

function TemplateList() {
  const { user } = useAuth();

  const canEditTemplate = (templateScope) => {
    if (user.role === "SYSTEM_ADMIN") {
      return templateScope === "SYSTEM" || templateScope === "ORG";
    }

    if (user.role === "ORG_ADMIN") {
      return templateScope === "ORG";
    }

    return false;
  };

  const renderScopeBadge = (scope) => {
    const variant =
      scope === "SYSTEM"
        ? "dark"
        : scope === "ORG"
        ? "primary"
        : "secondary";

    return <Badge bg={variant}>{scope}</Badge>;
  };

  return (
    <div>
      <h3 className="mb-4">Templates</h3>

      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Key</th>
            <th>Type</th>
            <th>Scope</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {templates.map((template, index) => (
            <tr key={template.id}>
              <td>{index + 1}</td>
              <td>{template.name}</td>
              <td>{template.key}</td>
              <td>{template.type}</td>
              <td>{renderScopeBadge(template.scope)}</td>
              <td>
                <Link
                  to={`/templates/${template.id}/preview`}
                  className="btn btn-sm btn-outline-secondary me-2"
                >
                  Preview
                </Link>

                {canEditTemplate(template.scope) && (
                  <Link
                    to={`/templates/${template.id}/edit`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Edit
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TemplateList;

