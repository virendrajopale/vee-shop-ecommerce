import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Search from '../../Product/Search';  // Import Search component
import './nbar.css';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const menubar = [
    { id: 1, link: 'Home', url: '/' },
    { id: 2, link: 'Products', url: '/products' },
    { id: 3, link: 'Cart', url: '/cart' },
    
  ];

  const authLink = isAuthenticated
    ? { id: 5, link: 'Profile', url: '/profile' }
    : { id: 5, link: 'Login', url: '/login' };

  const [nav, setNav] = useState(false);

  return (
    <div className='flex items-center justify-between sticky top-0 w-full h-20 px-4 z-10 bg-white shadow-[0.0em_0.2em_black] border-yellow-500'>
      <div className=' font-sign capitalize text-black'>
        <Link to='/'>Vee shop</Link>
      </div>
      <ul className='hidden md:flex z-10 flex-1 justify-end'>
        {menubar.map((links) => (
        
            <Link  key={links.id} className=' px-4 cursor-pointer font-medium text-white capitalize
              p-2 m-2 shadow-[0.2em_0.2em_white] bg-green-500  hover:shadow-[0.15em_0.15em_green] hover:-translate-x-1 hover:-translate-y-1 duration-300'
              to={links.url} >
              {links.link}
            </Link>
          
        ))}
       
          <Link
          key={authLink.id}
           to={authLink.url} className=' px-4 cursor-pointer font-medium  capitalize
             text-white p-2 m-2 shadow-[0.2em_0.2em_white] bg-green-500  hover:shadow-[0.15em_0.15em_green] hover:-translate-x-1 hover:-translate-y-1 duration-300'
           >
            {authLink.link}
          </Link>
        
      </ul>


      <div
        onClick={() => setNav(!nav)}
        className='pr-4 z-10 cursor-pointer md:hidden text-black'
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>
      {nav && (
        <ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-white font-sign'>
          {menubar.map((links) => (
            <li
              className='capitalize cursor-pointer px-4 py-6 text-4xl font-sign text-black'
              key={links.id}
            >
              <Link to={links.url} onClick={() => setNav(!nav)}>
                {links.link}
              </Link>
            </li>
          ))}
          <li
            className='capitalize cursor-pointer px-4 py-6 text-4xl font-sign text-black'
            key={authLink.id}
          >
            <Link to={authLink.url} onClick={() => setNav(!nav)}>
              {authLink.link}
            </Link>
          </li>
        </ul>
      )}
      <Search />
    </div>
  );
};

export default Navbar;
