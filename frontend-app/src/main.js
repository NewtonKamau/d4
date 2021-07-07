import Vue from 'vue'
import App from './App.vue'
import { Priority } from './enums.ts'
// vue material
import VueMaterial from 'vue-material'
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import VueRouter from "vue-router";
import router from "./router";
import firebase from "firebase";

Vue.use(VueMaterial,VueRouter);
var firebaseConfig = {
  apiKey: "AIzaSyBDq_8BgX2GJzu0ar0yKnfuJXERkvfO-Og",
  authDomain: "todo-vue-ce3d1.firebaseapp.com",
  projectId: "todo-vue-ce3d1",
  storageBucket: "todo-vue-ce3d1.appspot.com",
  messagingSenderId: "319752447553",
  appId: "1:319752447553:web:781229846524ccf430c8c0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

// return the priority by name
Vue.filter('priority', (value) => {
  return Priority[value];
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
