const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username.length < 1) {
      res.status(400).send("Invalid username")
  }
  if (password.length < 1) {
      res.status(400).send("Invalid password")
  }

  users.push({username: username, password: password});
  res.status(200).send("User successfully registered");
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
});

/*Get all books using Async callbacks
public_users.get("/server/asynbooks", async function (req,res) {
  try {
    let response = await axios.get("http://localhost:5000/");
    console.log(response.data);
    return res.status(200).json(response.data);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Error getting book list"});
  }
});
*/

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.send(books[isbn]);
  } else {
    res.status(404).send("Book not found");
  }
 });

 /*Get book details by ISBN using Promises
 public_users.get("/server/asynbooks/isbn/:isbn", function (req,res) {
  let {isbn} = req.params;
  axios.get(`http://localhost:5000/isbn/${isbn}`)
  .then(function(response){
    console.log(response.data);
    return res.status(200).json(response.data);
  })
  .catch(function(error){
      console.log(error);
      return res.status(500).json({message: "Error while fetching book details."})
  })
});
*/
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let bookByAuthor = [];
  for (isbn in books) {
      if (books[isbn].author === author) {
          bookByAuthor.push(books[isbn]);
      }
  }
  if (bookByAuthor.length > 0) {
      res.status(200).send(bookByAuthor);
  } else {
      res.status(404).send("Book not found");
  }
});

/*Get book details by author using promises
public_users.get("/server/asynbooks/author/:author", function (req,res) {
  let {author} = req.params;
  axios.get(`http://localhost:5000/author/${author}`)
  .then(function(response){
    console.log(response.data);
    return res.status(200).json(response.data);
  })
  .catch(function(error){
      console.log(error);
      return res.status(500).json({message: "Error while fetching book details."})
  })
});
*/

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let bookByTitle = [];
  for (isbn in books) {
      if (books[isbn].title === title) {
          bookByTitle.push(books[isbn]);
      }
  }
  if (bookByTitle.length > 0) {
      res.status(200).send(bookByTitle);
  } else {
      res.status(404).send("Book not found");
  };
});

/* Get all books based on title using promises
public_users.get("/server/asynbooks/title/:title", function (req,res) {
  let {title} = req.params;
  axios.get(`http://localhost:5000/title/${title}`)
  .then(function(response){
    console.log(response.data);
    return res.status(200).json(response.data);
  })
  .catch(function(error){
      console.log(error);
      return res.status(500).json({message: "Error while fetching book details."})
  })
});
*/

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].review);
});

module.exports.general = public_users;
