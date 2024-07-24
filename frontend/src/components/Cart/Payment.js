import React, { useState, useRef, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CheckOutStep from './CheckOutStep';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearError, newOrder } from '../../actions/orderAction';

const Payment = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemPrice: orderInfo.subtotal,
    taxPrice: orderInfo.gst,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice
  };

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(`/api/v1/process/payment`, paymentData, config);
      const client_secret = data.client_secret;
      
      if (!stripe || !elements) { return; }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(newOrder(order));
          navigate('/success');
        } else {
          alert.error('There is an issue while processing the payment');
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(`Error: ${error.response.data.message}`);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <MetaData title={"Payment - Vee Shop"} />
      <CheckOutStep activeStep={2} />
      <div className="min-h-[65vh] flex items-center justify-center ">
        <div className="bg-white shadow-md  p-8 w-full max-w-md">
          <Typography variant="h5" className="mb-4 text-center text-black">Card Info</Typography>
          <form className="paymentForm" onSubmit={submitHandler}>
            <div className="mb-4 flex items-center">
              <CreditCardIcon className="mr-2 text-gray-600" />
              <CardNumberElement className="paymentInput flex-1 p-2 border " />
            </div>
            <div className="mb-4 flex items-center">
              <EventIcon className="mr-2 text-gray-600" />
              <CardExpiryElement className="paymentInput flex-1 p-2 border " />
            </div>
            <div className="mb-4 flex items-center">
              <VpnKeyIcon className="mr-2 text-gray-600" />
              <CardCvcElement className="paymentInput flex-1 p-2 border " />
            </div>
            <button
              type="submit"
              ref={payBtn}
              className="w-full py-2 mt-4 bg-green-500 text-white  hover:shadow-[0.15em_0.15em_green] hover:-translate-x-1 hover:-translate-y-1 duration-300"
            >
              Pay - ₹{orderInfo && orderInfo.totalPrice}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
