const { UserModel, BookModel } = require("../models/index");
const issuedBook = require("../dtos/book-dto");

//Getting all books
exports.getAllBooks = async (req, res) => {
  const books = await BookModel.find();

  if (books.length == 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Found",
    });
  }
  res.status(200).json({
    success: true,
    data: books,
  });
};

//Get a book by ID
exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findById(id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book Not Found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Book Found",
    data: book,
  });
};

//Get all issued books
exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModel.find({
    issuedBook: { $exists: true },
  }).populate("issuedBook");

  const issuedBooks = users.map((each) => new IssuedBook(each));

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
};

//Adding a new book
exports.addNewBook = async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No data to add book",
    });
  }
  await BookModel.create(data);
  const allBooks = await BookModel.find();

  return res.status(201).json({
    success: true,
    message: "Book Added Successfully",
    data: allBooks,
  });
};

//Updating book by ID
exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const updatedBook = await BookModel.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    message: "Book Updated",
    data: updatedBook,
  });
};
