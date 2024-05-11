import React from "react";
import doctorhero from "../utils/Images/doctorhero.png";
import LogoImage from "../utils/Images/Logo.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-blue-300 h-screen">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
          <a
            href="#"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <img
              src={LogoImage}
              alt=""
              className="w-12 h-12 text-white p-2 rounded-full"
            />
            <span className="ml-3 text-2xl font-bold">NeuroCare</span>
          </a>
          <div className="flex items-center">
            <button className="inline-flex items-center justify-center text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded-md text-lg ">
              <span className="text-sm">Partner With Us</span>
            </button>
            <Link to="/login">
              <button className="ml-4 inline-flex items-center justify-center text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg hover:shadow-md bg-blue-500 shadow-lg">
                <span className="text-sm">Login</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      <section className="text-gray-600 body-font ">
        <div className="container mx-auto flex px-5 lg:px-20 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left  md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Where Healing Begins
            </h1>
            <p className="mb-8 leading-relaxed">
              Connect with qualified therapists and find support for neurosis
              conditions. Your mental well-being matters. Start your journey to
              healing today.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex items-center justify-center text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-md text-lg shadow-lg">
                <span className="text-sm ">Get Started</span>
                <svg
                  className="w-5 h-5 ml-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button className="ml-4 inline-flex items-center justify-center text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded-md text-lg shadow-lg">
                <span className="text-sm ">Take Assessment</span>
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 ">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={doctorhero}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
