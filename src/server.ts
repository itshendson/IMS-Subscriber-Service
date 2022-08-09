import express from "express"
const port = 5000;

const app = express();

/**
 * -----------CONFIGURE EXPRESS MIDDLEWARES-------------
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../public"));

/**
 * -----------ROUTES-------------
 */
app.use("/ims/subscriber", require("./routes/subscribers"));

/**
 * -----------SERVER-------------
 */
app.listen(process.env.port || port, (): void => {
  console.log(
    `Listening on PORT: ${port}. Access app: http://localhost:${port}`
  );
});
