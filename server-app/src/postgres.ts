const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "todos",
  host: "localhost",
  database: "tasks",
  password: "password",
  port: 5432,
});
pool.query("SELECT NOW()", (err: any, res:any) => {
  console.log(err, res);
  pool.end();
});
const client = new Client({
  user: "todos",
  host: "localhost",
  database: "tasks",
  password: "password",
  port: 5432,
});
client.connect();
client.query("SELECT NOW()", (err:any, res:any) => {
  console.log(err, res);
  client.end();
});
// const query = 'SELECT * FROM tasks';
// pool.query(query, (err:, res:) => {
//   console.log(err, res)
//   pool.end()
// });
// module.exports = {
//   pool
// }

/**
 * _id: String(new Date().getTime()),
      title: null,
      description: null,
      priority: null,
      completed: "false",
      dateAdded: new Date(),
      dueDate: null,
      file: null,
 */

// CREATE TABLE tasks (_id varchar(45) NOT NULL, title varchar(50), description varchar(255), priority INT, completed boolean, dateAdded TIMESTAMP, dueDate TIMESTAMP, file varchar(255));
