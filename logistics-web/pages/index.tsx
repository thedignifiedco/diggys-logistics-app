import { useState } from 'react';
import OrderEvents from '../components/OrderEvents';
import CreateOrderForm from '../components/CreateOrderForm';
import UpdateOrderForm from '../components/UpdateOrderForm';
import AddEventForm from '../components/AddEventForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const IndexPage = () => {
    const [orderId, setOrderId] = useState('');
    const [createOrderResponse, setCreateOrderResponse] = useState('');
    const [createdOrder, setCreatedOrder] = useState<any | null>(null);
    const [updateOrderResponse, setUpdateOrderResponse] = useState('');
    const [addEventResponse, setAddEventResponse] = useState('');

    const handleCreateOrderResponse = (response: string, data?: any) => {
        setCreateOrderResponse(response);
        setCreatedOrder(data || null);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="main col-md-8">
                    <h1 id="hero-banner" className="text-center mb-4">Diggys Logistics</h1>
                    <div className="accordion mt-4" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Create a New Order
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <CreateOrderForm onResponse={handleCreateOrderResponse} />
                                    {createOrderResponse && (
                                        <div className="alert alert-info mt-3">
                                            <h3>Order Details</h3>
                                            {createdOrder ? (
                                                <div>
                                                    <p><strong>Order ID:</strong> {createdOrder._id}</p>
                                                    <p><strong>Product:</strong> {createdOrder.product}</p>
                                                    <p><strong>Quantity:</strong> {createdOrder.quantity}</p>
                                                    <p><strong>Source:</strong> {createdOrder.source}</p>
                                                    <p><strong>Destination:</strong> {createdOrder.destination}</p>
                                                    <p><strong>Status:</strong> {createdOrder.status}</p>
                                                </div>
                                            ) : (
                                                <p>{createOrderResponse}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Update Order
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <UpdateOrderForm onResponse={setUpdateOrderResponse} />
                                    <div className="alert alert-info mt-3">
                                        {updateOrderResponse && <p>{updateOrderResponse}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Add Order Event
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <AddEventForm onResponse={setAddEventResponse} />
                                    <div className="alert alert-info mt-3">
                                        {addEventResponse && <p>{addEventResponse}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingFour">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Track Order
                                </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={orderId}
                                            onChange={(e) => setOrderId(e.target.value)}
                                            placeholder="Enter Order ID"
                                        />
                                        <OrderEvents orderId={orderId} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;
