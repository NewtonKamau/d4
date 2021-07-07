<template>
  <div id="app" class="md-layout">
    <!-- show dialog -->
    <!-- <md-dialog :md-active.sync="showDialog">
      <NewTodo :currentTodo="currentTodo" />
    </md-dialog>

    <div class="container">
      <h2 class="text-center">My Todo list</h2>

      <router-link to="/register">Register</router-link>

      <md-button class="md-primary md-raised" @click="showDialog = true">
        Add Todo <md-icon>add</md-icon>
      </md-button>
      <md-button class="md-primary md-raised" @click="logout()">
        Logout <md-icon>logout</md-icon>
      </md-button> -->

    <!-- todo list -->
    <!-- <TodoList
        id="todo-list"
        @showDialog="updateShowDialog($event)"
        @currentTodo="setCurrentTodo($event)"
      />
    </div> -->
    <!-- <Todo/> -->

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({}),
  methods: {},
  logout() {},
};
</script>

<style scoped>
@import "./assets/styles.css";
#app {
  padding-top: 100px;
}
#todo-list {
  margin-top: 20px;
}
</style>
