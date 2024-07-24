import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import MetaData from '../layout/MetaData';

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <>
      
          <form 
           className='  px-4 p-2 cursor-pointer font-medium    capitalize
             text-black  mr-20 shadow-[0.2em_0.2em_white] bg-green-500  hover:shadow-[0.15em_0.15em_green] hover:-translate-x-1 hover:-translate-y-1 duration-300'
            onSubmit={searchSubHandler}
          >
            <div className="flex items-center">
              <input
                type="text"
                className="w-full bg-transparent  text-white focus:outline-none placeholder:text-white"
                placeholder="Enter product name..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              
                <FaSearch className="text-xl" />
            </div>
          </form>
          
      
      
    </>
  );
};

export default Search;