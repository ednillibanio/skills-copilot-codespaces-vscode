// Create web server
// Create a web server that listens on port 3000 and serves the comments API. The API should support the following operations:
// GET /comments - returns a list of comments in JSON format
// POST /comments - adds a new comment
// DELETE /comments/:id - deletes a comment by id
// The comments should be stored in a file on disk. You can use the fs module to read and write from the file. The file should be named comments.json and should be an array of JSON objects.
// You can use the following comments as an initial list of comments:
// [
//   {
//     "id": 1,
//     "author": "John Doe",
//     "body": "This is a comment"
//   },
//   {
//     "id": 2,
//     "author": "Jane Doe",
//     "body": "This is another comment"
//   }
// ]

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const commentsFile = path.join(__dirname, 'comments.json');

app.use(express.json());

app.get('/comments', (req, res) => {
  fs.readFile(commentsFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
      return;
    }

    const comments = JSON.parse(data);
    res.json(comments);
  });
});

app.post('/comments', (req, res) => {
  fs.readFile(commentsFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
      return;
    }

    const comments = JSON.parse(data);
    const newComment = req.body;
    newComment.id = comments.length + 1;
    comments.push(newComment);

    fs.writeFile(commentsFile, JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        res.status(500).send('Server error');
        return;
      }

      res.json(newComment);
    });
  });
});

app.delete('/comments/:id', (req, res) => {
  fs.readFile(commentsFile, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
      return;
    }