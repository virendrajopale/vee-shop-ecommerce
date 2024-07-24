import React from 'react';
import { Rating } from '@material-ui/lab';
import profilePng from '../../images/Profile.png';

const ReviewCard = ({ review }) => {
  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
console.log(review);
  return (
    <div className="bg-white  flex flex-col items-center  b px-4 cursor-pointer font-medium t  border-2 capitalize
             text-black p-2 m-2 shadow-[0.2em_0.2em] border-yellow-500 r hover:shadow-[0.15em_0.15em_yellow] hover:-translate-x-1 hover:-translate-y-1 duration-300">
      <img src={profilePng} alt="User" className="w-16 h-16 rounded-full mb-4" />
      <p className="text-lg font-semibold text-gray-800 mb-2">{review.name}</p>
      <Rating {...options} className="mb-2" />
      <p className="text-gray-600">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
