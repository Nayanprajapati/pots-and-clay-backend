const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const https = require("https");
const fs = require("fs");

const router = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const esewaRouter = require("./routes/esewa");
const fileUpload = require("express-fileupload");
const logger = require("./utils/logger");

dotenv.config();

const app = express();

// Detailed CORS Config
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Apply specific CORS options globally

app.use(express.json());

// File Upload Config
app.use(fileUpload());
app.use(express.static("public"));

app.get("/httpsTest", (req, res) => {
  res.send("HEllo");
});

const PORT = process.env.PORT;

app.get("/test", (req, res) => {
  res.send("Test Api is Working ...!");
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/esewa", require("./routes/esewa"));

const options = {
  key: fs.readFileSync("./client-key.pem"),
  cert: fs.readFileSync("./client-cert.pem"),
};

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
