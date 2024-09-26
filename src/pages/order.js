import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../Components/Layout';

function OrderDetails() {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { order_id } = useParams(); // Retrieve the order ID from URL parameters

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`https://api.dripsaint.com/api/get_this_order/${order_id}`, {
                    withCredentials: true
                });
                setOrder(response.data.order);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [order_id]);

    if (loading) return <div className="text-center text-lg mt-5">Loading...</div>;
    if (error) return <div className="text-center text-lg mt-5 text-red-500">Error: {error}</div>;

    return (
        <Layout>
            <div className="order-details max-w-4xl mx-auto p-5">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h1>
                {order && (
                    <div>
                        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                            <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <h3 className="font-semibold">User Information:</h3>
                                    <p>Name: {order.user.first_name} {order.user.last_name}</p>
                                    <p>Email: {order.user.email}</p>
                                    <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Shipping Address:</h3>
                                    <p>{order.shipping_addres.address}, {order.shipping_addres.postal_code}</p>
                                    <p>Payment Type: {order.paymenttype}</p>
                                    <p>Total Price: <span className="font-bold">${order.totalPrice.toFixed(2)}</span></p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                            <h3 className="text-lg font-semibold mb-2">Products Ordered:</h3>
                            <ul>
                                {order.order_products.map(product => (
                                    <li key={product.id} className="p-2 border-b border-gray-200 flex justify-between items-center">
                                        <div>
                                            Product: {product.product.product_name}, Size: {product.size}, Quantity: {product.quantity}
                                        </div>
                                        <img src={`https://api.dripsaint.com${product.product.thumbnail}`} alt="Product" className="w-20 h-20 object-cover" />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                            <h3 className="text-lg font-semibold mb-2">Designs Ordered:</h3>
                            <ul>
                                {order.order_design.map(design => (
                                    <li key={design.id} className="p-2 border-b border-gray-200 flex justify-between items-center">
                                        <div>
                                            Design: {design.design.design_name}, Size: {design.size}, Quantity: {design.quantity}
                                            <p>Style: {design.shirt_style.style}</p>
                                        </div>
                                        <img src={`https://api.dripsaint.com${design.design.image}`} alt="Design" className="w-20 h-20 object-cover" />
                                        
                                        <img src={`https://api.dripsaint.com${design.shirt_style.image}`} alt="Shirt Style" className="w-20 h-20 object-cover" />
                                        <a href={`https://api.dripsaint.com${design.design.image}`} download className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Download
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-2">Custom Orders:</h3>
                            <ul>
                                {order.order_custom.map(custom => (
                                    <li key={custom.id} className="p-2 border-b border-gray-200 flex justify-between items-center">
                                        <div>
                                            Custom Order Size: {custom.size}, Quantity: {custom.quantity}
                                            <p>Style: {custom.shirt_style.style}</p>
                                        </div>
                                        <img src={`https://api.dripsaint.com${custom.image || custom.url}`} alt="Custom design" className="w-20 h-20 object-cover" />
                                        <img src={`https://api.dripsaint.com${custom.shirt_style.image}`} alt="Shirt Style" className="w-20 h-20 object-cover" />
                                        <a href={`https://api.dripsaint.com${custom.image || custom.url}`} download className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Download
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default OrderDetails;
