const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./db/ConnectionDb");
const blogRouter = require("./routers/blogRouters");
const { ErrorMiddleware } = require("./utils/ErrorHandlers");

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("Uploads directory created.");
}

app.use("/uploads", express.static(uploadDir));

connectDB()
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.log("Database connection failed:", err));

app.use("/api/v1/blogs", blogRouter);

app.use(ErrorMiddleware);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
