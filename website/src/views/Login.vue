<template>
  <div class="about">
    <h1>Login</h1>
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <br />
        <div class="submit">
          <button type="submit" :disabled="isFormSubmitting">
            {{ isFormSubmitting ? "Submitting ..." : "Submit" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      isFormSubmitting: false
    };
  },
  methods: {
    onSubmit() {
      this.isFormSubmitting = true;
      const { email, password } = this;
      this.$store.dispatch("login", { email, password });
    }
  },
  created() {
    this.$store.watch(
      state => state.error,
      newValue => {
        if (newValue) {
          this.isFormSubmitting = false;
        }
      }
    );
  }
});
</script>

<style scoped>
#signin h1 {
  text-align: center;
}

.signin-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input input:focus {
  outline: none;
  border: 1px solid #196aae;
  background-color: #eee;
}

.submit button {
  border: 1px solid #196aae;
  padding: 10px 20px;
  width: 100%;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #196aae;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>
