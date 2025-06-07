import React from 'react';

const UserProfile = ({ name, image }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center">
      <img 
        src={image} 
        alt={`Foto de ${name}`} 
        className="w-16 h-16 rounded-full mr-4 object-cover"
      />
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">Bem-vindo(a) ao seu painel</p>
      </div>
    </div>
  );
};

export default UserProfile;


