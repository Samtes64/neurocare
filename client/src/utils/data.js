import {
  FitnessCenterRounded,
  LocalFireDepartmentRounded,
  TimelineRounded,
} from "@mui/icons-material";

export const counts = [
  {
    name: "Time spent",
    // icon: (
    //   <LocalFireDepartmentRounded sx={{ color: "inherit", fontSize: "26px" }} />
    // ),
    desc: "Total time spent today",
    key: "totalSpentTime",
    unit: "min",
    // color: "#eb9e34",
    // lightColor: "#FDF4EA",
  },
  {
    name: "Tasks",
    // icon: <FitnessCenterRounded sx={{ color: "inherit", fontSize: "26px" }} />,
    desc: "Total no of tasks for today",
    key: "totalDoneTasks",
    unit: "",
    // color: "#41C1A6",
    // lightColor: "#E8F6F3",
  },
  {
    name: "Average  Time Spent",
    // icon: <TimelineRounded sx={{ color: "inherit", fontSize: "26px" }} />,
    desc: "Average time spent on each task",
    key: "avgDurationPerTask",
    unit: "min",
    // color: "#FF9AD5",
    // lightColor: "#FEF3F9",
  },
];
