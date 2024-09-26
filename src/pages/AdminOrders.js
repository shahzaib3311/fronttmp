import React, { useState, useEffect, useContext } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { UserContext } from "../auth/UserContext";
import { useNavigate } from 'react-router-dom';

const AdminOrders = () => {
  const navigate = useNavigate(); 
  const { user, loading } = useContext(UserContext);

  if (!loading && user == null) {
    document.location.href = "/login";
  }

  if (!loading && user != null && !user.is_superuser) {
    document.location.href = "/login";
  }
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Effect hook to fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.dripsaint.com/api/get_all_orders/`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data); // Log the response to the console
        setOrders(response.data.orders || []); // Ensure orders is an array
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        setIsLoading(false); // Set loading to false even on error
      }
    };

    fetchData(); // Call the async function
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }
  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`); // Navigate to order details page
  };

  return (
    <Layout background="bg-gradient-to-r from-stone-500 to-stone-700">
      <section className="mt-14 w-full p-8">
        <div className="overflow-x-auto">
          <table className="table text-white">
            {/* head */}
            <thead>
              <tr className="text-white text-2xl">
                <th>ID</th>
                <th>Customer Name</th>
                <th>Order Date</th>
                <th>Payment Type</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="hover" onClick={() => handleRowClick(order.id)}>
                  <th>{order.id}</th>
                  <td>{`${order.user.first_name} ${order.user.last_name}`}</td>
                  <td>{new Date(order.order_date).toLocaleString()}</td>
                  <td>{order.paymenttype}</td>
                  <td>{order.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <dialog id="add_order_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg mb-2">Order Details</h3>
          <div className="grid grid-col-1 sm:grid-cols-2 gap-2">
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              ID
              <input type="text" className="grow" />
            </label>
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              Customer Name
              <input type="text" className="" />
            </label>
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              Order Date
              <input type="text" className="" />
            </label>
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              Payment Type
              <input type="text" className="" />
            </label>
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              Total Price
              <input type="text" className="" />
            </label>
          </div>
        </div>
      </dialog>
    </Layout>
  );
};

export default AdminOrders;
