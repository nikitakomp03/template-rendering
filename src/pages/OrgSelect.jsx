import { useAuth } from "../context/AuthContext";
import { Card, Button } from "react-bootstrap";

function OrgSelect() {
  const { orgs, setActiveOrg } = useAuth();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px" }} className="shadow">
        <Card.Body>
          <Card.Title className="text-center mb-3">
            Select Organization
          </Card.Title>

          <Card.Text className="text-center text-muted mb-4">
            Choose an organization to continue
          </Card.Text>

          {orgs.map((org) => (
            <div key={org.org_id} className="d-grid mb-2">
              <Button
                variant="outline-primary"
                onClick={() => setActiveOrg(org)}
              >
                {org.org_name}
              </Button>
            </div>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}

export default OrgSelect;
