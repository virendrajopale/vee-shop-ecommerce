import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import Pagination from 'react-js-pagination';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import MetaData from '../layout/MetaData';
import './Products.css'
const categories = [
  "Laptop",
  "Food",
  "Cloths",
  "Electronics",
  "Attire",
  "Toys",
  "Books",
  "SmartPhones"
];

const Products = () => {
  const { loading, products, error, resultPerPage, productsCount, filteredProductsCount } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 85000]);
  const [category, setCategory] = useState("");
  const [ratings, setRating] = useState(0);

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  const clearFilters = () => {
    setPrice([0, 85000]);
    setCategory("");
    setRating(0);
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"PRODUCTS Vee shop"} />
          
          <div className='flex '>
          <div className="lg:sticky top-20 left-0  bg-white p-4 shadow-[0.2em_0.2em] border-yellow-500 h-[100vh] w-60 text-black flex flex-col justify-between">
           <span>

            <Typography className="text-lg font-semibold mb-4">Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              color='yellow'
              max={85000}
              className="mb-6 text-yellow-300"
            />
           </span>
            <ul className="mb-6">
              {categories.map((cat) => (
                <li
                    className={`cursor-pointer mb-2  ${category === cat ? 'text-yellow-600 scale-105' : 'texwhitet- hover:text-blue-600'}`}
                    key={cat}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
            <Typography component="legend" className="text-lg font-semibold mb-4">Ratings Above</Typography>
            <Slider
              value={ratings}
              onChange={(e, newRating) => setRating(newRating)}
              aria-labelledby="continuous-slider"
              min={0}
              max={5}
              valueLabelDisplay="auto"
            />
             <button
                onClick={clearFilters}
                className=' bg-white px-4 cursor-pointer font-medium   border-2 capitalize
                text-black p-2 m-2 shadow-[0.2em_0.2em] border-yellow-500  hover:shadow-[0.15em_0.15em_yellow] hover:-translate-x-1 hover:-translate-y-1 duration-300'              >
                Clear Filters
              </button>
          </div>
              <div className='flex flex-col  justify-center w-full h-fit'>

          <div className="flex flex-wrap justify-center gap-6 p-4 ml-8">
            {products && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        {
            <div className="flex justify-center my-8">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="⟩"
                prevPageText="⟨"
                firstPageText="«"
                lastPageText="»"
                itemClass="page-item"
                linkClass="page-link"
                activeClass=" text-red-500"
                activeLinkClass=" text-red-500"
                itemClassPrev="page-item"
                itemClassNext="page-item"
                linkClassPrev="page-link"
                linkClassNext="page-link"
              />
            </div>
        }
          
              </div>

          </div>
          
        </>
      )}
    </>
  );
};

export default Products;
