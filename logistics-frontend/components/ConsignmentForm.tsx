import { useState } from "react";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "@frontegg/nextjs";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const ConsignmentForm = () => {
  const [id, setId] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const { user } = useAuth();
  const accessToken = user?.accessToken;

  const formatRecentEventResponse = (
    consignmentId: string,
    consignmentStatus: string,
    event: any
  ) => {
    return `
      <p><strong>consignment ID:</strong> ${consignmentId}</br>
      <strong>Status:</strong> ${consignmentStatus}</br>
      <strong>Most Recent Update:</strong></p>
      <div class="event-details"><strong>Timestamp:</strong> ${event.timestamp}</br>
      <strong>Location:</strong> ${event.location}</br>
      <strong>Custodian:</strong> ${event.custodian}</br>
      <strong>Description:</strong> ${event.description}</div>
    `;
  };

  const handleGetRecentEvent = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const consignmentRes = await axios.get(
        `${baseURL}/api/consignments/${id}`,
        { headers }
      );
      const consignmentStatus = consignmentRes.data.status;

      const eventRes = await axios.get(
        `${baseURL}/api/consignments/${id}/events/recent`,
        { headers }
      );
      const event = eventRes.data;

      const formattedResponse = formatRecentEventResponse(
        id,
        consignmentStatus,
        event
      );
      setResponse(formattedResponse);
      setError("");
    } catch (err) {
      setError("Failed to fetch the recent event");
      setResponse("");
    }
  };

  return (
    <Container>
      <h2>Consignment Tracker</h2>
      <Form>
        <Form.Group controlId="id">
          <Form.Label>Track a consignment</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter consignment ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col>
            <Button variant="primary" onClick={handleGetRecentEvent}>
              Get Most Recent Event
            </Button>
          </Col>
        </Row>
      </Form>
      {response && (
        <Alert variant="success" className="mt-3">
          <div dangerouslySetInnerHTML={{ __html: response }} />
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default ConsignmentForm;
