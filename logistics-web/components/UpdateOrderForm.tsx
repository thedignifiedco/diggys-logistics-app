import { useState } from 'react';
import axios from 'axios';
import { filterEmptyFields } from '../utils/filterEmptyFields';

interface UpdateOrderFormProps {
    onResponse: (response: string) => void;
}

const UpdateOrderForm: React.FC<UpdateOrderFormProps> = ({ onResponse }) => {
    const [orderId, setOrderId] = useState('');
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = filterEmptyFields({
                product,
                quantity: quantity ? parseInt(quantity) : '',
                source,
                destination,
                status
            });
            const response = await axios.put(`http://localhost:3000/api/orders/${orderId}`, data);
            onResponse('Order updated successfully');
            setOrderId('');
            setProduct('');
            setQuantity('');
            setSource('');
            setDestination('');
            setStatus('');
        } catch (error) {
            onResponse('Error updating order');
            console.error('Error updating order:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h3>Update Exsisting Order</h3>
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
                <label className="form-label">Product</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Quantity (mT)</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity (mT)"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Source</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Destination</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Status</label>
                <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Select Status</option>
                    <option value="Processing">Processing</option>
                    <option value="In-Transit">In-Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Update Order</button>
        </form>
    );
};

export default UpdateOrderForm;
