<template>
  <div class="container">
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ErrorMessage",
  computed: mapState(["error"]),
  methods: {
    dismiss() {
      this.$store.state.error = "";
    }
  }
};
</script>

<style scoped></style>
