import React, { useState } from 'react'
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from 'axios';


const Documents = () => {
  const [listOfResume, setListOfResume] = useState([]);
  const openDocumentInNewTab = (documentName) => {
    // Construct the URL to the document (adjust the path as needed)
    const documentURL = `https://api.askamarlabor.com/serverapi/documents/${documentName}`;

    // Open the document in a new tab
    window.open(documentURL, "_blank");
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("document", selectedFile);

    axios
      .post("https://api.askamarlabor.com/serverapi/resume", formData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      })
      .then((response) => {
        // Handle successful upload, e.g., show a success message or update the document list
        console.log("Document uploaded successfully.");
        axios
          .get(
            "https://api.askamarlabor.com/serverapi/resume/getResumeBySelf",
            {
              headers: { accessToken: localStorage.getItem("accessToken") },
            }
          )
          .then((Response) => {
            setListOfResume(Response.data);
            setSelectedFile(null);
          });
      })
      .catch((error) => {
        // Handle upload error, e.g., display an error message
        console.error("Error uploading document:", error);
      });
  };

  const handleDeleteDocument = (documentId) => {
    // Send a DELETE request to your backend to delete the document by its ID
    axios
      .delete(`https://api.askamarlabor.com/serverapi/resume/${documentId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        // Handle successful deletion, e.g., remove the deleted document from the UI
        console.log("Document deleted successfully.");
        // Update the list of documents to reflect the deletion
        setListOfResume((prevList) =>
          prevList.filter((doc) => doc.id !== documentId)
        );
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
      });
  };
  return (
    <main
        className={`pt-16 transition-all duration-[400ms]`}
      >
        <div className="px-4 md:px-16">
          {" "}
          <div>
            <p className="text-gray-700 text-3xl mb-16 font-bold mt-10">
              Documents
            </p>

            <div className="grd bg-white gap-5 mb-10  rounded-lg">
              <p className="text-black font-semibold mb-4">My Document</p>
              {listOfResume.map((value) => {
                return (
                  <div className="flex gap-2 mb-3">
                    <p
                      className="bg-secondary w-fit text-primary p-2 rounded-md"
                      onClick={() => openDocumentInNewTab(value.resume)}
                    >
                      {value.resume}
                    </p>
                    <button onClick={() => handleDeleteDocument(value.id)}>
                      <XMarkIcon class="h-6 w-6 text-red-500 font-semibold" />
                    </button>
                  </div>
                );
              })}

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
  )
}

export default Documents