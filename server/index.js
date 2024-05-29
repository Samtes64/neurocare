import app from "./app.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import TreatmentRoutes from "./routes/Treatment.js"

import http from "http";




dotenv.config();


const server = http.createServer(app)



app.use("/api/user/", UserRoutes);

app.use("/api/treatment",TreatmentRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello there",
  });
});

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    server.listen(3003, () => console.log("Server started on port 3003"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
