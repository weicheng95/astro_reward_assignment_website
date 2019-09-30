<template>
  <div class="bar-wrapper">
    <div class="bar-inner">
      <div class="bar-text">This offer is valid for 60 minutes upon redemption</div>
      <div class="has-text-right bar-button">
        <a class="button is-medium is-fullwidth" @click="showConfirmModal">REDEEM</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RedeemBar",
  methods: {
    showConfirmModal() {
      this.$emit("confirm");
    },
  },
};

</script>

<style lang="scss" scoped>
  .bar-wrapper {
    z-index: 1000;
    top: auto;
    bottom: 0px;
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    left: auto;
    right: 0;
    position: fixed;
    .bar-inner {
      margin: 0px auto;
      height: 72px;
      padding: 16px;
      box-sizing: border-box;
      width: 100%;
      max-width: 1200px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .bar-text {
        max-width: 67%;
        flex-basis: 67%;
        font-size: 14px;
      }
      .bar-button {
        max-width: 33%;
        flex-basis: 33%;
        a {
          height: 40px;
          padding: 0 24px;
          font-size: 14px;
          background-color: $primary-pink-color;
          color: $button-pink-color;
        }
      }
    }
  }
</style>
