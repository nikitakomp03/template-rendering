import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Form,
  Row,
  Button,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";

/**
 * MOCK DATA
 * Later backend will provide:
 * - template_type
 * - variable schema
 */
const mockTemplate = {
  id: 1,
  type: "EMAIL", // EMAIL | SMS | PUSH
};

const mockSchema = {
  employee_name: {
    type: "string",
    required: true,
    default: "",
  },
  invoice_id: {
    type: "string",
    required: true,
  },
  is_paid: {
    type: "boolean",
    required: false,
    default: false,
  },
};

function TemplatePreview() {
  const [context, setContext] = useState({});
  const [errors, setErrors] = useState({});
  const [renderedOutput, setRenderedOutput] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initial = {};
    Object.entries(mockSchema).forEach(([key, config]) => {
      initial[key] = config.default ?? "";
    });
    setContext(initial);
  }, []);

  const handleChange = (key, value) => {
    setContext({ ...context, [key]: value });
    setErrors({ ...errors, [key]: null });
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(mockSchema).forEach(([key, config]) => {
      if (config.required && !context[key]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRender = async () => {
    setApiError(null);
    if (!validate()) return;

    setLoading(true);

    try {
      // Simulated API delay
      await new Promise((r) => setTimeout(r, 800));

      // Mock rendered response (backend responsibility later)
      if (mockTemplate.type === "EMAIL") {
        setRenderedOutput({
          subject: `Invoice ${context.invoice_id}`,
          body: `
            <p>Hello <strong>${context.employee_name}</strong>,</p>
            <p>Your invoice <b>${context.invoice_id}</b> is 
            <b>${context.is_paid ? "paid" : "pending"}</b>.</p>
          `,
        });
      } else {
        setRenderedOutput(
          `Invoice ${context.invoice_id} is ${
            context.is_paid ? "paid" : "pending"
          }`
        );
      }
    } catch {
      setApiError("Render failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isRenderDisabled =
    loading ||
    Object.entries(mockSchema).some(
      ([key, config]) => config.required && !context[key]
    );

  return (
    <Row>
      {/* LEFT PANEL */}
      <Col md={5}>
        <Card>
          <Card.Body>
            <h5 className="mb-3">
              Template Variables{" "}
              <Badge bg="secondary">{mockTemplate.type}</Badge>
            </h5>

            {Object.entries(mockSchema).map(([key, config]) => (
              <Form.Group className="mb-3" key={key}>
                <Form.Label>
                  {key}
                  {config.required && (
                    <span className="text-danger ms-1">*</span>
                  )}
                </Form.Label>

                {config.type === "string" && (
                  <Form.Control
                    value={context[key]}
                    onChange={(e) =>
                      handleChange(key, e.target.value)
                    }
                    isInvalid={!!errors[key]}
                  />
                )}

                {config.type === "boolean" && (
                  <Form.Check
                    type="switch"
                    checked={context[key]}
                    onChange={(e) =>
                      handleChange(key, e.target.checked)
                    }
                  />
                )}

                {errors[key] && (
                  <div className="text-danger small">
                    {errors[key]}
                  </div>
                )}
              </Form.Group>
            ))}

            <Button
              onClick={handleRender}
              disabled={isRenderDisabled}
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> Rendering...
                </>
              ) : (
                "Render Preview"
              )}
            </Button>
          </Card.Body>
        </Card>
      </Col>

      {/* RIGHT PANEL */}
      <Col md={7}>
        <Card>
          <Card.Body>
            <h5 className="mb-3">Rendered Output</h5>

            {apiError && (
              <Alert variant="danger">{apiError}</Alert>
            )}

            {!renderedOutput ? (
              <Alert variant="secondary">
                Fill variables and click Render
              </Alert>
            ) : mockTemplate.type === "EMAIL" ? (
              <>
                <h6>Subject</h6>
                <div className="border p-2 mb-3">
                  {renderedOutput.subject}
                </div>

                <h6>Body</h6>
                <div
                  className="border p-3"
                  dangerouslySetInnerHTML={{
                    __html: renderedOutput.body,
                  }}
                />
              </>
            ) : (
              <>
                <pre className="bg-light p-3">
                  {renderedOutput}
                </pre>
                <small className="text-muted">
                  Characters: {renderedOutput.length}
                </small>
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default TemplatePreview;


