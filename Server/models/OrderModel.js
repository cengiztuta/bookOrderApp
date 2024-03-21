const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
    },
    basket: [
      {
        bookTitle: {
          type: String,
          required: [true, "Please enter a title"],
        },
        bookAuthor: {
          type: String,
          required: [true, "Please enter an author"],
        },
        bookPrice: {
          type: Number,
          required: [true, "Please enter a price"],
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "In processing",
      editable: true,
    },
    totalPrice: {
      type: Number,
      required: [true, "Please enter a total price"],
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        if (ret.basket && ret.basket.length > 0) {
          ret.basket = ret.basket.map((book) => {
            const { _id, ...cleanedBook } = book;
            return cleanedBook;
          });
        }

        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Order = mongoose.model("Order", OrdersSchema);

module.exports = Order;
