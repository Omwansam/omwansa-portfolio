import React from 'react';

const FullPageError = ({ title = 'Something went wrong', message = 'Please try again.', onRetry }) => {
  return (
    <div className="min-h-screen pt-16 w-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default FullPageError;

