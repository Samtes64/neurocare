import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { CiLocationOn, CiViewTimeline } from "react-icons/ci";
import { BsFillCalendarMinusFill, BsFillPersonFill } from "react-icons/bs";
import { BiSolidDownload, BiPhone } from "react-icons/bi";
import { RiLoopLeftLine } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { getTherapistById, setTherapistForPatient } from "../api";
import { Avatar } from "@mui/material";
const TherapistProfile = () => {
  const { id } = useParams();
  const therapistId = parseInt(id);
  const token = localStorage.getItem("fittrack-app-token");

  const [therapist, settherapist] = useState({});
  const [notFound, setNotFound] = useState(false);

  const [rating, setRating] = useState(3); // State for rating
  const [comment, setComment] = useState(""); // State for comment

  const getTherapist = async () => {
    const token = localStorage.getItem("fittrack-app-token");
    await getTherapistById(token, id ? `?id=${id}` : "").then((res) => {
      settherapist(res.data);
    });
  };

  useEffect(() => {
    try {
      getTherapist();
    } catch (error) {
      console.error(
        "Error fetching therapist:",
        error.response ? error.response.data : error.message
      );
    }
  }, [id]);

  const [Ratepopup, setRatepopup] = useState(false);
  const [chooseTherapistPopup, setChooseTherapistPopup] = useState(false);
  const Rate = (event) => {
    setRatepopup(!Ratepopup);
  };
  const ChoseTherapist = (event) => {
    setChooseTherapistPopup(!chooseTherapistPopup);
  };
  const [hasResume, setHasResume] = useState(false);

  //   useEffect(() => {
  //     // Make a request to check if the therapist has a resume
  //     axios
  //       .get(`https://api.askamarlabor.com/serverapi/resume/hasResume/${id}`, {
  //         headers: { accessToken: localStorage.getItem("accessToken") },
  //       })
  //       .then((response) => {
  //         setHasResume(response.data.hasResume);
  //       })
  //       .catch((error) => {
  //         console.error("Error checking resume:", error);
  //       });
  //   }, [id]);

  const [hasApplied, setHasApplied] = useState(false);

  const handleSetTherapist = async () => {
    const token = localStorage.getItem("fittrack-app-token");
    try {
      const response = await axios.post(
        `http://localhost:3003/api/therapist/settherapistforpatient?id=${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Therapist set successfully:', response.data);
      setChooseTherapistPopup(false); // Close the pop-up after confirming
    } catch (error) {
      console.error('Error setting therapist:', error.response ? error.response.data : error.message);
    }
  };

  //   useEffect(() => {
  //     // Make a request to check if the therapist has applied for a job
  //     axios
  //       .get(
  //         `https://api.askamarlabor.com/serverapi/appliedjobs/hasApplied/${id}`,
  //         {
  //           headers: { accessToken: localStorage.getItem("accessToken") },
  //         }
  //       )
  //       .then((response) => {
  //         setHasApplied(response.data.hasApplied);
  //       })
  //       .catch((error) => {
  //         console.error("Error checking job application:", error);
  //       });
  //   }, [id]);

  //   const handleDownload = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.askamarlabor.com/serverapi/resume/download/${id}`,
  //         {
  //           responseType: "blob", // Set the response type to blob
  //           headers: { accessToken: localStorage.getItem("accessToken") },
  //         }
  //       );

  //       // Create a blob URL from the response data
  //       const url = window.URL.createObjectURL(new Blob([response.data]));

  //       // Create a temporary link element and trigger the download
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", `documents_${id}.zip`);
  //       document.body.appendChild(link);
  //       link.click();

  //       // Clean up the temporary link
  //       document.body.removeChild(link);
  //     } catch (error) {
  //       console.error("Error downloading resumes:", error);
  //       // Handle the error as needed
  //     }
  //   };

  if (notFound) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-100">
        <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Therapist Not Found</h2>
          <p className="text-gray-600 mb-4">
            The therapist you are looking for does not exist.
          </p>
          <Link to="/therapist" className="text-primary hover:underline">
            Go back to therapists list
          </Link>
        </div>
      </div>
    );
  }

  const {
    fullName,
    firstName,
    lastName,
    phoneNumber,
    specialization,
    description,
    profileImageName,
    

    profilePicture,
    
    gender,
    
    brokerPhoneNumber,
    averageRating,
  } = therapist;

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const submitReview = () => {
    // Create an object with the data to send
    const reviewData = {
      Rating: rating,
      Comment: comment,
      TherapistId: id, // You need to define 'id' in your component
    };

    // Send a POST request to your server
    axios
      .post(
        "https://api.askamarlabor.com/serverapi/review/ratetherapist",
        reviewData,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        // Handle the response from the server
        console.log("Review submitted successfully");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error submitting review", error);
      });
    setRatepopup(!Ratepopup);
  };

  return (
    <div className="h-screen">
      <div className=" mb-10">
        <div className="bg-white text-black px-5 lg:px-20 py-3 flex flex-col lg:flex-row items-center gap-2 lg:gap-8 mb-5 justify-center">
          <div className="avatar">
            <div className="w-24 rounded-full">
              {/* <img
                src={`https://api.askamarlabor.com/serverapi/images/${profilePicture}`}
              /> */}
              <Avatar
                src={profilePicture}
                sx={{ width: 100, height: 100 }}
                className="mx-auto text-2xl"
              >
                {firstName}
              </Avatar>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <h2 className="text-xl text-center lg:text-left">
              {firstName + " " + lastName}
            </h2>
            <div className="flex items-center gap-8">
              <p href="#" className="text-primary text-sm">
                {specialization}
              </p>
              
              
            </div>

            <div className="rating mb-4 mx-auto lg:mx-0">
              <input
                type="radio"
                name={id}
                className="mask mask-star-2 bg-orange-400"
                value={1}
                checked={averageRating === "1" || averageRating === 1}
                disabled
              />
              <input
                type="radio"
                name={id}
                className="mask mask-star-2 bg-orange-400"
                value={2}
                checked={averageRating === "2" || averageRating === 2}
                disabled
              />
              <input
                type="radio"
                name={id}
                className="mask mask-star-2 bg-orange-400"
                value={3}
                checked={averageRating === "3" || averageRating === 3}
                disabled
              />
              <input
                type="radio"
                name={id}
                className="mask mask-star-2 bg-orange-400"
                value={4}
                checked={averageRating === "4" || averageRating === 4}
                disabled
              />
              <input
                type="radio"
                name={id}
                className="mask mask-star-2 bg-orange-400"
                value={5}
                checked={averageRating === "5" || averageRating === 5}
                disabled
              />
            </div>
          </div>
          <div className="ml-auto flex gap-4 mx-auto lg:mr-0">
            {hasResume && hasApplied && (
              <button
                // onClick={() => handleDownload()}
                className="bg-primary text-white py-3 px-6 rounded-md hover:bg-secondary hover:text-[16px] hover:text-primary duration-500 flex items-center gap-2"
              >
                {" "}
                <BiSolidDownload />
                Document
              </button>
            )}

            <button
              className=" bg-primary text-white py-3 px-6 rounded-md hover:bg-primary hover:text-[16px] hover:text-white duration-500"
              onClick={Rate}
            >
              Rate
            </button>
            <button
              className=" bg-primary text-white py-3 px-6 rounded-md hover:bg-primary hover:text-[16px] hover:text-white duration-500"
              onClick={ChoseTherapist}
            >
              Choose Therapist
            </button>
          </div>
        </div>
        <div className="px-5 md:px-10 lg:px-20 flex justify-center gap-8 text-black flex-col lg:flex-row">
          <div className=" lg:w-3/5 w-full order-2 lg:order-none">
            <h2 className="text-lg font-semibold text-center md:text-left">
              About Therapist
            </h2>
            <p className=" font-light py-3 text-base">{description}</p>
          </div>
          <div className="bg-white lg:w-2/5 w-full rounded-2xl p-9 flex flex-col gap-10">
            <div className="flex items-center gap-5">
              
              <div className="text-sm">
                <p className=" font-semibold">Specialization</p>
                <p className=" text-xs">{specialization}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              
              <div className="text-sm">
                <p className=" font-semibold">Gender</p>
                <p className=" text-xs">{gender}</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
             
              <div className="text-sm">
                <p className=" font-semibold">Gender</p>
                <p className=" text-xs">{gender}</p>
              </div>
            </div>
            {phoneNumber ? (
              <div className="flex items-center gap-5">
                
                <div className="text-sm">
                  <p className=" font-semibold">Phone number</p>
                  <p className=" text-xs">{phoneNumber}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div
        className={
          Ratepopup
            ? "bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col px-9 py-4 gap-3 rounded-xl shadow-xl"
            : "hidden"
        }
      >
        <button className="absolute top-2 right-2 text-gray-600" onClick={Rate}>
          <AiOutlineClose />
        </button>
        <h2 className="text-black text-center font-semibold">Rate</h2>
        <div className="rating rating-md gap-4 justify-center">
          <input
            type="radio"
            name="rating"
            value={1}
            checked={rating === 1}
            onChange={handleRatingChange}
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating"
            value={2}
            checked={rating === 2}
            onChange={handleRatingChange}
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating"
            value={3}
            checked={rating === 3}
            onChange={handleRatingChange}
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating"
            value={4}
            checked={rating === 4}
            onChange={handleRatingChange}
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating"
            value={5}
            checked={rating === 5}
            onChange={handleRatingChange}
            className="mask mask-star-2 bg-orange-400"
          />
        </div>
        <textarea
          name="comment"
          id="comment"
          cols="30"
          rows="5"
          className="bg-blue-100 outline-none p-4 rounded-lg text-black text-sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          className="bg-primary text-white py-3 px-6 rounded-md hover:bg-slate-100 hover:text-[16px] hover:text-primary duration-500"
          onClick={submitReview}
        >
          Submit
        </button>
      </div>
      <div
        className={
          chooseTherapistPopup
            ? "bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col px-9 py-4 gap-3 rounded-xl shadow-xl"
            : "hidden"
        }
      >
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={ChoseTherapist}
        >
          <AiOutlineClose />
        </button>
        <h2 className="text-black text-center font-semibold">
          Confirm Therapist
        </h2>
        <p className="text-center text-black">
          Are you sure you want to choose this therapist?
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-slate-100 hover:text-primary duration-500"
            onClick={handleSetTherapist}
          >
            Yes
          </button>
          <button
            className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 duration-500"
            onClick={ChoseTherapist}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default TherapistProfile;
