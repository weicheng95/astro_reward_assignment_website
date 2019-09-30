<template>
  <div>
    <div :class="[{ 'is-active': isActive }, 'modal redeem-modal']">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <button class="delete is-pulled-right" aria-label="close" @click="modalClose"></button>
        </header>
        <section class="modal-card-body">
          <p class="text-detail">
            This process is to secure your Astro account and personal
            info from being accessed by unauthorised users.
          </p>
          <p>
            <button class="button primary-white-btn" @click="modalClose">
              OK
            </button>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  name: "WhyThisModal",
  methods: {
    modalClose() {
      // inform parent component to set modal status to false
      this.$emit("modalClose");
    },
  },
};
</script>

<style lang="scss">
  .redeem-modal {
    z-index: 10000;

    .modal-card {
      padding: 0 20px !important;
      font-size: 14px;
      font-weight: 300;

      .modal-card-head {
        justify-content: flex-end;
        padding-bottom: 0;
        border-radius: 4px 4px 0 0;
      }
      .modal-card-body {
        padding-top: 10px;
      }
      .text-detail {
        padding-bottom: 20px;
      }
      .button {
        width: 100%;
        max-width: 100% !important;
      }
    }
  }
</style>
