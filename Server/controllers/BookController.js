const Book = require("../models/BookModel");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res
        .status(404)
        .json({ message: `Cannot find any book with ID ${id}` });
    }

    const totalResults = await Book.countDocuments(); 
    res.header("Content-Range", `items 0-${totalResults - 1}/${totalResults}`);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const book = await Book.findOne({ title });

    if (!book) {
      return res
        .status(404)
        .json({ message: `Cannot find any book with title ${title}` });
    }

    const totalResults = await Book.countDocuments();
    res.header("Content-Range", `items 0-${totalResults - 1}/${totalResults}`);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getByISBN = async (req, res) => {
  try {
    const { ISBN } = req.params;
    const book = await Book.findOne({ ISBN });

    if (!book) {
      return res
        .status(404)
        .json({ message: `Cannot find any book with title ${ISBN}` });
    }

    const totalResults = await Book.countDocuments();
    res.header("Content-Range", `items 0-${totalResults - 1}/${totalResults}`);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, ISBN, pageNum, price } = req.body;

    const pageNumAsNumber = parseInt(pageNum);

    if (isNaN(pageNumAsNumber)) {
      return res.status(400).json({ message: "pageNum should be a number" });
    }

    const book = await Book.create({
      title,
      author,
      ISBN,
      price,
      pageNum: pageNumAsNumber,
    });
    res.status(201).json(book);
  } catch (error) {
    console.error("Error adding a new book:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!book) {
      return res
        .status(404)
        .json({ message: `Cannot find any book with ID ${id}` });
    }

    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res
        .status(404)
        .json({ message: `Cannot find any book with ID ${id}` });
    }

    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
