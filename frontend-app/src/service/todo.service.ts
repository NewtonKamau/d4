import Vue from 'vue'
import http from "../Http-comman";
import VueResource from 'vue-resource'

Vue.use(VueResource)
export default class TodoService {

  /* fetch all todo function via api */
  getAllTodo() {
    return http.get(`/api/todo-list`);
  }

  /** save a todo in db */
  saveTodo(todo) {
    return http.post('/api/add-todo', todo);
  }

  /** update a todo */
  updateTodo(todo) {
    return http.put('/api/update', todo);
  }

  /** delete a todo from the list */
  deleteTodo(id) {
    return http.delete(`/api/delete-todo/${id}`);
  }
}