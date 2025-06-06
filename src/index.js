import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import mongoose from "mongoose";
import studentRoute from './routes/studentRoute.js';

import { ENV } from "./utils/envLoader.js";

import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";

import { logger } from "./utils/logger.js";

const app = express();

mongoose
    .connect(ENV.MONGO_URI)
    .then(() => logger.info(`Connected to MongoDB at ${ENV.MONGO_URI}`))
    .catch((err) => logger.error("MongoDB connection error:", err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(
    session({
        secret: "foodmate-secret",
        resave: false,
        saveUninitialized: true,
    })
);

app.use("/auth", authRoutes);
app.use("/", homeRoutes);
app.use('/api', studentRoute);

app.listen(ENV.PORT, () => {
    logger.info(`Server running at http://localhost:${ENV.PORT}`);
});
