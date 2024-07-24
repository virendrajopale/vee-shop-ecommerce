import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';

const ProductCard = ({ product }) => {
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
        size: 'small'
    };

    // nrw
    return (
        <div 
        className=' bg-white px-4 cursor-pointer font-medium w-60 h-[24rem]  border-2 capitalize
             text-black p-2 m-2 shadow-[0.2em_0.2em] border-yellow-500  hover:shadow-[0.15em_0.15em_yellow] hover:-translate-x-1 hover:-translate-y-1 duration-300'
        // className="w-60 h-80 rounded-md bg-gray-50/20 backdrop-blur-md text-white p-3 flex flex-col gap-1  shadow-md"
        >
            <Link to={`/products/product/${product._id}`} className="block h-48 overflow-hidden">
                <img 
                    src={product.images.url} 
                    alt={product.name} 
                    className="w-full h-full object-cover duration-500 contrast-50 hover:contrast-100"
                />
            </Link>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold line-clamp-1 font-body text-yellow-300">{product.name}</span>
                        <p className="text-xs font-sans">ID: {product._id}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between text-white">
                    <Rating {...options} />
                    <span className="text-xs text-white">({product.numberOfreview})</span>
                </div>
                    <span className="font-bold text-red-600 text-center font-mono">₹{product.price}</span>
                <button className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 transition duration-300">
                  <Link to={`/products/product/${product._id}`}>
                  BUY
                  </Link>  
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
