<template>
  <div id="signup" >
    <form novalidate @submit.prevent="register">
      <md-card>
        <md-card-header>
          <div class="md-title">New User</div>
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
                <!-- <span class="md-error" v-if="!$v.form.email.required"
                  >The email is required</span
                >
                <span class="md-error" v-else-if="!$v.form.email.email"
                  >Invalid email</span
                > -->
              </md-field>

              <md-field>
                <label for="password">password</label>
                <md-input name="password" id="password" v-model="password" />
                <!-- <span class="md-error" v-if="!$v.form.firstName.required"
                  >password is required</span
                >
                <span class="md-error" v-else-if="!$v.password.minlength"
                  >Invalid first name</span
                > -->
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button
            type="submit"
            style="width: 100%"
            class="md-raised md-primary"
            :disabled="sending"
            >Create user</md-button
          >
        </md-card-actions>
      </md-card>

      <p style="text-align: right">
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      sending: false,
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert("Successfully registered! Please login.");
          this.$router.push("/login");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
<style scoped>
#signup {
  margin: 0 auto;
  width: 300px;
}
</style>
