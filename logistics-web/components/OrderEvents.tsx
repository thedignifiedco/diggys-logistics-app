import { FC } from 'react';
import { Event } from '../types';

interface OrderEventsProps {
    events: Event[];
}

const OrderEvents: FC<OrderEventsProps> = ({ events }) => {
    return (
        <div>
            {events.map((event, index) => (
                <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Custodian:</strong> {event.custodian}</p>
                    <p><strong>Timestamp:</strong> {new Date(event.timestamp).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default OrderEvents;
