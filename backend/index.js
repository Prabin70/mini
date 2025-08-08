const express = require("express");
const cors = require("cors");
const path = require("path");
const { port } = require("./src/config/env");
const connectMongo = require("./src/db/mongo");
const { connectPostgresDB, sequelize } = require("./src/db/postgres");
const router = require("./src/routes/user.routes");
const courseRouter = require("./src/routes/course.routes");
const instructorRouter = require("./src/routes/instructor.routes");
const fileRouter = require("./src/routes/file.routes");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectMongo();

app.use("/api/users", router);
app.use("/api/courses", courseRouter);
app.use("/api/instructors", instructorRouter);
app.use("/api/files", fileRouter);

app.use(express.static(path.join(__dirname, "public")));
