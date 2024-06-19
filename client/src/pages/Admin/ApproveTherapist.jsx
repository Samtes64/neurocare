import { DocumentArrowDownIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ApproveTherapist = () => {
  const [listOfUnverifiedTherapists, setListUnverifiedTherapists] = useState([]);
  const token = localStorage.getItem("fittrack-app-token");

  useEffect(() => {
    // Fetch unverified therapists when component mounts
    fetchUnverifiedTherapists();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const fetchUnverifiedTherapists = async () => {
    try {
      const response = await axios.get("http://localhost:3003/api/therapist/allunverified", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListUnverifiedTherapists(response.data);
    } catch (error) {
      console.error("Error fetching unverified therapists:", error);
      // Handle errors if needed
    }
  };

  const handleVerify = async (therapistId) => {
    try {
      const response = await axios.put(
        `http://localhost:3003/api/therapist/approve/${therapistId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        // If approval succeeds, update the therapist list
        fetchUnverifiedTherapists();
      } else {
        // Handle other response statuses if needed
      }
    } catch (error) {
      console.error("Error approving therapist:", error);
      // Handle errors if needed
    }
  };

  const handleDownloadDocuments = async (therapistId) => {
    try {
      const response = await axios.get(`http://localhost:3003/api/documents/download/${therapistId}`, {
        responseType: 'blob', // Set the response type to blob
        headers: { Authorization: `Bearer ${token}` },
      });

      // Create a blob object from the response
      const blob = new Blob([response.data], { type: 'application/zip' });

      // Create a URL for the blob object
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `therapist_${therapistId}_documents.zip`);

      // Append the link to the body
      document.body.appendChild(link);

      // Click the link to trigger the download
      link.click();

      // Remove the link element from the body
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading therapist documents:', error);
      // Handle errors if needed
    }
  };

  return (
    <div className='h-screen'>
      <main className="pt-2 transition-all duration-[400ms]">
        <div className="px-4 md:px-16">
          <p className="text-gray-700 text-3xl mb-8 font-bold mt-10">
            Approve Therapist
          </p>
          <div className="grid gap-5 bg-white mb-10 p-9 rounded-lg">
            {listOfUnverifiedTherapists.map((value) => (
              <div
                className="flex justify-between border p-6 rounded-md"
                key={value.id}
              >
                <div className="grid">
                  <p className="text-black text-lg font-semibold">
                    {value.firstName + " " + value.lastName}
                  </p>
                  <p className="text-primary">
                    {value.specialization || "No Specialization"}
                  </p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => handleDownloadDocuments(value._id)}>
                    <DocumentArrowDownIcon
                      className="h-6 w-6 text-blue-500 font-semibold mr-3"
                    />
                  </button>
                  <button
                    className="text-white bg-primary hover:border-primary hover:border hover:text-primary hover:bg-white p-2 px-4 rounded-md"
                    onClick={() => handleVerify(value._id)}
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApproveTherapist;
