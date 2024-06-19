import React from 'react';
import { Link } from 'react-router-dom';

const WaitingForApproval = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Waiting for Approval</h1>
      <p className="text-gray-600 mb-6">
        Your profile is currently being reviewed. Please complete your profile details in the meantime.
      </p>
      <Link to="/profile" className="text-blue-500 hover:underline">
        Go to Profile
      </Link>
    </div>
  );
};

export default WaitingForApproval;
