 import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// All routes under /api/user
app.use("/api/user", userRoute);
app.use("/api/user", blogRoutes);

export { app };
