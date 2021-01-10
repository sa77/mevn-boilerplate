<template>
  <div class="home">
    <Header></Header>
    <error-message></error-message>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import ErrorMessage from "./components/ErrorMessage.vue";

export default defineComponent({
  name: "Home",
  components: { Header, ErrorMessage }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.home {
  margin: 20px;
}
</style>
