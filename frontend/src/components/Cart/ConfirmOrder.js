import React from 'react';
import CheckOutStep from './CheckOutStep';
import MetaData from '../layout/MetaData';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const subtotal = cartItems.reduce(
    (acc, item) => Math.round(acc + item.quantity * item.price),
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const gst = Math.round(subtotal * 0.18);
  const totalPrice = subtotal + gst + shippingCharges;

  const proceedToPay = () => {
    const data = {
      subtotal,
      shippingCharges,
      gst,
      totalPrice,
    };
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    navigate('/process/payment');
  };

  return (
    <>
      <MetaData title="Confirm Order - Vee shop" />
      <CheckOutStep activeStep={1} />
      <div className="min-h-screen bg-white text-black grid grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 p-4">
          <Typography variant="h5" className="mb-4">Shipping Info</Typography>
          <div className="border p-4 mb-6">
            <div className="mb-4 flex">
              <p className="font-semibold">Name:</p>
              <span className="ml-2">{user.name}</span>
            </div>
            <div className="mb-4 flex">
              <p className="font-semibold">Phone No:</p>
              <span className="ml-2">{shippingInfo.phoneNo}</span>
            </div>
            <div className="flex">
              <p className="font-semibold">Address:</p>
              <span className="ml-2">{address}</span>
            </div>
          </div>
          <Typography variant="h5" className="mb-4">Your Cart Items</Typography>
          <div className="border p-4 overflow-y-auto max-h-96">
            {cartItems && cartItems.map((item) => (
              <div key={item.product} className="flex justify-between items-center mb-4">
                <img src={item.image} alt="" className="w-16 h-16 object-cover" />
                <Link to={`/product/${item.product}`} className="ml-4 flex-1 text-blue-600">
                  {item.name}
                </Link>
                <span className="ml-4">
                  {item.quantity} x {item.price} = <b>₹{item.price * item.quantity}</b>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-l lg:border-l-0 lg:border-t">
          <Typography variant="h5" className="mb-4 text-center">Order Summary</Typography>
          <div className="border p-4">
            <div className="flex justify-between mb-4">
              <p>Subtotal:</p>
              <span>₹ {subtotal}</span>
            </div>
            <div className="flex justify-between mb-4">
              <p>Shipping Charges:</p>
              <span>₹ {shippingCharges}</span>
            </div>
            <div className="flex justify-between mb-4">
              <p>GST:</p>
              <span>₹ {gst}</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <p className="font-semibold">Total:</p>
              <span className="font-semibold">₹ {totalPrice}</span>
            </div>
            <button
              onClick={proceedToPay}
              className="w-full mt-4 bg-red-600 text-white py-2 rounded transition duration-300 hover:bg-green-600"
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
