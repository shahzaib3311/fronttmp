import React from "react";

const DesignCard = ({ name, price, img, desc, discount }) => {
  return (
    <div className="relative mx-auto card w-full max-w-xs glass my-10 text-white bg-opacity-25">
      {discount && (
        <div className="absolute top-0 right-0 bg-red-600 text-white p-2 rounded-bl-lg">
          SALE
        </div>
      )}
      <figure className="p-2">
        <img
          src={`https://api.dripsaint.com${img}`}
          alt={name}
          className="w-full h-60 object-contain"
        />
      </figure>
      <div className="card-body p-5">
        <h2 className="card-title text-base md:text-2xl flex flex-col md:flex-row items-start md:items-center">
          <span className="truncate">{name}</span>
        </h2>
        {discount && (
          <div className="flex rounded-2xl badge badge-outline p-4 items-center  space-x-3 text-sm md:text-base lg:text-lg xl:text-xl">
            <span className="line-through text-xl font-bold">{price}</span>
            <span className="text-xl font-bold text-black">{discount}</span>
          </div>
        )}
        {!discount && (
          <div className="card-actions mt-4">
            <div className="badge rounded-2xl badge-outline p-4 text-sm md:text-base lg:text-lg xl:text-xl font-bold">{price}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignCard;
