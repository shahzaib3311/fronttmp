import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../auth/UserContext";

const CartItems = ({ cart, designCart, customCart }) => {
  const { user } = useContext(UserContext);
  const [cartState, setCartState] = useState({ cart, designCart, customCart });
  const [loading, setLoading] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [newAddress, setNewAddress] = useState({ address: '', city: '', postal_code: '' });
  const [cities, setCities] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    fetchAddresses();
    fetchCities();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`https://api.dripsaint.com/api/address`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setAddresses(response.data.addresses);
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get(`https://api.dripsaint.com/api/city`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setCities(response.data.cities);
      }
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  const updateCartBackend = async (id, action, type) => {
    setLoading(id);
    try {
      const response = await axios.get(`https://api.dripsaint.com/api/update_cart_product_quantity/${id}/${action}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const updatedCart = cartState[type].map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + (action === 'add' ? 1 : -1) };
          }
          return item;
        });
        setCartState({ ...cartState, [type]: updatedCart });
      }
      return true;
    } catch (error) {
      console.error("Failed to update cart:", error);
      return false;
    } finally {
      setLoading(null);
    }
  };

  const handleCheckout = async () => {
    if (!selectedAddressId) {
        alert("Please select a delivery address");
        return;
    }

    setCheckoutLoading(true);

    try {
        // Get order ID and access token
        const orderResponse = await axios.post('https://api.dripsaint.com/api/create_checkout_session/', {
            shipping_address: selectedAddressId,
        }, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });

        const orderId = orderResponse.data.order_id;
        const totalPrice = orderResponse.data.total_price;
        const accessToken = orderResponse.data.access_token;

        if (!accessToken) {
            console.error('Failed to retrieve access token');
            setCheckoutLoading(false);
            return;
        }

        // Store order details and show modal
        setOrderDetails({ orderId, totalPrice, accessToken });
        setShowConfirmModal(true);
    } catch (error) {
        console.error('Error during checkout process:', error);
    } finally {
        setCheckoutLoading(false);
    }
};


  const delProduct = async (id, type) => {
    setLoading(id);
  
    try {
      const response = await fetch(`https://api.dripsaint.com/api/delete_cart_item/${id}/${type}`, {
        method: 'DELETE',
        credentials: 'include', // This includes credentials with the request
      });
  
      if (response.ok) {
        const newCartState = {
          ...cartState,
          [type]: cartState[type].filter(item => item.id !== id)
        };
        setCartState(newCartState);
      } else {
        console.error('Failed to delete the item:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred while deleting the item:', error);
    }
  };

  const getTotal = () => {
    let total = 0;
    // Consolidate total calculation logic here
    Object.values(cartState).forEach(cartItems => {
      cartItems.forEach(item => {
        const key = item.product ? 'product' : 'design';
        const price = item[key]?.discount_price || item[key]?.product_price;
        total += price * item.quantity;
      });
    });
    return total.toFixed(2);
  };

  const handleAddressChange = (event) => {
    setSelectedAddressId(parseInt(event.target.value));
  };

  const itemDisplay = (item, type) => {
    const key = type === 'cart' ? 'product' : 'design';
    const priceKey = type === 'cart' ? 'product_price' : 'design_price';
    const discountKey = 'discount_price';
    const hasDiscount = item[key]?.[discountKey];
    const price = hasDiscount ? item[key]?.[discountKey] : item[key]?.[priceKey];
    const originalPrice = item[key]?.[priceKey];

    return (
      <div key={item.id} className="mb-6 rounded-lg bg-white p-6 shadow-md flex items-center">
        <img
          src={`https://api.dripsaint.com${item[key]?.thumbnail || item[key]?.image || item.image || item.url}`}
          alt="product-image"
          className="w-24 h-24 object-cover rounded-lg mr-4"
        />
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900">{item[key]?.product_name || item[key]?.design_name}</h2>
          <p className="mt-1 text-xs text-gray-700">Size: {item.size}</p>
          <p className="text-sm">
            {hasDiscount ? (
              <>
                <span className="line-through">{originalPrice.toFixed(2)}</span> {price.toFixed(2)}
              </>
            ) : price.toFixed(2)}
          </p>
          <p className="text-sm">Total: {(price * item.quantity).toFixed(2)}</p>
        </div>
        <div className="flex items-center ml-4">
          {/*<button onClick={() => updateCartBackend(item.id, 'minus', type)} disabled={loading === item.id || item.quantity === 1}>-</button>*/}
          <span className="mx-2">Quantity: {item.quantity}</span>
          {/*<button onClick={() => updateCartBackend(item.id, 'add', type)} disabled={loading === item.id}>+</button>*/}
          <button onClick={() => delProduct(item.id, type)} disabled={loading === item.id}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          </button>
        </div>
      </div>
    );
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleNewAddressChange = (event) => {
    setNewAddress({ ...newAddress, [event.target.name]: event.target.value });
  };

  const handleAddNewAddress = async () => {
    setLoading("addAddress");
    try {
      const response = await axios.post(`https://api.dripsaint.com/api/address/`, newAddress, {
        withCredentials: true,
      });
      if (response.status === 200) {
        fetchAddresses(); // Refresh addresses
        setShowModal(false); // Close modal
        setNewAddress({ address: '', city: '', postal_code: '' }); // Reset form
      }
    } catch (error) {
      console.error("Failed to add new address:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="text-black font-bold">
      <h1 className="mb-10 text-center text-3xl font-bold text-white">Cart Items</h1>
      <div className="flex flex-col md:flex-row mx-auto max-w-5xl px-6 md:space-x-6 xl:px-0">
        <div className="flex-grow">
          {['cart', 'designCart', 'customCart'].map((type) =>
            cartState[type].map(item => (
              itemDisplay(item, type)
            ))
          )}
        </div>
        <div className="mt-6 md:mt-0 md:w-1/3 bg-white p-6 shadow-md rounded-lg">
          <div className="mb-4">
            <p className="text-lg font-bold">Total: Rs {getTotal()}</p>
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Delivery Address</label>
            {addresses.length > 0 ? (
              addresses.map(addr => (
                <div key={addr.id} className={`p-2 ${selectedAddressId === addr.id ? 'bg-blue-200' : 'bg-white'}`}>
                  <input
                    type="radio"
                    id={`address-${addr.id}`}
                    name="selectedAddress"
                    value={addr.id}
                    checked={selectedAddressId === addr.id}
                    onChange={handleAddressChange}
                    className="mr-2"
                  />
                  <label htmlFor={`address-${addr.id}`} className="ml-2">{addr.address}, {addr.city.city}</label>
                </div>
              ))
            ) : (
              <p>No addresses found. Please add a new address.</p>
            )}
            <button
              className="mt-4 w-full rounded-md bg-blue-500 py-1.5 font-medium text-white hover:bg-blue-600"
              onClick={handleModalOpen}
              disabled={loading === "addAddress"}
            >
              {loading === "addAddress" ? "Adding..." : "Add New Address"}
            </button>
          </div>
          <button
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-white hover:bg-blue-600"
            onClick={handleCheckout}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? "Processing..." : "Check out"}
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl mb-4">Add New Address</h2>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={newAddress.address}
                onChange={handleNewAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your address"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">City</label>
              <select
                name="city"
                value={newAddress.city}
                onChange={handleNewAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select a city</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>{city.city}</option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Postal Code</label>
              <input
                type="text"
                name="postal_code"
                value={newAddress.postal_code}
                onChange={handleNewAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your postal code"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleModalClose}>Cancel</button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleAddNewAddress}
                disabled={loading === "addAddress"}
              >
                {loading === "addAddress" ? "Adding..." : "Add Address"}
              </button>
            </div>
          </div>
        </div>
      )}
{showConfirmModal && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl mb-4">Confirm Your Purchase</h2>
            <form
                action="https://ipg1.apps.net.pk/Ecommerce/api/Transaction/PostTransaction"
                method="POST"
                onSubmit={() => setCheckoutLoading(true)}
            >
                {/* Hidden Fields */}
                <input type="hidden" name="CURRENCY_CODE" value="PKR" />
                <input type="hidden" name="MERCHANT_ID" value="22926" />
                <input type="hidden" name="MERCHANT_NAME" value="Dripsaint" />
                <input type="hidden" name="TOKEN" value={orderDetails.accessToken} />
                <input type="hidden" name="TXNAMT" value={orderDetails.totalPrice} />
                <input type="hidden" name="CUSTOMER_MOBILE_NO" value={user.phone_number} />
                <input type="hidden" name="CUSTOMER_EMAIL_ADDRESS" value={user.email} />
                <input type="hidden" name="CHECKOUT_URL" value="https://api.dripsaint.com/api/confirm_transaction/" />
                <input type="hidden" name="SUCCESS_URL" value={`https://www.dripsaint.com/checkout?success=true&order_id=${orderDetails.orderId}`} />
                <input type="hidden" name="FAILURE_URL" value={`https://www.dripsaint.com/checkout?cancel=true&order_id=${orderDetails.orderId}`} />
                <input type="hidden" name="BASKET_ID" value={orderDetails.orderId} />
                <input type="hidden" name="TRAN_TYPE" value="ECOMM_PURCHASE" />
                <input type="hidden" name="ORDER_DATE" value={new Date().toISOString()} />
                <input type="hidden" name="SIGNATURE" value="" /> {/* Add the signature if needed */}
                <input type="hidden" name="VERSION" value="MERCHANT_CART-0.1" />
                <input type="hidden" name="TXNDESC" value="Item Purchased from Cart" />
                <input type="hidden" name="PROCCODE" value="00" />
                <input type="hidden" name="STORE_ID" value="" /> {/* Optional Store ID */}
                <input type="hidden" name="Recurring_Transaction" value="true" />
                <input type="hidden" name="MERCHANT_USERAGENT" value="Mozilla/5.0" />

                {/* Cart Items */}
                {cartState.cart.map((item, index) => (
                    <div key={`cart-item-${index}`}>
                        <input type="hidden" name={`ITEMS[${index}][SKU]`} value={`product-${item.product.id}`} />
                        <input type="hidden" name={`ITEMS[${index}][NAME]`} value={item.product.name} />
                        <input type="hidden" name={`ITEMS[${index}][PRICE]`} value={item.product.price} />
                        <input type="hidden" name={`ITEMS[${index}][QTY]`} value={item.quantity} />
                    </div>
                ))}
                {cartState.designCart.map((item, index) => (
                    <div key={`design-item-${index}`}>
                        <input type="hidden" name={`ITEMS[${index}][SKU]`} value={`design-${item.design.id}`} />
                        <input type="hidden" name={`ITEMS[${index}][NAME]`} value={item.design.name} />
                        <input type="hidden" name={`ITEMS[${index}][PRICE]`} value={item.design.price} />
                        <input type="hidden" name={`ITEMS[${index}][QTY]`} value={item.quantity} />
                    </div>
                ))}
                {cartState.customCart.map((item, index) => (
                    <div key={`custom-item-${index}`}>
                        <input type="hidden" name={`ITEMS[${index}][SKU]`} value={`custom-shirt`} />
                        <input type="hidden" name={`ITEMS[${index}][NAME]`} value="Ai Shirt" />
                        <input type="hidden" name={`ITEMS[${index}][PRICE]`} value="3500" />
                        <input type="hidden" name={`ITEMS[${index}][QTY]`} value={item.quantity} />
                    </div>
                ))}

                <p>Are you sure you want to proceed with the transaction?</p>
                <div className="mt-4 flex justify-end">
                    <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2" onClick={() => setShowConfirmModal(false)}>Cancel</button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        disabled={checkoutLoading}
                    >
                        {checkoutLoading ? "Processing..." : "Yes, I'm sure"}
                    </button>
                </div>
            </form>
        </div>
    </div>
)}


    </div>
  );
};

export default CartItems;
