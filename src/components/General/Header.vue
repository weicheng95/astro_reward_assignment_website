<template>
  <div class="container is-fluid header">
    <div class="subtitle">
      <router-link to="/"><img src="../../assets/logo.png" width="25%"></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss">
  .header {
    padding: 0 20px;
  }
</style>
