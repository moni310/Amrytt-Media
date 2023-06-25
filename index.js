const app = require("express")();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const users = require("./routes/users");
const post = require("./routes/posts");
require("dotenv").config();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/user", users);
app.use("/api/posts", post);
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
