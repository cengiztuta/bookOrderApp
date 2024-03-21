// app.js (Express uygulamasının ana dosyası)

const express = require("express");
const cors = require("cors");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const bookRoutes = require("./routes/bookRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const userRoutes = require("./routes/userRoutes");
const dbConnect = require("./db");

const app = express();
const PORT = 3000;
app.use(cors({ exposedHeaders: "Content-Range" }));
app.use(express.json());

app.use("/", bookRoutes);
app.use("/", ordersRoutes);
app.use("/", userRoutes);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cengiz Books API",
      version: "0.1",
      description: "Welcome to My Books API Documentation",
      contact: {
        name: "Cengiz TUTA",
      },
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./routes/bookRoutes.js"],
};
const swaggerDocs = swaggerjsdoc(swaggerOptions);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocs));

dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log("Node API app is running on port 3000");
  });
});
