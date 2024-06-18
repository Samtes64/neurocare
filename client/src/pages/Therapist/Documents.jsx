import React, { useState, useEffect } from 'react';
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  uploadDocument,
  getDocumentsByTherapist,
  deleteDocument,
} from '../../api'; // Adjust the path as necessary

const Documents = () => {
  const [listOfResume, setListOfResume] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const token = localStorage.getItem("fittrack-app-token");

  useEffect(() => {
    // Fetch the documents on component mount
    const fetchDocuments = async () => {
      try {
        const response = await getDocumentsByTherapist(token);
        setListOfResume(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [token]);

  const openDocumentInNewTab = (documentName) => {
    // Construct the URL to the document (adjust the path as needed)
    const documentURL = `http://localhost:3003/documents/${documentName}`;

    // Open the document in a new tab
    window.open(documentURL, "_blank");
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("document", selectedFile);

    try {
      await uploadDocument(token, formData);
      console.log("Document uploaded successfully.");
      const response = await getDocumentsByTherapist(token);
      setListOfResume(response.data);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      await deleteDocument(token, documentId);
      console.log("Document deleted successfully.");
      setListOfResume((prevList) =>
        prevList.filter((doc) => doc._id !== documentId)
      );
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <main className="pt-16 transition-all duration-[400ms]">
      <div className="px-4 md:px-16">
        <div>
          <p className="text-gray-700 text-3xl mb-16 font-bold mt-10">
            Documents
          </p>

          <div className="grd bg-white gap-5 mb-10 rounded-lg">
            <p className="text-black font-semibold mb-4">My Document</p>
            {listOfResume.map((value) => (
              <div className="flex gap-2 mb-3" key={value._id}>
                <p
                  className="bg-slate-200 w-fit text-primary p-2 rounded-md cursor-pointer"
                  onClick={() => openDocumentInNewTab(value.document)}
                >
                  {value.document}
                </p>
                <button onClick={() => handleDeleteDocument(value._id)}>
                  <XMarkIcon className="h-6 w-6 text-red-500 font-semibold" />
                </button>
              </div>
            ))}

            <input
              type="file"
              className="file-input file-input-sm file-input-bordered file-input-info w-full max-w-xs bg-white block text-sm text-gray-500 file:bg-primary file:text-white mt-4"
              accept=".pdf,.doc,.docx,.txt,.rtf,.odt,.ppt,.pptx"
              onChange={handleFileChange}
              required
            />
          </div>
          <button
            className="btn btn-outline border-primary hover:text-primary hover:bg-white bg-primary text-white mb-10"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </main>
  );
};

export default Documents;
