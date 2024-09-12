import React, { useEffect, useState } from 'react';

const PopUp = ({ user}) => {

    const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setVisible(false);
    }, 3000);
     // Pop-up will disappear after 3 seconds

    return () => clearTimeout(timer);

  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 right-0 mt-5 mr-5 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-3 z-50">
      <span className="text-xl">✔️</span>
      <span>Welcome, {user.displayName}!</span>
    </div>
  );
};

export default PopUp;
