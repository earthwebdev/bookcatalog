import React from 'react'

const CardTypeFeaturedSlider = (props) => {
    const {title, description, imageUrl, price, authors} = props.data;
    const index = props.index;
    //console.log((index + 1), title);
  return (
    <>
        
<a href="#" className="relative flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img className="object-cover w-full rounded-t-lg" src={imageUrl} alt={title} />
    <div className="absolute flex flex-col justify-between items-center p-4 leading-normal bg-tranparent text-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-50 dark:text-white">{title} {index +1}</h5>
        <p className="mb-3 font-normal text-gray-50 dark:text-gray-400">By {authors?.name}</p>
        <p className="mb-3 font-normal text-gray-50 dark:text-gray-400 bg-transparent">{ description?.length > 60?description.slice(0,60)+'...':description }</p>
        <p className="mb-3 font-normal text-gray-50 dark:text-gray-400">Rs {price}</p>
    </div>
</a>

    </>
  )
}

export default CardTypeFeaturedSlider