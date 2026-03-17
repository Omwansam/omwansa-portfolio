import React from 'react';

const FullPageLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen pt-16 w-full flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-xl text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default FullPageLoader;

