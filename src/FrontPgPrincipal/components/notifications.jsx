import React from "react";

const Notifications = ({ notifications }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Notificações</h2>
      <ul className="list-disc pl-4">
        {notifications.map((note, index) => (
          <li key={index} className="text-gray-700">{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
