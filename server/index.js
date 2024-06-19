import app from "./app.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import TreatmentRoutes from "./routes/Treatment.js";
import PatientRoutes from "./routes/Patient.js";
import PaymentRoutes from "./routes/Payment.js";
import TherapistRoutes from "./routes/Therapist.js"
import messageRoutes from "./routes/Message.js"
import documentRoutes from "./routes/Document.js"
import therapistToPatientAssignedTaskRoutes from "./routes/TherapistToPatientAssignedTask.js"
import treatmentCategoryRoutes from "./routes/TreatmentCategory.js"

import http from "http";
import DoneTaskRoutes from "./routes/DoneTask.js";
import { Server } from "socket.io";
import User from "./models/User.js";
import OneToOneMessage from "./models/OneToOneMessage.js";
import express from "express"

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

app.use('/api/treatment-categories', treatmentCategoryRoutes);

app.use("/api/treatment", TreatmentRoutes);

app.use("/api/tasks/", DoneTaskRoutes);

app.use("/api/patient", PatientRoutes);

app.use("/api/payment/", PaymentRoutes);

app.use("/api/therapist/", TherapistRoutes)

app.use('/api/messages', messageRoutes);

app.use('/api/documents', documentRoutes);

app.use("/api/therapistassignedtasks", therapistToPatientAssignedTaskRoutes);

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

// io.on("connection", async (socket) => {
//   console.log(JSON.stringify(socket.handshake.query));
//   const user_id = socket.handshake.query["user_id"];

//   console.log(`User connected ${socket.id}`);

//   if (user_id != null && Boolean(user_id)) {
//     try {
//       User.findByIdAndUpdate(user_id, {
//         socket_id: socket.id,
//         status: "Online",
//       });
      
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   socket.on("text_message", async (data) => {
//     console.log("Received message:", data);

//     // data: {to, from, text}

//     const { message, conversation_id, from, to, type } = data;

//     const to_user = await User.findById(to);
//     const from_user = await User.findById(from);

//     // message => {to, from, type, created_at, text, file}

//     const new_message = {
//       to: to,
//       from: from,
//       type: type,
//       created_at: Date.now(),
//       text: message,
//     };

//     // fetch OneToOneMessage Doc & push a new message to existing conversation
//     const chat = await OneToOneMessage.findById(conversation_id);
//     chat.messages.push(new_message);
//     // save to db`
//     await chat.save({ new: true, validateModifiedOnly: true });

//     // emit incoming_message -> to user

//     io.to(to_user?.socket_id).emit("new_message", {
//       conversation_id,
//       message: new_message,
//     });

//     // emit outgoing_message -> from user
//     io.to(from_user?.socket_id).emit("new_message", {
//       conversation_id,
//       message: new_message,
//     });
//   });

//   // handle Media/Document Message
//   socket.on("file_message", (data) => {
//     console.log("Received message:", data);

//     // data: {to, from, text, file}

//     // Get the file extension
//     const fileExtension = path.extname(data.file.name);

//     // Generate a unique filename
//     const filename = `${Date.now()}_${Math.floor(
//       Math.random() * 10000
//     )}${fileExtension}`;

//     // upload file to AWS s3

//     // create a new conversation if its dosent exists yet or add a new message to existing conversation

//     // save to db

//     // emit incoming_message -> to user

//     // emit outgoing_message -> from user
//   });

//   socket.on("get_direct_conversations", async ({ user_id }, callback) => {
//     try {
//       // Log user_id
//       console.log("User ID:", user_id);
  
//       // Find the conversations
//       const rawConversations = await OneToOneMessage.find({
//         participants: { $all: [user_id] },
//       });
  
//       // Log the raw result
//       console.log("Raw Conversations:", rawConversations);
  
//       // Ensure the raw conversations have multiple participants
//       rawConversations.forEach(conversation => {
//         console.log(`Conversation ${conversation._id} participants:`, conversation.participants);
//       });
  
//       // Populate participants
//       const existing_conversations = await OneToOneMessage.populate(rawConversations, {
//         path: 'participants',
//         select: 'firstName lastName avatar _id email status'
//       });
  
//       // Log the populated result
//       console.log("Populated Conversations:", existing_conversations);
  
//       // Return the result through the callback
//       callback(rawConversations);
//     } catch (error) {
//       console.error("Error getting direct conversations:", error);
//       callback({ error: "Internal Server Error" });
//     }
//   });

//   socket.on("start_conversation", async (data) => {
//     // data: {to: from:}

//     const { to, from } = data;

//     // check if there is any existing conversation

//     const existing_conversations = await OneToOneMessage.find({
//       participants: { $size: 2, $all: [to, from] },
//     }).populate("participants", "firstName lastName _id email status");

//     console.log(existing_conversations[0], "Existing Conversation");

//     // if no => create a new OneToOneMessage doc & emit event "start_chat" & send conversation details as payload
//     if (existing_conversations.length === 0) {
//       let new_chat = await OneToOneMessage.create({
//         participants: [to, from],
//       });

//       new_chat = await OneToOneMessage.findById(new_chat).populate(
//         "participants",
//         "firstName lastName _id email status"
//       );

//       console.log(new_chat);

//       socket.emit("start_chat", new_chat);
//     }
//     // if yes => just emit event "start_chat" & send conversation details as payload
//     else {
//       socket.emit("start_chat", existing_conversations[0]);
//     }
//   });




//   socket.on("end", async (data) => {
//     // Find user by ID and set status as offline

//     if (data.user_id) {
//       await User.findByIdAndUpdate(data.user_id, { status: "Offline" });
//     }

//     // broadcast to all conversation rooms of this user that this user is offline (disconnected)

//     console.log("closing connection");
//     socket.disconnect(0);
//   });
// });

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join', async ({ userId }) => {
    await User.findByIdAndUpdate(userId, { socketId: socket.id, status: 'Online' });
  });

  socket.on('sendMessage', async (messageData) => {
    const message = new Message(messageData);
    await message.save();
    const { to } = messageData;
    const recipient = await User.findById(to);
    io.to(recipient.socketId).emit('newMessage', message);
  });

  socket.on('disconnect', async () => {
    console.log('user disconnected');
    // Update user status to offline
  });
});


process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION! Shutting down ...");
  server.close(() => {
    process.exit(1); //  Exit Code 1 indicates that a container shut down, either because of an application failure.
  });
});
