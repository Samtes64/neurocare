import  Treatment  from "../models/Treatment.js";

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
