import { useState } from 'react';
import { Accordion, Button, Form, Alert, Container } from 'react-bootstrap';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const AccordionForm = () => {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [id, setId] = useState('');
  const [consignmentData, setConsignmentData] = useState({ product: '', quantity: '', source: '', destination: '', status: 'Processing' });
  const [eventData, setEventData] = useState({ description: '', location: '', custodian: '' });

  const handleResponse = (message: string, data: any, error: string) => {
    if (error) {
      setError(error);
      setResponse('');
    } else {
      const formattedResponse = formatResponse(message, data);
      setResponse(formattedResponse);
      setError('');
    }
  };

  const formatResponse = (message: string, data: any) => {
    if (!data) return '';

    let result = `<p><em>${message}</em></p>`;
    result += `<div><strong>Consignment ID:</strong> ${data._id}</br>`;
    result += `<strong>Status:</strong> ${data.status}</br>`;
    result += `<strong>Product:</strong> ${data.product}</br>`;
    result += `<strong>Source:</strong> ${data.source}</br>`;
    result += `<strong>Destination:</strong> ${data.destination}</br>`;
    result += `<strong>Quantity:</strong> ${data.quantity}</div>`;

    if (data.events) {
      result += '<strong>Consignment Events:</strong></br>';
      data.events.forEach((event: any) => {
        result += `<div class="event-details"><strong>Timestamp:</strong> ${event.timestamp}</br>`;
        result += `<strong>Location:</strong> ${event.location}</br>`;
        result += `<strong>Custodian:</strong> ${event.custodian}</br>`;
        result += `<strong>Description:</strong> ${event.description}</div>`;
      });
    }

    return result;
  };

  const handleGetAllConsignments = async () => {
    try {
      const res = await axios.get(`${baseURL}/consignments`);
      const formattedResponse = res.data.map((consignment: any) => `<p><strong>Consignment ID:</strong> ${consignment._id}<br/><strong>Status:</strong> ${consignment.status}</p>`).join('<br/>');
      setResponse(formattedResponse);
      setError('');
    } catch (err) {
      setError('Failed to fetch all consignments');
      setResponse('');
    }
  };

  const handleCreateConsignment = async () => {
    try {
      const res = await axios.post(`${baseURL}/consignments`, consignmentData);
      handleResponse('Consignment created successfully', res.data, '');
    } catch (err) {
      handleResponse('', null, 'Failed to create consignment');
    }
  };

  const handleUpdateConsignment = async () => {
    try {
      // Filter out empty fields
      const filteredData = Object.fromEntries(Object.entries(consignmentData).filter(([key, value]) => value !== ''));

      const res = await axios.put(`${baseURL}/consignments/${id}`, filteredData);
      handleResponse('Consignment updated successfully', res.data, '');
    } catch (err) {
      handleResponse('', null, 'Failed to update consignment');
    }
  };

  const handleDeleteConsignment = async () => {
    try {
      const res = await axios.delete(`${baseURL}/consignments/${id}`);
      handleResponse('Consignment deleted successfully', { _id: id }, '');
    } catch (err) {
      handleResponse('', null, 'Failed to delete consignment');
    }
  };

  const handleAddEvent = async () => {
    try {
      const res = await axios.post(`${baseURL}/consignments/${id}/events`, eventData);
      handleResponse('Event added successfully', res.data, '');
    } catch (err) {
      handleResponse('', null, 'Failed to add event');
    }
  };

  const handleGetAllEvents = async () => {
    try {
      const consignmentRes = await axios.get(`${baseURL}/consignments/${id}`);
      const eventsRes = await axios.get(`${baseURL}/consignments/${id}/events`);
      handleResponse('Consignment events retrieved successfully', { ...consignmentRes.data, events: eventsRes.data }, '');
    } catch (err) {
      handleResponse('', null, 'Failed to fetch all events');
    }
  };

  return (
    <Container>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Get All Consignments</Accordion.Header>
          <Accordion.Body>
            <Button onClick={handleGetAllConsignments}>Fetch Consignments</Button>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Create An Consignment</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="product">
                <Form.Label>Product</Form.Label>
                <Form.Control type="text" placeholder="Enter product" value={consignmentData.product} onChange={(e) => setConsignmentData({ ...consignmentData, product: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" placeholder="Enter quantity" value={consignmentData.quantity} onChange={(e) => setConsignmentData({ ...consignmentData, quantity: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="source">
                <Form.Label>Source</Form.Label>
                <Form.Control type="text" placeholder="Enter source" value={consignmentData.source} onChange={(e) => setConsignmentData({ ...consignmentData, source: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="destination">
                <Form.Label>Destination</Form.Label>
                <Form.Control type="text" placeholder="Enter destination" value={consignmentData.destination} onChange={(e) => setConsignmentData({ ...consignmentData, destination: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" value={consignmentData.status} onChange={(e) => setConsignmentData({ ...consignmentData, status: e.target.value })}>
                  <option value="Processing">Processing</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Recalled">Recalled</option>
                </Form.Control>
              </Form.Group>
              <Button onClick={handleCreateConsignment}>Create Consignment</Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Update An Consignment</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="id">
                <Form.Label>Consignment ID</Form.Label>
                <Form.Control type="text" placeholder="Enter consignment ID" value={id} onChange={(e) => setId(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="product">
                <Form.Label>Product</Form.Label>
                <Form.Control type="text" placeholder="Enter product" value={consignmentData.product} onChange={(e) => setConsignmentData({ ...consignmentData, product: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" placeholder="Enter quantity" value={consignmentData.quantity} onChange={(e) => setConsignmentData({ ...consignmentData, quantity: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="source">
                <Form.Label>Source</Form.Label>
                <Form.Control type="text" placeholder="Enter source" value={consignmentData.source} onChange={(e) => setConsignmentData({ ...consignmentData, source: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="destination">
                <Form.Label>Destination</Form.Label>
                <Form.Control type="text" placeholder="Enter destination" value={consignmentData.destination} onChange={(e) => setConsignmentData({ ...consignmentData, destination: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" value={consignmentData.status} onChange={(e) => setConsignmentData({ ...consignmentData, status: e.target.value })}>
                  <option value="Processing">Processing</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Recalled">Recalled</option>
                </Form.Control>
              </Form.Group>
              <Button onClick={handleUpdateConsignment}>Update Consignment</Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Delete An Consignment</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="id">
                <Form.Label>Consignment ID</Form.Label>
                <Form.Control type="text" placeholder="Enter consignment ID" value={id} onChange={(e) => setId(e.target.value)} />
              </Form.Group>
              <Button onClick={handleDeleteConsignment}>Delete Consignment</Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Add an Consignment Event</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="id">
                <Form.Label>Consignment ID</Form.Label>
                <Form.Control type="text" placeholder="Enter consignment ID" value={id} onChange={(e) => setId(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" value={eventData.description} onChange={(e) => setEventData({ ...eventData, description: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Enter location" value={eventData.location} onChange={(e) => setEventData({ ...eventData, location: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="custodian">
                <Form.Label>Custodian</Form.Label>
                <Form.Control type="text" placeholder="Enter custodian" value={eventData.custodian} onChange={(e) => setEventData({ ...eventData, custodian: e.target.value })} />
              </Form.Group>
              <Button onClick={handleAddEvent}>Add Event</Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>Get All Consignment Events</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="id">
                <Form.Label>Consignment ID</Form.Label>
                <Form.Control type="text" placeholder="Enter consignment ID" value={id} onChange={(e) => setId(e.target.value)} />
              </Form.Group>
              <Button onClick={handleGetAllEvents}>Get All Events</Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {response && (
        <Alert variant="success" className="mt-3">
          <div dangerouslySetInnerHTML={{ __html: response }} />
        </Alert>
      )}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Container>
  );
};

export default AccordionForm;
