import app from "./app.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import TreatmentRoutes from "./routes/Treatment.js";
import PatientRoutes from "./routes/Patient.js";
import PaymentRoutes from "./routes/Payment.js";

import http from "http";
import DoneTaskRoutes from "./routes/DoneTask.js";
import { Server } from "socket.io";
import User from "./models/User.js";

dotenv.config();

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("UNCAUGHT Exception! Shutting down ...");
  process.exit(1); // Exit Code 1 indicates that a container shut down, either because of an application failure.
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/api/user/", UserRoutes);

app.use("/api/treatment", TreatmentRoutes);

app.use("/api/tasks/", DoneTaskRoutes);

app.use("/api/patient", PatientRoutes);

app.use("/api/payment/", PaymentRoutes);

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

// trying chapas payment integration

app.set("view engine", "ejs");

// app.get("/api/pay", async (req, res) => {
//   // chapa redirect you to this url when payment is successful
//   const CALLBACK_URL = "http://localhost:3003/api/verify-payment/";
//   const RETURN_URL = "http://localhost:3000/";

//   // a unique reference given to every transaction
//   const TEXT_REF = "tx-myecommerce12345-" + Date.now();

//   // form data
//   const data = {
//     amount: "100",
//     currency: "ETB",
//     email: "ato@Chala.com",
//     first_name: "Ato",
//     last_name: "Chala",
//     tx_ref: TEXT_REF,
//     callback_url: CALLBACK_URL + TEXT_REF,
//     return_url: RETURN_URL,
//   };

//   // post request to chapa
//   await axios
//     .post(CHAPA_URL, data, config)
//     .then((response) => {
//       res.redirect(response.data.data.checkout_url);
//     })
//     .catch((err) => console.log(err));
// });

// verification endpoint
// app.get("/api/verify-payment/:id", async (req, res) => {
//   //verify the transaction

//   await axios
//     .get("https://api.chapa.co/v1/transaction/verify/" + req.params.id, config)
//     .then((response) => {
//       console.log("Payment was successfully verified");
//     })
//     .catch((err) => console.log("Payment can't be verfied", err));
// });

// app.get("/api/payment-success", async (req, res) => {
//   res.render("success");
// });

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

io.on("connection", async (socket) => {
  console.log(JSON.stringify(socket.handshake.query));
  const user_id = socket.handshake.query["user_id"];

  console.log(`User connected ${socket.id}`);

  if (user_id != null && Boolean(user_id)) {
    try {
      User.findByIdAndUpdate(user_id, {
        socket_id: socket.id,
        status: "Online",
      });
    } catch (e) {
      console.log(e);
    }
  }

  socket.on("end", async (data) => {
    // Find user by ID and set status as offline

    if (data.user_id) {
      await User.findByIdAndUpdate(data.user_id, { status: "Offline" });
    }

    // broadcast to all conversation rooms of this user that this user is offline (disconnected)

    console.log("closing connection");
    socket.disconnect(0);
  });
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION! Shutting down ...");
  server.close(() => {
    process.exit(1); //  Exit Code 1 indicates that a container shut down, either because of an application failure.
  });
});
