import React, { useState } from "react";
import "./BookOrder.css";
import { useLocation } from "react-router-dom";
const BookOrder = () => {

  const [isbn, setIsbn] = useState("");
  const [foundData, setFoundData] = useState(null);
  const [selectedBook, setSelectedBook] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const userEmail = location.state?.userEmail || "";

  const handleGetPrice = () => {
    fetch(`http://localhost:3000/books?isbn=${isbn}`)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (item) => item.ISBN === parseInt(isbn, 10)
        );

        if (filteredData.length === 0) {
          alert("No data found for the entered ISBN.");
        } else {
          setFoundData(filteredData);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while fetching data.");
      });
  };

  const handleAddToBasket = () => {
    if (foundData && foundData.length > 0) {
      const newBook = {
        title: foundData[0].title,
        author: foundData[0].author,
        price: foundData[0].price,
      };

      const isBookInBasket = selectedBook.some(
        (book) => book.title === newBook.title && book.author === newBook.author
      );

      if (isBookInBasket) {
        alert("This book is already in the basket.");
      } else {
        setSelectedBook((prevSelectedBooks) => [...prevSelectedBooks, newBook]);
      }
    }
  };

  const calculateTotalPrice = (books) => {
    const totalPrice = books.reduce((total, book) => total + book.price, 0);
    return totalPrice.toFixed(2); 
  };

  const handleRemoveFromBasket = (index) => {
    const updatedSelectedBook = [...selectedBook];
    updatedSelectedBook.splice(index, 1);
    setSelectedBook(updatedSelectedBook);
  };

  const handleOrder = () => {
    if (selectedBook.length === 0) {
      alert("Your basket is empty. Add books before placing an order.");
      return;
    }

    const orderData = {
      email: userEmail, 
      totalPrice: calculateTotalPrice(selectedBook),
      basket: selectedBook.map((book) => ({
        bookTitle: book.title,
        bookAuthor: book.author,
        bookPrice: book.price,
      })),
    };

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order placed successfully:", data);
        setSelectedBook([]); 
        alert("Order placed successfully!");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("Error placing order. Please try again.");
      });
  };
  return (
    <div className="Order-Page">
      <div className="Book-Order">
        <div className="order-container">
          <div className="order-input-container">
            <input
              className="order-input"
              placeholder="Place Enter ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
            <button className="order-button" onClick={handleGetPrice}>
              GET PRICE
            </button>
          </div>
          {foundData && (
            <div className="ordered-book">
              <div className="ordered-book-container">
                <div className="ordered-book-row">
                  <a>Title</a>
                  <a>{foundData[0]?.title}</a>
                </div>
                <div className="ordered-book-row">
                  <a>Author</a>
                  <a>{foundData[0]?.author}</a>
                </div>
                <div className="ordered-book-row">
                  <a>Price</a>
                  <a>{foundData[0]?.price}</a>
                </div>{" "}
              </div>{" "}
            </div>
          )}
          <button className="add-basket-button" onClick={handleAddToBasket}>
            ADD TO BASKET
          </button>
        </div>{" "}
      </div>

      <div className="order-basket">
        <h2>Shopping Basket</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {selectedBook?.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.price}</td>
                <div
                  className="cancel-button"
                  onClick={() => handleRemoveFromBasket(index)}
                >
                  X
                </div>
              </tr>
            ))}
          </tbody>
          <tr>
            <td>Total Price:</td>
            <td colSpan="2">{calculateTotalPrice(selectedBook)} $</td>
          </tr>
        </table>{" "}
        <button className="order-button" onClick={handleOrder}>
          ORDER
        </button>
      </div>
    </div>
  );
};

export default BookOrder;
