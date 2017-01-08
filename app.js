'use strict';

var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var caesar = require('./cipher.js');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testexam"
});

con.connect();

app.use(bodyParser.json());

app.use(
  express.static(__dirname)
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/decode/all', function(req, res) {
  var allPrevious = {"all": []};
  con.query('SELECT * FROM decode', function(err, rows, fields) {
    rows.forEach(function(e) {
      allPrevious.all.push(e.text);
    });
    if (err) throw err;
    res.json(allPrevious);
  });
});

app.post('/decode', function(req, res) {
  con.query({
    sql: 'INSERT INTO `decode` (`shift`, `text`) VALUES ("'+req.body.shift+'", "'+req.body.text+'")',
  }, function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
});

app.get('/decode', function(req, res) {
  var current = [];
  con.query('SELECT * FROM decode', function(err, rows, fields) {
    current = rows[rows.length - 1];
    if (err) throw err;
    var decoded = caesar.cipher(current.shift, current.text);
    var response = {"status": "ok", "text": decoded};
    con.query('SELECT * FROM decode', function(err, rows, fields) {
      if (err) throw err;
      res.json(response);
    });
  });
});

app.listen(3004, function(req, res) {
  console.log('Server is running on port 3004')
});

// con.end();
