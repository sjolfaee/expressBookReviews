const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let userDoesExist = require("./auth_users.js").userDoesExist;
const public_users = express.Router();
let mapToJson = require("./helpers.js").mapToJson;
let jsonToMap = require("./helpers.js").jsonToMap;


public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!userDoesExist(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});



// Get the book list available in the shop
public_users.get('/', function (req, res) {
  const booksAllGet = new Promise((resolve, reject) =>{
    try {
      const data = mapToJson(books);
      resolve(data);
    } catch(err) {
      reject(err)
    }
  });
  booksAllGet.then((data) => res.send(data)
  ).catch((err) => res.status(404).json({ message: "Books not found" }));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const bookGet = new Promise((resolve, reject)=>{
    try {
      let n = new Map()
      books.forEach((book, key) => { if (book.get('isbn') === isbn) { n = book } })
      resolve(mapToJson(n))
    } catch(err) {
      reject(err)
    }
  });

  bookGet.then((data) => res.send(data)
  ).catch((err) => { console.log(err); 
    res.status(404).json({ message: "Book with ISBN: " + isbn + " not found" });
  });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const bookGet = new Promise((resolve, reject)=>{
    try {
      let n = new Map()
      books.forEach((book, key) => { if (book.get('author') === author) { n = book } })
      resolve(mapToJson(n))
    } catch(err) {
      reject(err)
    }  
  });  

  bookGet.then((data) => res.send(data)
  ).catch((err) => res.status(404).json({ message: "Book with author: " + author + " not found" }));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const bookGet = new Promise((resolve, reject)=>{
    try {
      let n = new Map()
      books.forEach((book, key) => { if (book.get('title') === title) { n = book } })
      resolve(mapToJson(n))
    } catch(err) {
      reject(err)
    }  
  });  
  bookGet.then((data) => res.send(data)
  ).catch((err) => res.status(404).json({ message: "Book with Title: " + title + " not found" }));
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const bookGet = new Promise((resolve, reject)=>{
    try {
      let n = new Map()
      books.forEach((book, key) => { if (book.get('isbn') === isbn) { n = book } })
      resolve(mapToJson(n))
    } catch(err) {
      reject(err)
    }  
  });  

  bookGet.then((data) => res.send(data)
  ).catch((err) => res.status(404).json({ message: "Book with ISBN: " + isbn + " not found" }));
});

module.exports.general = public_users;
