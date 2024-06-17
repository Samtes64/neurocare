import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { GiMoneyStack } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";


const TherapistCard = ({details}) => {
  //   const fullName = "samuel tesafye";
  // const Profession = { Name: "Therapist" };
  const averageRating = 3;
  const {
   _id,
    profileImage,
    firstName,
    lastName,
    specialization
    
   
  } = details;
  return (
    <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center mx-auto w-full h-full mb-10 hover:shadow-xl duration-500 justify-center">
      <div className="avatar pb-2">
        <div className="w-24 rounded-full">
          {/* <img
          src={`https://api.askamarlabor.com/serverapi/images/${profileImageName}`}
          alt="avatar1"
        /> */}
          <Avatar
            src={profileImage}
            sx={{ width: 100, height: 100 }}
            className="mx-auto"
          >
            {firstName[0]}
          </Avatar>
        </div>
      </div>
      <p href="#" className="text-black pb-2">
        {firstName +" "+ lastName}
      </p>
      <p href="#" className="text-primary text-sm pb-2">
        {specialization}
      </p>

      <div className="flex relative justify-between gap-5 text-black mb-3">
        {/* <div className="flex items-center font-light">
        <CiLocationOn size={16} className="mr-1 pb-[2px]" />
        <p className="text-sm">{LocalArea && LocalArea.name}</p>
      </div> */}
      </div>
      <div className="rating mb-4">
        <input
          type="radio"
          // name={id}
          className="mask mask-star-2 bg-orange-400"
          value={1}
          checked={averageRating === 1}
          disabled
        />
        <input
          type="radio"
          // name={id}
          className="mask mask-star-2 bg-orange-400"
          value={2}
          checked={averageRating === 2}
          disabled
        />
        <input
          type="radio"
          // name={id}
          className="mask mask-star-2 bg-orange-400"
          value={3}
          checked={averageRating === 3}
          disabled
        />
        <input
          type="radio"
          // name={id}
          className="mask mask-star-2 bg-orange-400"
          value={4}
          checked={averageRating === 4}
          disabled
        />
        <input
          type="radio"
          // name={id}
          className="mask mask-star-2 bg-orange-400"
          value={5}
          checked={averageRating === 5}
          disabled
        />
      </div>
      <Link
        to={{
          pathname: `/therapist/${_id}`,
          state: { therapist: details }, // Pass the worker's data in the state object
        }}
      >
        <button className="bg-primary text-white py-3 px-6 rounded-md hover:bg-slate-100 hover:text-[16px] hover:text-primary duration-500">
          Check profile
        </button>
      </Link>
    </div>
  )
}

export default TherapistCard