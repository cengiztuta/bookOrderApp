const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:asdfg12345@booksapi.ygxtmpd.mongodb.net/?retryWrites=true&w=majority&appName=BooksAPI",
      {}
    );
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
  } catch (error) {
    console.error("COULD NOT CONNECT TO DATABASE:", error.message);
  }
};
