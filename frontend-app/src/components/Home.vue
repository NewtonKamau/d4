<template>
  <div id="home" class="md-layout">
    <!-- show dialog -->
    <md-dialog :md-active.sync="showDialog">
      <NewTodo :currentTodo="currentTodo" />
    </md-dialog>

    <div class="container">
      <h2 class="text-center">My Todo list</h2>

      <md-button class="md-primary md-raised" @click="showDialog = true">
        Add Todo <md-icon>add</md-icon>
      </md-button>
       <md-button class="md-accent" style="float: right" @click="logout()">
        Logout <md-icon>logout</md-icon>
      </md-button>
       <md-table-toolbar>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
    


      <!-- todo list -->
      <TodoList
        id="todo-list"
        @showDialog="updateShowDialog($event)"
        @currentTodo="setCurrentTodo($event)"
      />
    </div>
    <!-- <Todo/> -->

  </div>
</template>

<script>
import NewTodo from "./NewTodo.vue";
import TodoList from "./TodoList.vue";
import firebase from "firebase";

const toLower = text => {
    return text.toString().toLowerCase()
  }
  const searchByName = (TodoList, term) => {
    if (term) {
      return TodoList.fetchList.filter(item => toLower(item).includes(toLower(term)))
    }

    return TodoList
  }
export default {
  
  name: "App",
  components: {
    NewTodo,
    TodoList,
  },
  data: () => ({
    showDialog: false,
    currentTodo: null,
     search: null,
      searched: [],
  }),
  methods: {
    updateShowDialog(e) {
      this.showDialog = e;
    },
    setCurrentTodo(e) {
      this.currentTodo = e;
    },
    searchOnTable () {
        this.searched = searchByName(this.fetchList, this.search)
        console.log(this.searched);
      },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/login");
        });
    },
     created () {
      this.searched = this.TodoList.fetchList()
    }
  },
};
</script>

<style scoped>
@import "../assets/styles.css";
#todo-list {
  margin-top: 20px;
}
</style>
