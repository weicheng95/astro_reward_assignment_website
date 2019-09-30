<template>
  <div>
    <div :class="[{ 'is-active': isActive }, 'modal code-modal']">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Your offer is ready</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <p>Apply this code during the checkout process or click the SHOP NOW BUTTON below to have the code automatically applied to you.</p>
          <input class="input" type="text" placeholder="Text input" :value="rewardCode" readonly="true">
        </section>
        <footer class="modal-card-foot">
          <button class="button is-medium is-fullwidth cancel-button" @click="copyToClipboard(rewardCode)">
            COPY CODE
          </button>
          <button class="button is-medium is-fullwidth process-button">SHOP NOW</button>
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
    rewardCode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
    };
  },
  name: "RewardCodeModal",
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
  .code-modal {
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
