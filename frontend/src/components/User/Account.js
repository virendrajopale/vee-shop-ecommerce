import React, { useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { FaUserEdit, FaBox, FaLock } from 'react-icons/fa';

const Account = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="container mx-auto p-4">
            <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md shadow-md rounded-lg p-6 space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-semibold mb-4">My Profile</h1>
                <img
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                  src={user.avatar.url}
                  alt={user.name}
                />
                <Link
                  to="/me/update"
  className=' bg-white px-4 cursor-pointer font-medium  flex items-center   border-2 capitalize
             text-black p-2 m-2 shadow-[0.2em_0.2em] border-yellow-500  hover:shadow-[0.15em_0.15em_yellow] hover:-translate-x-1 hover:-translate-y-1 duration-300'
                >
                 Edit Profile
                </Link>
              </div>
              <div className="w-full flex flex-col items-center space-y-4">
                <div className="w-full text-center">
                  <h4 className="text-lg font-medium">Full Name</h4>
                  <p className="text-yellow-600 text-2xl">{user.name}</p>
                </div>
                <div className="w-full text-center">
                  <h4 className="text-lg font-medium">Email</h4>
                  <p className="text-yellow-600 text-2xl">{user.email}</p>
                </div>
                <div className="w-full flex justify-around">
                  <Link
                    to="/orders"
                      className=' bg-white px-4 cursor-pointer font-medium  flex items-center   border-2 capitalize
             text-black p-2 m-2 shadow-[0.2em_0.2em] border-yellow-500  hover:shadow-[0.15em_0.15em_yellow] hover:-translate-x-1 hover:-translate-y-1 duration-300'
                  >
                    <FaBox className="mr-2" /> My Orders
                  </Link>
                  <Link
                    to="/password/update"
                     className=' bg-white px-4 cursor-pointer font-medium  flex items-center   border-2 capitalize
             text-black p-2 m-2 shadow-[0.2em_0.2em] border-yellow-500  hover:shadow-[0.15em_0.15em_yellow] hover:-translate-x-1 hover:-translate-y-1 duration-300'
                  >
                    <FaLock className="mr-2" /> Change Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Account;
