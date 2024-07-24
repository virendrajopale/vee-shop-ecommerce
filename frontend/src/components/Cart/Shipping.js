import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { State, Country } from 'country-state-city';
import { saveShippingInfo } from '../../actions/cartActions';
import MetaData from '../layout/MetaData';
import CheckOutStep from './CheckOutStep';
import { FaHome, FaCity, FaPhone, FaGlobe, FaMapMarkerAlt, FaShippingFast } from 'react-icons/fa';

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { shippingInfo } = useSelector(state => state.cart);
  
  const [city, setCity] = useState(shippingInfo.city);
  const [address, setAddress] = useState(shippingInfo.address);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length !== 10) {
      alert.error("Phone No Should be 10 digits");
      return;
    }
    dispatch(saveShippingInfo({ address, city, state, country, phoneNo, pinCode }));
    navigate('/order/confirm');
  };

  return (
    <>
      <MetaData title="Shipping Details - Vee Shop" />
      <CheckOutStep activeStep={0} />
      <div className="flex flex-col items-center justify-center min-h-screen  py-8">
        <div className="bg-white p-6 shadow-[0.2em_0.2em_black]   w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Shipping Details</h2>
          <form onSubmit={shippingSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaHome className="text-gray-600" />
              <input 
                type="text" 
                placeholder="Address" 
                required 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                className="w-full px-4 py-2 border  text-black  focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <FaCity className="text-gray-600" />
              <input 
                type="text" 
                placeholder="City" 
                required 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                className="w-full px-4 py-2 border  text-black  focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-gray-600" />
              <input 
                type="number" 
                placeholder="PinCode" 
                required 
                value={pinCode} 
                onChange={(e) => setPinCode(e.target.value)} 
                className="w-full px-4 py-2 border  text-black  focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-gray-600" />
              <input 
                type="number" 
                placeholder="Phone Number" 
                required 
                value={phoneNo} 
                onChange={(e) => setPhoneNo(e.target.value)} 
                className="w-full px-4 py-2 border  text-black  focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <FaGlobe className="text-gray-600" />
              <select 
                required 
                value={country} 
                onChange={(e) => setCountry(e.target.value)} 
                className="w-full px-4 py-2 border text-black   focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="" className='text-black '>Country</option>
                {Country && Country.getAllCountries().map((item) => (
                  <option value={item.isoCode} key={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {country && (
              <div className="flex items-center space-x-2">
                <FaShippingFast className="text-black " />
                <select 
                  required 
                  value={state} 
                  onChange={(e) => setState(e.target.value)} 
                  className="w-full px-4 py-2 text-black  border  focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="" className='text-black '>State</option>
                  {State && State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button 
              type="submit" 
            className=' px-4 w-full cursor-pointer font-medium  capitalize
             text-white p-2 m-2 shadow-[0.2em_0.2em_white] bg-green-500  hover:shadow-[0.15em_0.15em_green] hover:-translate-x-1 hover:-translate-y-1 duration-300'
              disabled={!state}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Shipping;
