var config = require('../db-config.js');
var mysql = require('mysql');

const HOST=config.REST_IP;
const PORT = config.MYSQL_PORT;

const USER = config.USER;
const PASSWORD=config.PASSWORD
const THPCLOUD=config.THPCLOUD
const SCMDB = config.SCMDB

var connection = mysql.createConnection({
  host: HOST,
  user:USER,
  password:PASSWORD,
  database:SCMDB,
  port:PORT
});

connection.connect();

console.log(HOST);
console.log(PORT);
