import { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const OrderForm = () => {
  const [id, setId] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const formatRecentEventResponse = (orderId: string, orderStatus: string, event: any) => {
    return `
      <p><strong>Order ID:</strong> ${orderId}</br>
      <strong>Status:</strong> ${orderStatus}</br>
      <strong>Most Recent Update:</strong></p>
      <div class="event-details"><strong>Timestamp:</strong> ${event.timestamp}</br>
      <strong>Location:</strong> ${event.location}</br>
      <strong>Custodian:</strong> ${event.custodian}</br>
      <strong>Description:</strong> ${event.description}</div>
    `;
  };

  const handleGetRecentEvent = async () => {
    try {
      const orderRes = await axios.get(`${baseURL}/orders/${id}`);
      const orderStatus = orderRes.data.status;
      const eventRes = await axios.get(`${baseURL}/orders/${id}/events/recent`);
      const event = eventRes.data;
      const formattedResponse = formatRecentEventResponse(id, orderStatus, event);
      setResponse(formattedResponse);
      setError('');
    } catch (err) {
      setError('Failed to fetch the recent event');
      setResponse('');
    }
  };

  return (
    <Container>
      <Form>
        <Form.Group controlId="id">
          <Form.Label>Order ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter order ID"
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
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Container>
  );
};

export default OrderForm;
