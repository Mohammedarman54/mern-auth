import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// connect DB
connectDB();

// ✅ Allowed origins (local + Vercel frontend)
const allowedOrigins = [
  "http://localhost:5173", 
  "https://mern-auth-ek5u35mep-mohammed-arman-alis-projects.vercel.app"
];

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Proper CORS setup
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin); // allow the request origin
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => res.send("API working fine"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Start server
app.listen(port, () => console.log(Server started on port : ${port}));
