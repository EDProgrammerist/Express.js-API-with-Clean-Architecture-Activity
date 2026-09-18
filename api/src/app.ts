import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";

import { env } from "./config/env.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(hpp());

app.get("/", (_request, response) => {
  response.json({
    status: "success",
    message: `${env.APP_NAME} is running`,
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (_request, response) => {
  response.json({
    status: "success",
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

// Keep this after all valid routes.
app.use((_request, response) => {
  response.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

export default app;