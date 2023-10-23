const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser"); // Import body-parser
const fileUpload = require('express-fileupload');
require("dotenv").config();
app.use(fileUpload({
  useTempFiles : true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
require("./config/database").connect();
const authRouter = require("./routes/authRouter");
const eventRouter = require("./routes/eventRouter");
const jobRouter = require("./routes/jobRouter");
app.use("/api/auth", authRouter);
app.use("/api/event", eventRouter);
app.use("/api/job", jobRouter);
app.get('/', (req, res) => {
  res.send('College Companion backend');
});
const Port = process.env.PORT
app.listen(Port, () => {
  console.log(`The server is listening on port ${Port}`);
});
