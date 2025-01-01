import React from 'react'
import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

const FoodCard = ({item}) => {
  const {image,name,recipe,price} = item;
  const {user,sweetAlert} = useAuth();
  const navigate = useNavigate();
  const handleAddToCart = (food)=>{
    if(user && user.email){
      // Todo: Send Data 
      sweetAlert('You Are Not Logged In!','Please Login to Add to Cart','question','Login')
      .then((result)=>{
        if(result.isConfirmed){
          // alert('s')
          navigate('/login')
        }
      })
      console.log(food)
    }else{

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
              <button className='btn btn-outline border-0 border-b-4 border-b-orange-600 mt-4 mx-auto bg-[#cf9919ea]' onClick={()=>handleAddToCart(item)}> Add To Cart </button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default FoodCard