const express = require("express");
const PORT = 5000;

const app = express();

/**
 * -----------CONFIGURE EXPRESS MIDDLEWARES-------------
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/**
 * -----------ROUTES-------------
 */
app.use("/ims/subscriber", require("./backend/routes/subscribers"));

/**
 * -----------SERVER-------------
 */
app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Listening on PORT: ${PORT}. Access app: http://localhost:${PORT}`
  );
});
