const express = require("express");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
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
router.post("/", (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No data to add book",
    });
  }
  const book = books.find((each) => each.id === data.id);

  if (book) {
    return res.status(404).json({
      success: false,
      message: "Book with ID already Exist",
    });
  }
  const allBooks = { ...books, data };
  return res.status(201).json({
    success: true,
    message: "Book Added Successfully",
    data: allBooks,
  });
});

//Updating a book by ID
router.put("/updateBook/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book Not Found",
    });
  }
  const updateBookData = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "Book Updated",
    data: updateBookData,
  });
});

module.exports = router;
