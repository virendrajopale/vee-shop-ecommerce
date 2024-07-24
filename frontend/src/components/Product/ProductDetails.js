import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { FaMinus, FaPlus, FaShoppingCart, FaStar } from 'react-icons/fa';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import { Rating } from '@mui/material';
import { clearError, getProductDetails, newProductReview } from '../../actions/productAction';
import { addToCart } from '../../actions/cartActions';
import { ADD_REEVIEW_RESET } from '../../constants/productConstant';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.productDetails);
    const { error: reviewError, success } = useSelector((state) => state.newReviews);
    const { id } = useParams();
    const alert = useAlert();
    const [qty, setQty] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQty = () => {
        if (products.Stock <= qty) return;
        setQty(qty + 1);
    };

    const decreaseQty = () => {
        if (qty <= 1) return;
        setQty(qty - 1);
    };

    const addToCartHandler = () => {
        dispatch(addToCart(id, qty));
        alert.success("Item Added to Cart");
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set('rating', rating);
        myForm.set('comment', comment);
        myForm.set('productId', id);
        dispatch(newProductReview(myForm));
        setOpen(false);
    };

    useEffect(() => {
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearError());
        }
        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: ADD_REEVIEW_RESET });
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert, reviewError, success]);

    const options = {
        size: "large",
        value: products?.ratings,
        readOnly: true,
        precision: 0.5
    };

    const submitReviewToggle = () => {
        setOpen(!open);
    };

    if (loading) return <Loader />;

    return (
        <Fragment>
            <MetaData title={`${products?.name} - Vee Shop`} />
            <div className=" min-h-screen py-12">
                <div className="container mx-auto px-4">
                    <div className=" rounded-lg shadow-lg overflow-hidden md:grid grid-cols-2 justify-center items-center">
                        <div className="m h-80  flex justify-center items-center">
                            <img 
                                src={products?.images?.url} 
                                alt={products?.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className=' bg-white px-4 cursor-pointer font-medium t  border-2 capitalize
             text-black p-2 m-2 shadow-[0.2em_0.2em] border-yellow-500  duration-300'>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{products?.name}</h1>
                            <p className="text-gray-500 mb-4">Product # {products?._id}</p>
                            <div className="flex items-center mb-4">
                                <Rating {...options} 
                                    icon={<FaStar className="text-yellow-400" />}
                                    emptyIcon={<FaStar className="text-gray-300" />}
                                    className="mr-2"
                                />
                                <span className="text-gray-600">({products?.numberOfReviews} Reviews)</span>
                            </div>
                            <div className="border-t border-b py-4 mb-6">
                                <h2 className="text-3xl font-semibold text-gray-800 mb-4">₹ {products?.price}</h2>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center border-2 border-yellow-500">
                                        <button onClick={decreaseQty} className="p-2  ">
                                            <FaMinus className="text-gray-600" />
                                        </button>
                                        <input readOnly value={qty} className="w-12 text-center border-x-2 border-yellow-500 p-2 text-black" />
                                        <button onClick={increaseQty} className="p-2   ">
                                            <FaPlus className="text-gray-600" />
                                        </button>
                                    </div>
                                    <button 
                                        onClick={addToCartHandler} 
                                        disabled={products?.Stock < 1} 
                                        className={`flex items-center px-6 py-2    bg-white  cursor-pointer font-medium   border-2 capitalize
             text-black p-2 m-2 shadow-[0.2em_0.2em] border-yellow-500 r hover:shadow-[0.15em_0.15em_yellow] hover:-translate-x-1 hover:-translate-y-1 duration-300 ${
                                            products?.Stock < 1 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-blue-600 '
                                        }`}
                                    >
                                        <FaShoppingCart className="mr-2" />
                                        Add to Cart
                                    </button>
                                </div>
                                <p className="mt-4 text-lg">
                                    Status: 
                                    <span className={`font-bold ml-2 ${products?.Stock < 1 ? "text-red-600" : "text-green-600"}`}>
                                        {products?.Stock < 1 ? "Out of Stock" : "In Stock"}
                                    </span>
                                </p>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Description</h3>
                                <p className="text-gray-600">{products?.description}</p>
                            </div>
                          
                        </div>
                    </div>
                    <div className="mt-12  rounded-lg shadow-lg p-6">
                        <h3 className="text-2xl text-center font-semibold  mb-6">REVIEWS</h3>
                        <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle}>
                            <DialogTitle>Submit Review</DialogTitle>
                            <DialogContent className='submitDialog'>
                                <Rating 
                                    onChange={(e) => setRating(e.target.value)} 
                                    value={rating} 
                                    size='large'
                                    icon={<FaStar className="text-yellow-400" />}
                                    emptyIcon={<FaStar className="text-gray-300" />}
                                />
                                <textarea
                                    className='w-full mt-4 p-2 border rounded-md'
                                    cols={'30'}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={'5'}
                                    placeholder="Write your review here..."
                                ></textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                                <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>
                            </DialogActions>
                        </Dialog>
                        {products?.reviews && products?.reviews[0] ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products?.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                            </div>
                        ) : (
                            <p className='text-center text-xl text-gray-600 mt-6'>No Reviews Yet</p>
                        )}
                        <button 
                                onClick={submitReviewToggle} 
                               className=' bg-white px-4 w-full cursor-pointer font-medium t  border-2 capitalize
             text-black p-2 m-2 shadow-[0.2em_0.2em] border-yellow-500 r hover:shadow-[0.15em_0.15em_yellow] hover:-translate-x-1 hover:-translate-y-1 duration-300'
                            >
                                Submit Review
                            </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ProductDetails;
