import express, { response } from "express";
//import { pool } from './postgres';
// const pool = require("./postgres").pool;
const bodyParser = require("body-parser");
const cors = require("cors");

const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "tasks",
  password: "password",
  port: 5432,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

const todoList = [
  {
    _id: "6788899",
    title: "Some task",
    priority: 1,
    dateAdded: "26/06/2021",
  },
  {
    _id: "678889999999",
    title: "Some task II",
    priority: 0,
    dateAdded: "27/06/2021",
  },
];

// default path
app.get("/", (req, res) => {
  res.send("The to-do app is running fine.");
});
// insert into table (list the col, ..) values (values. ....)
// add todo
app.post("/api/add-todo", (req, res) => {
  // save data in db
  const {
    _id,
    title,
    description,
    priority,
    completed,
    dateadded,
    duedate,
    file,
  } = req.body;
  // const query = `INSERT INTO tasks(_id,title,description,priority,dateadded,duedate,file) VALUES(${_id}, ${title},${description},${priority},${dateadded},${duedate},${file})`;
  const query = `INSERT INTO tasks(_id,title,description,priority,completed,dateadded,duedate,file) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;
  pool.query(
    query,
    [_id, title, description, priority, completed, dateadded, duedate, file],
    (err: any, results: any[]) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});

// update todo
app.put("/api/update/", (req, res) => {
  const {
    id,
    title,
    description,
    priority,
    completed,
    duedate,
    file,
  } = req.body;

   pool.query(
     "UPDATE tasks SET title = $2,description = $3,priority = $4,completed= $5,duedate=$6,file = $7 WHERE id = $1",
     [id,title,description,priority,completed,duedate,file],
     (error:any, results:any) => {
       if (error) {
        console.log(error);
        res.send("Error updating record");       }
       res.status(200).send(`task modified with ID: ${id}`);
     }
   );
  
});

// delete todo
app.delete("/api/delete-todo/:id", (req, res) => {
  const id = +req.params.id;
  const query = `DELETE FROM tasks WHERE id = ${id}`;
  pool.query(query, (error: any, resdb: any) => {
    if (error) {
      console.log(error);
      res.send("Error deleting record");
    } else {
      res.send("Record deleted");
    }
  });
});

// get all  todo
app.get("/api/todo-list", (req, res) => {
  // get data from db
  const query = "SELECT * FROM tasks";
  // console.log(pool);
  pool.query(query, (err: any, results: any) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results.rows);
    }
  });
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
