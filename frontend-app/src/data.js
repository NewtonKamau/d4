//require the Elasticsearch librray
const elasticsearch = require("elasticsearch");
// instantiate an Elasticsearch client
const client = new elasticsearch.Client({
  hosts: ["http://localhost:9200"],
});
// ping the client to be sure Elasticsearch is up
client.ping(
  {
    requestTimeout: 30000,
  },
  function(error) {
    // at this point, eastic search is down, please check your Elasticsearch service
    if (error) {
      console.error("Elasticsearch cluster is down!");
    } else {
      console.log("Everything is ok");
    }
  }
);
// create a new index called todolist. If the index has already been created, this function fails safely
client.indices.create({
      index: 'todolists'
  }, function(error, response, status) {
      if (error) {
          console.log(error);
      } else {
          console.log("created a new index", response);
      }
});
client.index({
     index: 'todolists',
     id: '1',
     type: 'todo',
     body: {
         "Key1": "Content for key one",
         "Key2": "Content for key two",
         "key3": "Content for key three",
     }
 }, function(err, resp, status) {
     console.log(resp);
});
 
// require the array of todos
const todos = require('./Http-comman.js');
// declare an empty array called bulk
var bulk = [];
//loop through each todo and create and push two objects into the array in each loop
//first object sends the index and type you will be saving the data as
//second object is the data you want to index
cities.forEach(todo =>{
   bulk.push({index:{
                 _index:"todolist",
                 _type:"todos",
             }
         })
  bulk.push(city)
})
//perform bulk indexing of the data passed
client.bulk({body:bulk}, function( err, response  ){
         if( err ){
             console.log("Failed Bulk operation".red, err)
         } else {
             console.log("Successfully imported %s".green, todo.length);
         }
});