import mongoose from "mongoose";
import Therapist from "../models/Therapist.js";
import TherapistPatient from "../models/TherapistPatient.js";
import OneToOneMessage from "../models/OneToOneMessage.js";
import multer from "multer";
import path from "path";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif|bmp|tiff|webp|svg|jfif|ico/;
    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only image files (jpeg|jpg|png|gif|bmp|tiff|webp|svg|jfif|ico) are allowed."
        )
      );
    }
  },
}).single("profileImage");

// Update therapist profile
export const updateTherapistProfile = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const userId = req.user?.id;
      const {
        firstName,
        lastName,
        phoneNumber,
        specialization,
        about,
        gender,
      } = req.body;

      // Find the therapist profile by user ID
      const therapist = await Therapist.findOne({ user: userId });

      if (!therapist) {
        return res.status(404).json({ error: "Therapist  not found." });
      }

      // Initialize the profile image path
      let profileImagePath = therapist.profileImageName;
      let approvalStatus = therapist.approvalStatus;
      let isValid = therapist.isValid;

      if (req.file) {
        profileImagePath = req.file.filename;
      }

      // Create an object to hold the updated fields
      const updatedFields = {
        firstName,
        lastName,
        phoneNumber,
        specialization,
        description: about,
        gender,
        approvalStatus,
        isValid,
      };

      // Only update the profile image path if a new image was uploaded
      if (req.file) {
        updatedFields.profileImageName = profileImagePath;
      }

      // Update the therapist profile information
      const updatedTherapist = await Therapist.findByIdAndUpdate(
        therapist._id,
        updatedFields,
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(200).json({
        message: "Therapist profile updated successfully.",
        data: updatedTherapist,
      });
    } catch (error) {
      console.error("Error updating therapist profile:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

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
      return res
        .status(404)
        .json({ error: "No therapist found with the provided ID." });
    }

    // Fetch the therapist from the database
    const therapist = await Therapist.findById(therapistId);

    // Check if a therapist was found
    if (!therapist) {
      console.error("No therapist found with the provided ID:", therapistId);
      return res
        .status(404)
        .json({ error: "No therapist found with the provided ID." });
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

export const setTherapistForPatient = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const therapistId = req.query.id;

    const newTherapistPatient = new TherapistPatient({
      patient: userId,
      therapist: therapistId,
      date: Date.now(),
      isValid: true,
    });

    const saveTherapistPatient = await newTherapistPatient.save();

    let new_chat = await OneToOneMessage.create({
      participants: [userId, therapistId],
    });

    return res.status(201).json(saveTherapistPatient);
  } catch (err) {
    return next(err);
  }
};
