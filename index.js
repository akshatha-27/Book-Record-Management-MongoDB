const express = require("express");
const dotenv = require("dotenv");
const DbConnection = require("./databaseConnection");

const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");

dotenv.config();
const app = express();

DbConnection();
const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running",
  });
});

app.use("/users", userRouter);
app.use("/books", bookRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "This route doesn't exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
