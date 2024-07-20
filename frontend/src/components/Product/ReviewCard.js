import React from 'react'
import ReactStars from 'react-rating-stars-component'
import profilePng from '../../images/Profile.png'
import {Rating} from '@material-ui/lab'
const ReviewCard = ({review}) => {
    const options={
      size: "large",
      value: review.rating,
      readOnly:true,
     precision:0.5
       }
  return (
    <>
    <div className="reviewCard">
        <img src={profilePng} alt="User" />
        <p className=' text-black'>{review.name}</p>
        <Rating {...options}/>
        <span className='reviewComment'>{review.comment}</span>
    </div>
    </>
  )
}

export default ReviewCard
