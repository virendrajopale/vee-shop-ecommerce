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
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRating] = useState(0);

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
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
          <h2 className="text-center text-4xl font-semibold my-8">Products</h2>
          <div className='flex'>
          <div className=" top-20 left-8 bg-black/20 backdrop-blur-sm p-4 h-[30rem] text-white rounded-lg shadow-lg">
            <Typography className="text-lg font-semibold mb-4">Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
              className="mb-6"
            />
            <Typography className="text-lg font-semibold mb-4">Categories</Typography>
            <ul className="mb-6">
              {categories.map((category) => (
                <li
                  className="cursor-pointer mb-2 text-blue-600 hover:underline"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
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
          </div>

          <div className="flex flex-wrap justify-center gap-6 p-4 ml-8">
            {products && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
         
          

          </div>
          {resultPerPage && (
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
                activeClass="bg-blue-600 text-white"
                activeLinkClass="bg-blue-600 text-white"
                itemClassPrev="page-item"
                itemClassNext="page-item"
                linkClassPrev="page-link"
                linkClassNext="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
