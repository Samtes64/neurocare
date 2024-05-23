import DoneTasks from "../models/DoneTasks";
import createError from "http-errors";

export const addDoneTask = async (req, res, next) => {
  //   try {
  //     const { patient, treatment, mood, duration, note } = req.body;

  //     // Validate required fields
  //     if (!patient || !treatment) {
  //       return next(createError(400, 'Patient and treatment fields are required.'));
  //     }

  //     // Create new done task
  //     const newDoneTask = new DoneTasks({
  //       patient,
  //       treatment,
  //       mood,
  //       duration,
  //       note,
  //     });

  //     // Save the done task to the database
  //     const savedDoneTask = await newDoneTask.save();

  //     // Respond with the saved done task
  //     return res.status(201).json(savedDoneTask);
  //   } catch (error) {
  //     return next(error);
  //   }

  const userId = req.user?.id;
  const { taskString } = req.body;
  if (!taskString) {
    return next(createError(400, "Task string is missing"));
  }
  // Split taskString into lines
  const eachtask = workoutString.split(";").map((line) => line.trim());
  // Check if any task start with "#" to indicate categories
  const categories = eachtask.filter((line) => line.startsWith("#"));
  if (categories.length === 0) {
    return next(createError(400, "No categories found in treatment string"));
  }

  const parsedWorkouts = [];
    let currentCategory = "";
    let count = 0;

    // Loop through each line to parse workout details
    await eachworkout.forEach((line) => {
      count++;
      if (line.startsWith("#")) {
        const parts = line?.split("\n").map((part) => part.trim());
        console.log(parts);
        if (parts.length < 5) {
          return next(
            createError(400, `Workout string is missing for ${count}th workout`)
          );
        }

        // Update current category
        currentCategory = parts[0].substring(1).trim();
        // Extract workout details
        const workoutDetails = parseWorkoutLine(parts);
        if (workoutDetails == null) {
          return next(createError(400, "Please enter in proper format "));
        }

        if (workoutDetails) {
          // Add category to workout details
          workoutDetails.category = currentCategory;
          parsedWorkouts.push(workoutDetails);
        }
      } else {
        return next(
          createError(400, `Workout string is missing for ${count}th workout`)
        );
      }
    });
};
