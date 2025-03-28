import React from "react";

const UserProfile = ({ name, image }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white shadow rounded-lg">
      <img src={image} alt="Perfil" className="w-16 h-16 rounded-full object-cover" />
      <h2 className="text-lg font-semibold">{name}</h2>
    </div>
  );
};

export default UserProfile;
