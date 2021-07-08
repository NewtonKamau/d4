<template>
  <div id="login">
    <form novalidate @submit.prevent="login">
      <md-card>
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>
        <md-card-content>
          <div>
            <div>
              <md-field>
                <label for="email">Email</label>
                <md-input
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="email"
                  v-model="email"
                  :disabled="sending"
                />
                <!-- <span class="md-error" v-if="!form.email.required"
                  >The email is required</span
                >
                <span class="md-error" v-else-if="!form.email.email"
                  >Invalid email</span
                > -->
              </md-field>

              <md-field>
                <label for="password">password</label>
                <md-input name="password" id="password" v-model="password" />
                <!-- <span class="md-error" v-if="!form.firstName.required"
                  >password is required</span
                >
                <span class="md-error" v-else-if="!password.minlength"
                  >Invalid first name</span
                > -->
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button
            style="width: 100%"
            type="submit"
            class="md-raised md-primary"
            :disabled="sending"
          >
            Login</md-button
          >
        </md-card-actions>
      </md-card>

      <p style="text-align: right">
        Don't have an account yet? <a href="/register">Signup</a>
      </p>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      sending: false,
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert("Successfully logged in");
          this.$router.push("/home");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
<style scoped>
#login {
  margin: 0 auto;
  width: 300px;
}
</style>
