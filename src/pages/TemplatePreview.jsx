import { useParams, Link } from "react-router-dom";

const mockTemplates = [
  {
    id: "1",
    name: "Welcome Email",
    key: "WELCOME_EMAIL",
    type: "EMAIL",
    scope: "SYSTEM",
    status: "ACTIVE",
    subject: "Welcome to our platform",
    content: `
      <p>Hello <b>{{user_name}}</b>,</p>
      <p>Welcome to our platform. We are glad to have you.</p>
      <p>Thanks,<br/>Team</p>
    `,
  },
  {
    id: "2",
    name: "OTP SMS",
    key: "OTP_SMS",
    type: "SMS",
    scope: "ORG",
    status: "ACTIVE",
    content: "Your OTP is {{otp}}",
  },
];

export default function TemplatePreview() {
  const { id } = useParams();

  // later → replace with API call
  const template = mockTemplates.find((t) => t.id === id);

  if (!template) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Template not found</div>
        <Link to="/" className="btn btn-outline-secondary mt-3">
          ← Back to Templates
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Template Preview</h2>
        <Link to="/" className="btn btn-outline-secondary">
          ← Back
        </Link>
      </div>

      {/* Meta Info */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="text-muted small">Template Name</div>
              <div className="fw-semibold">{template.name}</div>
            </div>

            <div className="col-md-4">
              <div className="text-muted small">Template Key</div>
              <div className="fw-semibold">{template.key}</div>
            </div>

            <div className="col-md-2">
              <div className="text-muted small">Type</div>
              <span className="badge bg-primary-subtle text-primary">
                {template.type}
              </span>
            </div>

            <div className="col-md-2">
              <div className="text-muted small">Scope</div>
              <span className="badge bg-secondary-subtle text-secondary">
                {template.scope}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="card shadow-sm">
        <div className="card-header bg-light fw-semibold">
          Preview Output
        </div>

        <div className="card-body">
          {template.type === "EMAIL" && (
            <>
              <div className="mb-3">
                <div className="text-muted small">Subject</div>
                <div className="fw-semibold">{template.subject}</div>
              </div>

              <div
                className="border rounded p-3 bg-white"
                dangerouslySetInnerHTML={{ __html: template.content }}
              />
            </>
          )}

          {template.type !== "EMAIL" && (
            <pre className="bg-light p-3 rounded mb-0">
              {template.content}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

