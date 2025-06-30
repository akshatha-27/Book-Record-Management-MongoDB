const express = require("express");
const router = express.Router();
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const { UserModel, BookModel } = require("../models/index");

//Getting all books
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

//Get all issued books
router.get("/issued", (req, res) => {
  const usersWithIsuuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];
  usersWithIsuuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Has Been Issued Yet",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Users with issued books",
    data: issuedBooks,
  });
});

//Getting a book by ID
router.get("/:id", (req, res) => {
  //const id=req.params.id;
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book Not Found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Book Found",
    data: book,
  });
});

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
