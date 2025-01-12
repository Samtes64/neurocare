import Treatment from "../models/Treatment.js";
import mongoose from "mongoose";

export const getAllTreatments = async (req, res, next) => {
  try {
    const treatments = await Treatment.find();
    res.status(200).json(treatments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addTreatment = async (req, res) => {
  try {
    const { name, description, duration, treatmentCategory } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!treatmentCategory) {
      return res.status(400).json({ message: "Treatment category is required" });
    }

    // Create the new treatment
    const newTreatment = new Treatment({
      treatmentName: name,
      treatmentDescription: description,
      treatmentCategory,
      // Optionally include duration if needed as part of the schema or additional logic
    });

    // Save the treatment to the database
    const savedTreatment = await newTreatment.save();
    res.status(201).json(savedTreatment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getTreatmentsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    console.log(categoryId);

    

    const treatments = await Treatment.find({ treatmentCategory: categoryId });

    res.status(200).json(treatments);
  } catch (error) {
    console.error("Error fetching treatments by category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
