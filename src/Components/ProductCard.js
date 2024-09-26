import React from "react";

const ProductCard = ({ name, price, img, desc, discount }) => {
  const fallbackimg = '/dripSaintAssets/fallbackimg.jpg'
  return (
    <div className="relative mx-auto bg-black card w-full max-w-96  text-white bg-opacity-25">
      {discount && (
        <div className="rounded-tr-2xl absolute top-0 right-0 bg-red-600 text-white p-2 ">
          SALE
        </div>
      )}
      <figure className="" >
        <img
          src={`https://api.dripsaint.com${img}`}
          alt={name}
          className="w-full object-cover p-2 rounded-2xl"
          onError={(e) => (e.target.src = fallbackimg)} 
        />
      </figure>
      <div className="card-body p-2 justify-start">
        <h2 className="   card-title  text-sm md:text-base lg:text-lg xl:text-xl">
          {name.toUpperCase()}
          {/* <div className="badge badge-secondary ml-2">NEW</div> */}
        </h2>
        {/* <p className="text-sm md:text-base lg:text-lg xl:text-xl">{desc}</p> */}
        <div className="card-actions justify-start">
          {discount ? (
            <div className="flex rounded-2xl badge badge-outline p-4 items-center  space-x-3 text-sm md:text-base lg:text-lg xl:text-xl">
              <span className="line-through   font-bold">Rs {price}</span>
              <span className="  font-bold text-red-500">Rs {discount}</span>
            </div>
          ) : (
            <div className="badge rounded-2xl badge-outline p-4 text-sm md:text-base lg:text-lg xl:text-xl font-bold">Rs {price}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
