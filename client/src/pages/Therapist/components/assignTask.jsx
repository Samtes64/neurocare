import React, { useEffect, useState } from 'react';
import { DatePickerWithRange } from "../components/ui/datepicker";
import { getAllTreatmentCategories, getTreatmentsByCategory } from '../../../api';

const AssignTask = ({ patients }) => {
  const [treatmentCategory, setTreatmentCategory] = useState('');
  const [treatment, setTreatment] = useState('');
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      treatmentCategory,
      treatment,
      dateRange,
      patients, // Include selected patients in the console log output
    });
    // Reset form fields
    setTreatmentCategory('');
    setTreatment('');
    setDateRange({ from: null, to: null });
  };

  const [categorieoptions, setCategorieOptions] = useState([]);
  const [treatments, setTreatments] = useState([]);

  const token = "your_auth_token_here"; // Replace with your authentication token logic
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllTreatmentCategories(token);
        setCategorieOptions(response.data); // Assuming the response.data contains the array of treatment categories
      } catch (error) {
        console.error("Error fetching treatment categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {

    const fetchTreatments = async () => {
      try {
        const response = await getTreatmentsByCategory(token, treatmentCategory);
        setTreatments(response.data);
      } catch (error) {
        console.error("Error fetching treatments by category:", error);
      }
    };

    fetchTreatments();
  }, [treatmentCategory]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Assign Task</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="treatmentCategory" className="block font-semibold mb-1 text-gray-700">Treatment Category:</label>
            <select
              id="treatmentCategory"
              value={treatmentCategory}
              onChange={(e) => setTreatmentCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              {categorieoptions.map((category) => (
                      <option key={category._id} value={category._id}>
                        {" "}
                        {/* Updated this line */}
                        {category.categoryName}
                      </option>
                    ))}
            </select>
          </div>
          <div>
            <label htmlFor="treatment" className="block font-semibold mb-1 text-gray-700">Treatment:</label>
            <select
              id="treatment"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a treatment</option>
              {treatments.map((treatment) => (
                      <option key={treatment._id} value={treatment._id}>
                        {" "}
                        {/* Updated this line */}
                        {treatment.treatmentName}
                      </option>
                    ))}
              {/* Add other options as needed */}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Date Range:</label>
            <DatePickerWithRange
              dateRange={dateRange}
              setDateRange={setDateRange}
              className="w-full"
            />
          </div>
          <div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition duration-300">Done</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTask;
