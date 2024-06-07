import { useState } from 'react';
import { Event } from '../types';
import axios from 'axios';

interface OrderEventsProps {
  orderId: string;
}

const OrderEvents: React.FC<OrderEventsProps> = ({ orderId }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [lastEvent, setLastEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderStatus = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`);
      const { data } = response;
      setOrderStatus(data.status);
      return data.status;
    } catch (err) {
      setError('Error fetching order status');
      console.error('Error fetching order status:', err);
      return null;
    }
  };

  const fetchEvents = async () => {
    try {
      setError(null);
      await fetchOrderStatus();
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${orderId}`);
      const { data } = response;
      setEvents(data);
    } catch (err) {
      setError('Error fetching events');
      console.error('Error fetching events:', err);
    }
  };

  const fetchLastEvent = async () => {
    try {
      setError(null);
      await fetchOrderStatus();
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${orderId}/last`);
      const { data } = response;
      setLastEvent(data);
    } catch (err) {
      setError('Error fetching last event');
      console.error('Error fetching last event:', err);
    }
  };

  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={fetchLastEvent}>Fetch Last Event</button>
      <button className="btn btn-primary mb-3 ms-2" onClick={fetchEvents}>Fetch All Events</button>
      {error && <div className="alert alert-danger">{error}</div>}
      {orderStatus && (
        <div className="mb-3">
          <h3>Order Updates</h3>
          <p><strong>Status:</strong> {orderStatus}</p>
        </div>
      )}
      {lastEvent && (
        <div className="mb-3">
          <h4>Last Event</h4>
          <p><strong>Location:</strong> {lastEvent.location}</p>
          <p><strong>Custodian:</strong> {lastEvent.custodian}</p>
          <p><strong>Timestamp:</strong> {new Date(lastEvent.timestamp).toLocaleString()}</p>
        </div>
      )}
      <h4>All Events</h4>
      {events.length > 0 ? (
        <ul className="list-group">
          {events.map((event) => (
            <li key={event._id} className="list-group-item">
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Custodian:</strong> {event.custodian}</p>
              <p><strong>Timestamp:</strong> {new Date(event.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found for this order.</p>
      )}
    </div>
  );
};

export default OrderEvents;
