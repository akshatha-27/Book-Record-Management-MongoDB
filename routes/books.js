const express = require("express");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById,
} = require("../controllers/book-controller");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

const { UserModel, BookModel } = require("../models/index");

//Getting all books
router.get("/", getAllBooks);

//Get all issued books
router.get("/issued", getAllIssuedBooks);

//Getting a book by ID
router.get("/:id", getSingleBookById);

//Adding a new book
router.post("/", addNewBook);

//Updating a book by ID
router.put("/updateBook/:id", updateBookById);

module.exports = router;
