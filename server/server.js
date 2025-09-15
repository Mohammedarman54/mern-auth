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

// allowed origins
const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());

// ✅ Proper CORS setup
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);   // allow request
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// routes
app.get('/', (req, res) => res.send("Api working fine"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// server start
app.listen(port, () => console.log(`Server started on port : ${port}`));
