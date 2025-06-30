const { UserModel, BookModel } = require("../models/index");

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

exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModel.find({
    issuedBook: { $exists: true },
  }).populate("issuedBook");
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
