import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const CartItems = ({ item, deleteCartItem }) => {
  return (
    <div className="flex items-center space-x-4 p-4 ">
      <img src={item.image} alt="cartImage" className="w-16 h-16 object-contain " />
      <div className="flex-grow">
        <Link to={`/product/${item.product}`} className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
          {item.name}
        </Link>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-700">{`Price: ₹${item.price}`}</span>
          <button 
            onClick={() => deleteCartItem(item.product)} 
            className="text-red-600 hover:text-red-800 transition-colors duration-300"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
