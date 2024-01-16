const { database } = require('../config.json')
const {createConnection} = require('mysql');

let con = createConnection(database)

con.connect(err => {
  if (err) console.error(err);
  console.log("Database Connected!");
  setInterval(function () {
    con.query('SELECT 1');
  }, 5000);
});

module.exports = con;