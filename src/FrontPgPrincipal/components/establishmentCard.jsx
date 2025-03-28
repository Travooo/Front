import React from "react";
import { FaMapMarkerAlt, FaHeart, FaStar } from "react-icons/fa";

const EstablishmentCard = ({ name, address, image, rating }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="bg-yellow-400 text-white text-sm px-2 py-1 rounded flex items-center">
            <FaStar className="mr-1" /> {rating}
          </span>
          <FaHeart className="text-red-500 text-xl cursor-pointer" />
        </div>
        <h3 className="text-lg font-semibold mt-2">{name}</h3>
        <p className="text-gray-600 text-sm flex items-center">
          <FaMapMarkerAlt className="mr-1" /> {address}
        </p>
      </div>
    </div>
  );
};

export default EstablishmentCard;
