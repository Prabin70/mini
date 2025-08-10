const express = require("express");
const cors = require("cors");
const path = require("path");
const { port } = require("./src/config/env");
const connectMongo = require("./src/db/connectMongo");
const userRouter = require("./src/routes/user.routes");
const courseRouter = require("./src/routes/course.routes");
const adminRouter = require("./src/routes/admin.routes");
const fileRouter = require("./src/routes/file.routes");

const app = express();

connectMongo();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/admin", adminRouter);
app.use("/api/file", fileRouter);

app.get("/", (req, res) => {
  res.send("Server is working properly");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static(path.join(__dirname, "public")));