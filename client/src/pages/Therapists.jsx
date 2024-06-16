import React, { useState, useEffect, useContext } from "react";
import TherapistCard from "../components/cards/TherapistCard";
import { BsChevronBarRight, BsChevronBarLeft } from "react-icons/bs";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import ReactPaginate from "react-paginate";

const Therapists = () => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedTherapists, setDisplayedTherapists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchName, setsearchName] = useState("");
  const [searchSpecialization, setsearchSpecialization] = useState("");

  const [listOfTherapists, setListOfTherapists] = useState([
    {
      firstName: "John",
      lastName: "Doe",
      profileImage: "https://via.placeholder.com/150",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      profileImage: "https://via.placeholder.com/150",
      specialization: "Occupational Therapy",
    },
    {
      firstName: "Emily",
      lastName: "Johnson",
      profileImage: "https://via.placeholder.com/150",
      specialization: "Speech Therapy",
    },
    {
      firstName: "Michael",
      lastName: "Brown",
      profileImage: "https://via.placeholder.com/150",
      specialization: "Mental Health Therapy",
    },
    {
      firstName: "Sarah",
      lastName: "Davis",
      profileImage: "https://via.placeholder.com/150",
      specialization: "Pediatric Therapy",
    },
    {
      firstName: "James",
      lastName: "Wilson",
      profileImage: "https://via.placeholder.com/150",
      specialization: "Geriatric Therapy",
    },
  ]);

  useEffect(() => {
    // Calculate the start and end index for the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get the therapists data for the current page
    const therapistsSlice = listOfTherapists.slice(startIndex, endIndex);
    setDisplayedTherapists(listOfTherapists);
  }, [currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTherapist = listOfTherapists.filter((therapist) => {
    const nameMatches =
      !searchName ||
      therapist.firstName.toLowerCase().includes(searchName.toLowerCase());
    const specializationMatches =
      !searchSpecialization ||
      (therapist.specialization ?? "")
        .toLowerCase()
        .includes(searchSpecialization.toLowerCase());

    return nameMatches && specializationMatches;
  });

  const pageCount = Math.ceil(filteredTherapist.length / itemsPerPage);
  const currentTherapists = filteredTherapist.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const paginationVariants = {};

  const handleNameSearch = (event) => {
    setsearchName(event.target.value);
  };
  const handleSpecializationSearch = (event) => {
    setsearchSpecialization(event.target.value);
  };

  //   return <TherapistCard />;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-8 md:px-0 w-full max-w-lg lg:max-w-xl flex flex-col md:flex-row gap-2 mx-auto my-10">
        <div className="relative mb-4 md:mr-2 flex-1">
          <input
            type="text"
            value={searchName}
            onChange={handleNameSearch}
            className="input input-bordered input-info w-full max-w-xs bg-white"
            placeholder="Name"
          />
        </div>
        <div className="relative mb-4 md:mr-2 flex-1">
          <input
            type="text"
            value={searchSpecialization}
            onChange={handleSpecializationSearch}
            className="input input-bordered input-info w-full max-w-xs bg-white"
            placeholder="Specialization"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        {currentTherapists.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-8 gap-5">
              {currentTherapists.map((therapist) => (
                <Link
                  to={`/therapist/${therapist.id}`}
                  key={therapist.firstName}
                >
                  <TherapistCard details={therapist} />
                </Link>
              ))}
            </div>

            <motion.div
              variants={paginationVariants}
              initial="hidden"
              animate="visible"
              className="text-black"
            >
              <ReactPaginate
                breakLabel={<span className="mr-4">...</span>}
                nextLabel={
                  <span className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-md">
                    <BsChevronBarRight />
                  </span>
                }
                onPageChange={handlePageChange}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel={
                  <span className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-md mr-4">
                    <BsChevronBarLeft />
                  </span>
                }
                containerClassName="flex items-center justify-center mt-8 mb-4"
                pageClassName="block border border-solid border-slate-400 hover:bg-white hover:text-primary w-10 h-10 flex items-center justify-center rounded-md mr-4"
                activeClassName="bg-primary text-white"
              />
            </motion.div>
          </div>
        ) : (
          <p className="text-center text-2xl text-red-900">
            No Therapists found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Therapists;
