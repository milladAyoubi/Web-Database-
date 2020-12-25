const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World NOOT');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



const MongoClient = require('mongodb').MongoClient;

const test = require('assert');

// Connection url

const url = 'mongodb://localhost:27017';

// Database Name

const dbName = 'test';
// Connect using MongoClient

MongoClient.connect(url, function(err, client) {

// Use the admin database for the operation

const adminDb = client.db(dbName).admin();
// List all the available databases

adminDb.listDatabases(function(err, dbs) {

test.equal(null, err);

test.ok(dbs.databases.length > 0);

client.close();

});

});