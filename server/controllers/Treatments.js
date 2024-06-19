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
    const { name, description, duration } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newTreatment = new Treatment({
      name,
      description,
      duration,
    });

    const savedTreatment = await newTreatment.save();
    res.status(201).json(savedTreatment);
  } catch (error) {
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
