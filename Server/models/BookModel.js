const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    author: {
      type: String,
      required: [true, "Please enter an author"],
    },
    pageNum: {
      type: Number,
      required: [true, "Please enter the page number"],
    },
    ISBN: {
      type: Number,
      required: [true, "Please enter an ISBN"],
    },
    price: {
      type: Number,
      required: [true, "Please enter an ISBN"],
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
