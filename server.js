require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const app = express();

/**
 * -----------CONFIGURE EXPRESS MIDDLEWARES-------------
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

/**
 * -----------ROUTES-------------
 */
app.use("/", require("./backend/routes/home"));
app.use("/ims/subscriber", require("./backend/routes/subscribers"));

/**
 * -----------SERVER-------------
 */
app.listen(PORT, () => {
  console.log(
    `Listening on PORT: ${PORT}. Access app: http://localhost:${PORT}`
  );
});
