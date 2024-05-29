import express from "express";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit"; // Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
import helmet from "helmet";
import mongosanitize from "express-mongo-sanitize";
import bodyParser from "body-parser";
import xss from "xss"

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data
app.use(bodyParser.json()); // Returns middleware that only parses json
app.use(bodyParser.urlencoded({ extended: true })); // Returns middleware that only parses urlencoded bodies

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000, // In one hour
  message: "Too many Requests from this IP, please try again in an hour!",
});

app.use("/tawk", limiter);

app.use(
  express.urlencoded({
    extended: true,
  })
); // Returns middleware that only parses urlencoded bodies

app.use(mongosanitize());

// app.use(xss());

export default app;
