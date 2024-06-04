import { useState } from 'react';
import axios from 'axios';

interface CreateOrderFormProps {
    onResponse: (response: string, data?: any) => void;
}

const CreateOrderForm: React.FC<CreateOrderFormProps> = ({ onResponse }) => {
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [status, setStatus] = useState('Processing');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/orders', {
                product,
                quantity: parseInt(quantity),
                source,
                destination,
                status
            });
            onResponse('Order created successfully', response.data);
            setProduct('');
            setQuantity('');
            setSource('');
            setDestination('');
            setStatus('Processing');
        } catch (error) {
            onResponse('Error creating order');
            console.error('Error creating order:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h3>Create a New Order</h3>
            <div className="mb-3">
                <label className="form-label">Product</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
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
                    required
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
                    required
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
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Status</label>
                <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="Processing">Processing</option>
                    <option value="In-Transit">In-Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Create Order</button>
        </form>
    );
};

export default CreateOrderForm;
