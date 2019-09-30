<template>
  <div class="app">
    <section class="section header">
      <global-header></global-header>
    </section>
    <div class="body-content">
      <router-view></router-view>
    </div>
    <section class="section is-widescreen is-fullhd footer-section">
      <footer class="footer">
        <div class="content has-text-left">
          <p>
            Copyright © 2019. Measat Broadcast Network System Sdn. Bhd.
            (240064-A). All Rights Reserved.
          </p>
          <div>
            <a href="#">Terms</a> |
            <a href="#">Privacy</a>
          </div>
        </div>
      </footer>
    </section>
  </div>
</template>

<script>
import GlobalHeader from "./components/General/Header.vue";

export default {
  components: {
    GlobalHeader,
  },
};

</script>
<style lang="scss" scoped>
.app {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  .header {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .footer-section {
    padding: 0 !important;
    .footer {
      padding: 2rem 1rem  !important;
    }
  }

}
</style>
