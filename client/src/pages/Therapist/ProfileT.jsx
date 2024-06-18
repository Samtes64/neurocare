import React from "react";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProfileT = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: 0,
    phoneNumber: "",
    experience: 0,
    description: "",
    salary: 0,
    salaryType: "",
    isVerified: false,
    profileImage: null,
    city: "", // Initialize city with an empty string
    localArea: "", // Initialize localArea with an empty string
    profession: "", // Initialize profession with an empty string
  });
  const [profileImageName, setProfileImageName] = useState("");



  

  useEffect(() => {
    // Fetch existing profile data and update the form
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `https://api.askamarlabor.com/serverapi/profile/byid`,
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );
        const profileData = response.data; // Replace with your API response structure

        setFormData({
          fullName: profileData.fullName,
          gender: profileData.gender,
          age: profileData.age,
          phoneNumber: profileData.phoneNumber,
          experience: profileData.experience,
          description: profileData.description,
          salary: profileData.salary,
          salaryType: profileData.salaryType,
          isVerified: profileData.isVerified,
          city: profileData.cityid,
          localArea: profileData.localareaid,
          profession: profileData.professionid,
          profileImage: null, // Set this based on your data or leave it as null
        });

        // Set the profile image name for display
        setProfileImageName(profileData.profileImageName); // Replace with your actual profile image property

       
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);
  const [selectedCity, setSelectedCity] = useState(formData.city);
  const [selectedLocalArea, setSelectedLocalArea] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");

 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const formDataForUpdate = new FormData();
    formDataForUpdate.append("fullName", formData.fullName);
    formDataForUpdate.append("gender", formData.gender);
    formDataForUpdate.append("age", formData.age);
    formDataForUpdate.append("phoneNumber", formData.phoneNumber);
    formDataForUpdate.append("experience", formData.experience);
    formDataForUpdate.append("description", formData.description);
    formDataForUpdate.append("salary", formData.salary);
    formDataForUpdate.append("salaryType", formData.salaryType);
    formDataForUpdate.append("CityId", formData.city);
    formDataForUpdate.append("localareaid", formData.localArea);
    formDataForUpdate.append("ProfessionId", formData.profession);

    formDataForUpdate.append("profileImage", formData.profileImage);

    try {
      const response = await axios.put(
        `https://api.askamarlabor.com/serverapi/profile/`,
        formDataForUpdate,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      if (response.status === 200) {
        // Handle success, e.g., display a success message to the user
        navigate(`/`); // Redirect to the updated profile page
      } else {
        console.error(
          "Error updating profile. Server responded with status:",
          response.status
        );
        // Handle the specific server response status code as needed
      }
    } catch (error) {
      console.error("Error updating profile:", error);

      if (error.response) {
        // The request was made, but the server responded with a non-2xx status code
        console.error("Server responded with status:", error.response.status);
        console.error("Server response data:", error.response.data);

        // Handle specific error cases based on the status code
        if (error.response.status === 404) {
          // Handle 404 Not Found error
        } else if (error.response.status === 500) {
          // Handle 500 Internal Server Error
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error(
          "No response received from the server. Check server availability."
        );
      } else {
        // Something else happened while setting up the request
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  return (
    <main className={`pt-4 transition-all duration-[400ms]`}>
      <div className="px-4 md:px-16">
        {" "}
        <>
          {/* <p className="text-gray-700 text-3xl mb-16 font-bold mt-10 text-center">
            Profile
          </p> */}
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-10 mb-10 bg-white p-9 rounded-lg">
              <div className="grid col-span-full">
                <p className="text-black font-semibold mb-4">Profile picture</p>

                <input
                  type="file"
                  className="file-input file-input-bordered file-input-info w-full max-w-xs bg-white block text-sm text-gray-500"
                  name="profileImage"
                  onChange={handleChange}
                  accept=".jpeg, .jpg, .png, .gif, .bmp, .tiff, .webp, .svg, .jfif, .ico"
                />
              </div>
              <div className="grid">
                <p className="text-black font-semibold mb-4">First Name</p>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input input-bordered input-info w-full  bg-blue-100 text-black"
                  required
                />
              </div>
              <div className="grid">
                <p className="text-black font-semibold mb-4">Last Name</p>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input input-bordered input-info w-full  bg-blue-100 text-black"
                  required
                />
              </div>
              <div className="grid">
                <p className="text-black font-semibold mb-4">Gender</p>

                <select
                  name="gender"
                  className="select select-info bg-blue-100 text-black w-full"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="grid">
                <p className="text-black font-semibold mb-4">Phone number</p>

                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="input input-bordered input-info w-full  bg-blue-100 text-black"
                  required
                />
              </div>

              <div className="grid">
                <p className="text-black font-semibold mb-4">Specialization</p>

                <input
                  type="text"
                  className="select select-info bg-blue-100 text-black w-full"
                  value={formData.profession}
                  name="profession"
                  onChange={(e) => {
                    setSelectedProfession(e.target.value);
                    handleChange(e);
                  }}
                  required
                />
              </div>

              <div className="grid col-span-full">
                <p className="text-black font-semibold mb-4">Description</p>

                <textarea
                  className="textarea textarea-info h-60 bg-blue-100 text-black"
                  placeholder="Description (about me)"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-outline border-primary hover:text-primary hover:bg-white bg-primary text-white mb-10"
            >
              Save profile
            </button>
          </form>
        </>
      </div>
    </main>
  );
};

export default ProfileT;
