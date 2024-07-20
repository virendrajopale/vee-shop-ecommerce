import axios from 'axios'
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from '../constants/cartConstant'


export const addToCart=(id,quantity)=>async(dispatch,getState)=>{


        const {data}=await axios.get(`/api/v1/products/product/${id}`)
        dispatch({type:ADD_TO_CART,payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images.url,
            Stock:data.product.Stock,
            quantity,

        }})
   localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
//cart remove
export const removeFromCart=(id)=>async(dispatch,getState)=>{
    dispatch({
        type:REMOVE_CART_ITEM,
        payload:id
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}
export const saveShippingInfo=(data)=>async(dispatch)=>{
dispatch({
    type:SAVE_SHIPPING_INFO,
    payload:data,
})
localStorage.setItem('shippingInfo',JSON.stringify(data))

}