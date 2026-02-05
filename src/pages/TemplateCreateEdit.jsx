import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const mockTemplate = {
  id: 1,
  name: "Welcome Email",
  key: "WELCOME_EMAIL",
  type: "EMAIL",
  scope: "SYSTEM",
};

function TemplateCreateEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    key: "",
    type: "",
    scope: "",
  });

  useEffect(() => {
    if (isEditMode) {
      // Later: fetch template by ID
      setForm({
        name: mockTemplate.name,
        key: mockTemplate.key,
        type: mockTemplate.type,
        scope: mockTemplate.scope,
      });
    }
  }, [isEditMode]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      console.log("Updating template:", form);
    } else {
      console.log("Creating template:", form);
    }

    navigate("/");
  };

  return (
    <Card>
      <Card.Body>
        <h4 className="mb-4">
          {isEditMode ? "Edit Template" : "Create Template"}
        </h4>

        <Form onSubmit={handleSubmit}>
          {/* Template Name */}
          <Form.Group className="mb-3">
            <Form.Label>Template Name</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Template Key – Only in Create */}
          {!isEditMode && (
            <Form.Group className="mb-3">
              <Form.Label>Template Key</Form.Label>
              <Form.Control
                name="key"
                value={form.key}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          {/* Template Type */}
          <Form.Group className="mb-3">
            <Form.Label>Template Type</Form.Label>

            {isEditMode ? (
              <div>
                <Badge bg="secondary">{form.type}</Badge>
              </div>
            ) : (
              <Form.Select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="EMAIL">EMAIL</option>
                <option value="SMS">SMS</option>
                <option value="PUSH">PUSH</option>
              </Form.Select>
            )}
          </Form.Group>

          {/* Scope */}
          <Form.Group className="mb-4">
            <Form.Label>Scope</Form.Label>

            {isEditMode ? (
              <div>
                <Badge bg="dark">{form.scope}</Badge>
              </div>
            ) : (
              <Form.Select
                name="scope"
                value={form.scope}
                onChange={handleChange}
                required
              >
                <option value="">Select Scope</option>
                {user.is_super_admin && (
                  <option value="SYSTEM">SYSTEM</option>
                )}
                <option value="ORG">ORG</option>
                <option value="USER">USER</option>
              </Form.Select>
            )}
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit">
              {isEditMode ? "Update Template" : "Create Template"}
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default TemplateCreateEdit;
