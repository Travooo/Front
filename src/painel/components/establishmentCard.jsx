import React from "react";
import { FaMapMarkerAlt, FaHeart, FaStar } from "react-icons/fa";

const EstablishmentCard = ({ name, address, image, rating }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-64"> {/* Card menor */}
      <img src={image} alt={name} className="w-full h-32 object-cover" /> {/* Imagem menor */}
      <div className="p-2"> {/* Reduziu o padding */}
        <div className="flex items-center justify-between">
          <span className="bg-yellow-400 text-white text-xs px-1 py-1 rounded flex items-center"> {/* Texto menor */}
            <FaStar className="mr-1" /> {rating}
          </span>
          <FaHeart className="text-red-500 text-xl cursor-pointer" />
        </div>
        <h3 className="text-md font-semibold mt-2">{name}</h3> {/* Texto menor */}
        <p className="text-gray-600 text-xs flex items-center"> {/* Texto menor */}
          <FaMapMarkerAlt className="mr-1" /> {address}
        </p>
      </div>
    </div>
  );
};

export default EstablishmentCard;
