import { useState } from 'react';
import axios from 'axios';

interface AddEventFormProps {
  onResponse: (response: string) => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ onResponse }) => {
  const [orderId, setOrderId] = useState('');
  const [location, setLocation] = useState('');
  const [custodian, setCustodian] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {
        orderId,
        location,
        custodian,
        timestamp
      });
      onResponse('Event added successfully');
      setOrderId('');
      setLocation('');
      setCustodian('');
      setTimestamp('');
    } catch (error) {
      onResponse('Error adding event');
      console.error('Error adding event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h3>Add Event</h3>
      <div className="mb-3">
        <label className="form-label">Order ID</label>
        <input
          type="text"
          className="form-control"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Location</label>
        <input
          type="text"
          className="form-control"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Custodian</label>
        <input
          type="text"
          className="form-control"
          placeholder="Custodian"
          value={custodian}
          onChange={(e) => setCustodian(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Timestamp</label>
        <input
          type="datetime-local"
          className="form-control"
          placeholder="Timestamp"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Event</button>
    </form>
  );
};

export default AddEventForm;
