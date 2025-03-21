import { FaUserFriends, FaMapMarkerAlt } from "react-icons/fa";

const FriendCard = ({ name, description, placesVisited }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          <FaUserFriends className="text-blue-500 text-xl" />
        </div>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <p className="text-gray-600 text-sm flex items-center mt-2">
          <FaMapMarkerAlt className="mr-1" /> {placesVisited} Locais Visitados
        </p>
      </div>
    </div>
  );
};

export default FriendCard;
