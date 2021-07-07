<template>
  <div id="add-task">
    <md-dialog-title>Add New Task</md-dialog-title>
    <md-content class="md-scrollbar">
      <form role="form" method="POST" action="">
        <input type="hidden" name="_token" value="" />

        <md-field>
          <label class="control-label">Task</label>
          <md-input
            name="title"
            id="task"
            autocomplete="false"
            v-model="todoModel.title"
          />
        </md-field>

        <md-field>
          <label class="control-label">Description</label>
          <md-input
            name="description"
            id="description"
            autocomplete="false"
            v-model="todoModel.description"
          />
        </md-field>

        <md-field>
          <label class="control-label">Priority</label>
          <md-select name="priority" id="priority" v-model="todoModel.priority">
            <md-option value="0">High</md-option>
            <md-option value="1">Medium</md-option>
            <md-option value="2">Low</md-option>
          </md-select>
        </md-field>

        <div>
          <p class="less-margin">Completed</p>
          <md-radio
            v-model="todoModel.completed"
            v-bind:value="true"
            class="md-primary"
            >Yes</md-radio
          >
          <md-radio
            v-model="todoModel.completed"
            v-bind:value="false"
            class="md-primary"
            >No <small>(Default)</small>
          </md-radio>
        </div>

        <md-datepicker v-model="todoModel.duedate">
          <label>Select Due date</label>
        </md-datepicker>

        <md-field>
          <label>Select File</label>
          <md-file v-model="todoModel.file" />
        </md-field>

        <md-button class="md-danger md-raised" @click="show = false">
          Cancel
        </md-button>
        <md-button class="md-primary md-raised" @click="saveTodo()">
          Save
        </md-button>
      </form>
    </md-content>
  </div>
</template>
<script>
import moment from "moment";
import TodoService from "../service/todo.service.ts";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
const todoService = new TodoService();
export default {
  name: "NewTodo",
  mixins: [validationMixin],
  props: ["currentTodo"],
  data: () => ({
    myDateAdded: new Date(),
    todoModel: {
      _id: String(new Date().getTime()),
      title: null,
      description: null,
      priority: null,
      completed: "false",
      dateadded: new Date(),
      duedate: null,
      file: null,
    },
    validations: {
      todoModel: {
        title: {
          required,
          minLength: minLength(3),
        },
      },
    },
  }),
  created() {
    if (this.currentTodo) {
      console.log(this.currentTodo.duedate);
      this.currentTodo.duedate = moment(
        this.currentTodo.duedate.split("T")[0]
      ).format("yyyy-MM-DD");
      this.todoModel = this.currentTodo;
    }
  },
  methods: {
    saveTodo() {
      if (this.todoModel.id) {
        // update record
        todoService.updateTodo(this.todoModel);
      } else {
        // save record
        todoService.saveTodo(this.todoModel);
      }
    },
    cancelTodo() {
      console.log("record edit canceled");
    },
  },
};
</script>
<style scoped>
#add-task {
  padding: 16px;
}
</style>
