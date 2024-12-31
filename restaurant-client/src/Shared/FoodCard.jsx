import React from 'react'

const FoodCard = ({item}) => {
  const {image,name,recipe,price} = item;
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
              <button className='btn btn-outline border-0 border-b-4 border-b-orange-600 mt-4 mx-auto bg-[#cf9919ea]'> Add To Cart </button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default FoodCard