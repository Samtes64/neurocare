import mongoose from "mongoose";
import Therapist from "../models/Therapist.js";
import TherapistPatient from "../models/TherapistPatient.js";

export const getAllTherapists = async (req, res, next) => {
  try {
    console.log("Fetching all verified therapists...");
    const all_verified_therapists = await Therapist.find({
      approvalStatus: "Approved",
    });

    console.log(`Found ${all_verified_therapists.length} therapists.`);
    res.status(200).json(all_verified_therapists);
  } catch (error) {
    console.error("Error fetching therapists: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching therapists." });
  }
};

export const getTherapistById = async (req, res, next) => {
  try {
    const therapistId = req.query.id;
    console.log("Received therapist ID:", therapistId);

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(therapistId)) {
      console.error("Invalid therapist ID format:", therapistId);
      // Return a 404 error if the ID format is invalid
      return res.status(404).json({ error: "No therapist found with the provided ID." });
    }

    // Fetch the therapist from the database
    const therapist = await Therapist.findById(therapistId);
    
    // Check if a therapist was found
    if (!therapist) {
      console.error("No therapist found with the provided ID:", therapistId);
      return res.status(404).json({ error: "No therapist found with the provided ID." });
    }

    // Respond with the therapist data
    return res.status(200).json(therapist);
  } catch (error) {
    // Log any errors for debugging
    console.error("Error fetching therapist data:", error);

    // Return a 500 Internal Server Error response
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const setTherapistForPatient=async(req,res,next)=>{

  try{
    const userId = req.user?.id;

    const therapistId = req.query.id;

    const newTherapistPatient = new TherapistPatient({
      patient: userId,
      therapist:therapistId,
      date:Date.now(),
      isValid:true
    })

    const saveTherapistPatient = await newTherapistPatient.save()

    return res.status(201).json(saveTherapistPatient);


  }catch(err){
    return next(err);
  }
}
