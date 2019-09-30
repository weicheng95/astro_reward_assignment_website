<template>
  <div>
    <div :class="[{ 'is-active': isActive }, 'modal redeem-modal']">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Redeem this offer now?</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <p>Do note that you will only have 60 minutes to use the offer once you proceed.</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-medium is-fullwidth cancel-button" @click="closeModal">
            CANCEL
          </button>
          <button class="button is-medium is-fullwidth process-button" @click="confirmRedeem">PROCEED</button>
        </footer>
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
  name: "RedeemModal",
  methods: {
    confirmRedeem() {
      this.$emit("confirm");
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style lang="scss" scoped>
  .redeem-modal {
    z-index: 10000 !important;

    .modal-card-foot, .modal-card-head {
      border-bottom: none !important;
      border-top: none !important;
      background-color: white;
    }

    .modal-card-foot {
      justify-content: center;

      .button {
        max-width: 50%;
        flex-basis: 50%;
        font-size: 14px;
        height: 40px;
      }

      .cancel-button {
        border: 2px solid black;
      }
      .process-button {
        background-color: $primary-pink-color;
        color: $button-pink-color;
      }
    }
  }
</style>
