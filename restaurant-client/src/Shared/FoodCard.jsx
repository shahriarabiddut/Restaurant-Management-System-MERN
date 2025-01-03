import React from 'react'
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useCart from '../hooks/useCart';

const FoodCard = ({item}) => {
  const {_id,name,image,price,recipe} = item;
  const {user,sweetAlert,showToast} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  //
  const [,refetch] = useCart()
  const handleAddToCart = ()=>{
    if(user && user.email){
      // Todo: Send Data 
      // console.log(food);
      const cartItem = {
        menuId : _id,
        email : user.email,
        name,image,price,
      }
      // console.log(cartItem);
      axiosSecure.post('/carts',cartItem)
      .then(res=>{
        console.log(res);
        if(res.data.insertedId){
          showToast('Added To Cart','success');
          // Refetch the cart items count
          refetch()
        }
      })
    }else{
      sweetAlert('You Are Not Logged In!','Please Login to Add to Cart','question','Login')
      .then((result)=>{
        if(result.isConfirmed){
          // alert('s')
          navigate('/login' , {state : {from:location}})
        }
      })
    }
  }
  return (
    <div>
        <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
            <img
            src={image}
            alt={name}/>
        </figure>
        <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white rounded-lg">${price}</p>
        <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{recipe}</p>
            <div className="flex justify-center pb-5">
              <button className='btn btn-outline border-0 border-b-4 border-b-orange-600 mt-4 mx-auto bg-[#cf9919ea]' onClick={handleAddToCart}> Add To Cart </button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default FoodCard