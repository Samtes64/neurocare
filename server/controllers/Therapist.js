import Therapist from "../models/Therapist.js";

export const getAllTherapists = async (req, res, next) => {
    try {
      console.log("Fetching all verified therapists...");
      const all_verified_therapists = await Therapist.find({approvalStatus:"Approved"});
      
      console.log(`Found ${all_verified_therapists.length} therapists.`);
      res.status(200).json(all_verified_therapists);
    } catch (error) {
      console.error("Error fetching therapists: ", error);
      res.status(500).json({ error: "An error occurred while fetching therapists." });
    }
  };