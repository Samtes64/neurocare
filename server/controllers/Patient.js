import DoneTasks from "../models/DoneTasks.js";
import Patient from "../models/Patient.js";
import PremiumPatient from "../models/PremiumPatient.js";
import dotenv from "dotenv";

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT);

dotenv.config();

export const getPatientDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const patient = await Patient.findOne({ user: userId });

    if (!patient) {
      return next(
        createError(404, "No patient found with the provided userId.")
      );
    }

    const currentDateFormatted = new Date();
    const startToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate()
    );
    const endToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate() + 1
    );

    //calculte total spent time
    const totalSpentTime = await DoneTasks.aggregate([
      {
        $match: {
          patient: patient._id,
          createdAt: { $gte: startToday, $lt: endToday },
        },
      },
      {
        $group: {
          _id: null,
          totalSpentTime: { $sum: "$duration" },
        },
      },
    ]);

    //Calculate total no of done tasks
    const totalDoneTasks = await DoneTasks.countDocuments({
      patient: patient,
      createdAt: { $gte: startToday, $lt: endToday },
    });

    //Calculate average duration per task
    const avgDurationPerTask =
      totalSpentTime.length > 0
        ? totalSpentTime[0].totalSpentTime / totalDoneTasks
        : 0;

    // Fetch category of tasks
    const categoryTasks = await DoneTasks.aggregate([
      {
        $match: {
          patient: patient._id,
          createdAt: { $gte: startToday, $lt: endToday },
        },
      },
      // Lookup to join treatments data
      {
        $lookup: {
          from: "treatments",
          localField: "treatment",
          foreignField: "_id",
          as: "treatmentDetails",
        },
      },
      {
        $unwind: "$treatmentDetails",
      },

      {
        $lookup: {
          from: "treatmentcategories",
          localField: "treatmentDetails.treatmentCategory",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },

      {
        $group: {
          _id: "$categoryDetails.categoryName",
          totalSpentTime: { $sum: "$duration" },
        },
      },
    ]);

    //Format category data for pie chart

    const pieChartData = categoryTasks.map((category, index) => ({
      id: index,
      value: category.totalSpentTime,
      label: category._id,
    }));

    const weeks = [];
    const spentTime = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(
        currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
      );
      weeks.push(`${date.getDate()}th`);

      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const endOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );

      const weekData = await DoneTasks.aggregate([
        {
          $match: {
            patient: patient._id,
            createdAt: { $gte: startOfDay, $lt: endOfDay },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalSpentTime: { $sum: "$duration" },
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date in ascending order
        },
      ]);

      spentTime.push(
        weekData[0]?.totalSpentTime ? weekData[0]?.totalSpentTime : 0
      );
    }

    return res.status(200).json({
      totalSpentTime:
        totalSpentTime.length > 0 ? totalSpentTime[0].totalSpentTime : 0,
      totalDoneTasks: totalDoneTasks,
      avgDurationPerTask: avgDurationPerTask,
      totalWeeksTaskDuration: {
        weeks: weeks,
        spentTime: spentTime,
      },
      pieChartData: pieChartData,
    });
  } catch (err) {
    next(err);
  }
};

export const getDoneTasksByDate = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const patient = await Patient.findOne({ user: userId });

    if (!patient) {
      return next(
        createError(404, "No patient found with the provided userId.")
      );
    }

    let date = req.query.date ? new Date(req.query.date) : new Date();

    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const todaysDoneTasks = await DoneTasks.aggregate([
      {
        $match: {
          patient: patient._id,
          createdAt: { $gte: startOfDay, $lt: endOfDay },
        },
      },
      {
        $lookup: {
          from: "treatments",
          localField: "treatment",
          foreignField: "_id",
          as: "treatmentDetails",
        },
      },
      {
        $unwind: "$treatmentDetails",
      },
      {
        $lookup: {
          from: "treatmentcategories",
          localField: "treatmentDetails.treatmentCategory",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $project: {
          // Include the fields you want to show
          _id: 1, // assuming you want the id of the done task
          treatment: "$treatmentDetails.treatmentName", // assuming treatmentDetails has a 'name' field
          category: "$categoryDetails.categoryName", // assuming categoryDetails has a 'name' field
          duration: 1,
          note: 1,
          createdAt: 1,
        },
      },
    ]);

    const totalSpentTime = todaysDoneTasks.reduce(
      (total, doneTasks) => total + doneTasks.duration,
      0
    );

    return res.status(200).json({ todaysDoneTasks, totalSpentTime });
  } catch (err) {
    next(err);
  }
};

// export const checkIfSubscriptionIsAvailable = async(req,res,next)

