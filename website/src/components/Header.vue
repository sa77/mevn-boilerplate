<template>
  <div id="nav">
    <div v-if="!isAuthenticated">
      <router-link to="/">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </div>
    {{ userEmail }}
    <div v-if="isAuthenticated">
      <button @click="onLogout" class="btn btn-danger">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    userEmail() {
      const currentUser = this.$store.getters.user;
      return currentUser ? currentUser.email : null;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
});
</script>

<style scoped>
a,
a label {
  cursor: pointer;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
