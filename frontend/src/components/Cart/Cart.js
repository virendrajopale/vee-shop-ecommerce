import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';
import CartItems from './CartItems';
import './Cart.css';
import { FaMinus, FaPlus } from 'react-icons/fa';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector(state => state.cart);

  const increaseQnty = (id, quantity, Stock) => {
    const newQty = quantity + 1;
    if (Stock <= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const decreaseQnty = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const deleteCartItem = id => {
    dispatch(removeFromCart(id));
  };

  const checkOutHanlder = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <RemoveShoppingCart className="text-6xl text-gray-500 mb-4" />
          <Typography className="text-2xl text-gray-700 mb-4">No Product In Cart</Typography>
          <Link
            to="/products"
            className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
          >
            View Products
          </Link>
        </div>
      ) : (
        <div className="container mx-auto my-8 p-4 shadow-lg rounded-lg">
          <div className="grid grid-cols-3 gap-4 border-b pb-4 mb-4">
            <p className="text-lg font-semibold">Product</p>
            <p className="text-lg font-semibold">Quantity</p>
            <p className="text-lg font-semibold">Subtotal</p>
          </div>
          {cartItems &&
            cartItems.map(item => (
              <div key={item.product} className="grid grid-cols-3 gap-4 items-center mb-4  bg-white px-4 cursor-pointer font-medium t  border-2 capitalize
             text-black p-2 m-2 shadow-[0.2em_0.2em] border-yellow-500 r hover:shadow-[0.15em_0.15em_yellow] hover:-translate-x-1 hover:-translate-y-1 duration-300">
                <CartItems item={item} deleteCartItem={deleteCartItem} />
                <div >
                <span className="flex items-center border-2 border-yellow-500 w-fit">
                  <button
                    onClick={() => decreaseQnty(item.product, item.quantity)}
                    className="p-2"
                  >
                      <FaMinus className="text-gray-600" />
                  </button>
                  <input
                    type="number"
                    className="w-12 text-center border-x-2 border-yellow-500 p-2 text-black" 
                    readOnly
                    value={item.quantity}
                  />
                  <button
                    onClick={() => increaseQnty(item.product, item.quantity, item.Stock)}
                    className="p-2"
                  >
                     <FaPlus className="text-gray-600" />
                  </button>
                  </span>
                </div>

                <div className="text-lg font-semibold text-gray-700">{`₹${item.price * item.quantity}`}</div>
              </div>
            ))}
          <div className="flex justify-evenly items-center mt-8 bg-white h-20">
            <div className="text-2xl font-bold text-black">Total:</div>
            <div className="text-2xl font-bold text-gray-700">{`₹${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</div>
            <button
              onClick={checkOutHanlder}
              className="bg-green-500 text-white px-6 py-2  shadow-[0.2em_0.2em] border-yellow-500 r hover:shadow-[0.15em_0.15em_green] hover:-translate-x-1 hover:-translate-y-1 duration-300 "
            >
              Check Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
