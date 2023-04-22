const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
let mapToJson = require("./helpers.js").mapToJson;
let jsonToMap = require("./helpers.js").jsonToMap;

let users = [];

const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
}

const isValid = (username) => {
  let validusers = users.filter((user) => {
    return (user.username == username)
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return (user.username === username && user.password === password)
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
    }
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn
  books.forEach((book, key, m) => {
    if (book.get('isbn') === isbn) {
      let reviews = new Map() 
      reviews = book.get('reviews')
      reviews.set(req.session.authorization.username, req.body.review)
      book.set('reviews', reviews);
    }
    m[key] = book 
  });
  let n = new Map()
  books.forEach((book, key) => { if (book.get('isbn') === isbn) { n = book } })
  res.send(mapToJson(n));
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn
  books.forEach((book, key, m) => {
    if (book.get('isbn') === isbn) {
        let reviews = new Map() 
        reviews = book.get('reviews')
        reviews.delete(req.session.authorization.username)
        book.set('reviews', reviews)
        m[key] = book
    }
  });
  let n = new Map()
  books.forEach((book, key) => { if (book.get('isbn') === isbn) { n = book } })
  res.send(mapToJson(n));
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.userDoesExist = doesExist;
