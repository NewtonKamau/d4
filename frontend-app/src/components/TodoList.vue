<template>
  <div>
    <md-table md-card v-model="searched" >
      <md-table-row>
        <md-table-head md-numeric>No.</md-table-head>
        <md-table-head>Title</md-table-head>
        <md-table-head>Priority</md-table-head>
        <md-table-head>Completed</md-table-head>
        <md-table-head>File</md-table-head>
        <md-table-head>Date Added</md-table-head>
        <md-table-head>Due Date</md-table-head>
        <md-table-head>Action</md-table-head>
      </md-table-row>

      <md-table-row v-for="(item, i) in todoList" :key="item.id">
        <md-table-cell @click="updateTodo(item)">{{ i + 1 }}</md-table-cell>
        <md-table-cell @click="updateTodo(item)">{{
          item.title
        }}</md-table-cell>
        <md-table-cell @click="updateTodo(item)">{{
          item.priority
        }}</md-table-cell>
        <md-table-cell @click="updateTodo(item)">{{
          item.completed
        }}</md-table-cell>
        <md-table-cell @click="updateTodo(item)">{{ item.file }}</md-table-cell>
        <md-table-cell @click="updateTodo(item)">{{
          item.dateadded
        }}</md-table-cell>
        <md-table-cell @click="updateTodo(item)">{{
          item.duedate
        }}</md-table-cell>
        <md-table-cell>
          <md-button
            class="md-icon-button md-accent"
            @click="deleteTodo(item.id)"
          >
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import TodoService from "../service/todo.service.ts";
const todoService = new TodoService();
export default {
  name: "TableCard",
  comments: {},
  data: () => ({
    todoList: [],
     search: null,
    searched :[],
  }),
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      todoService
        .getAllTodo()
        .then((res) => {
          this.todoList = res.data;
        })
        .catch((err) => console.log(err));
    },
    updateTodo(item) {
      this.$emit("showDialog", true);
      this.$emit("currentTodo", item);
    },
    deleteTodo(id) {
      todoService
        .deleteTodo(id)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
