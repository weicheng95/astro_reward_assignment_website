<template>
  <div class="bar-wrapper">
    <div class="bar-inner">
      <div class="bar-text" v-if="countDownStart && redeem.isRedeemed">Time left to redeem {{this.minute}}:{{this.second}}</div>
      <div class="bar-text" v-if="!redeem.isRedeemed">This offer is valid for 60 minutes upon redemption</div>
      <div class="bar-text" v-if="redeem.isRedeemEnd && redeem.isRedeemed">You've redeemed this</div>
      <div class="has-text-right bar-button">
        <a :class="[{'primary-disable-btn': this.redeem.isRedeemed && redeem.isRedeemEnd }, 'button is-medium is-fullwidth']"
          @click="showConfirmModal"
          :disabled="this.redeem.isRedeemed && redeem.isRedeemEnd">
          {{modalBtnText}}
        </a>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RedeemBar",
  data() {
    return {
      time_obj: undefined,
      minute: "",
      second: "",
      minuteCounter: 1,
      isRedeemStart: false,
      isRedeemEnd: false,
    };
  },
  props: {
    // redeemStartAt, redeemEndAt, isRedeemed
    redeem: {
      type: Object,
      required: true,
    },
  },
  watch: {
    redeem: {
      immediate: true,
      handler() {
        if (this.countDownStart && !this.redeem.isRedeemEnd) {
          this.startCountDown();
        }
      },
    },
  },
  computed: {
    countDownStart() {
      return this.$dayjs().unix() > this.$dayjs(this.redeem.redeemStartAt).unix()
      && this.$dayjs().unix() < this.$dayjs(this.redeem.redeemEndAt).unix();
    },
    modalBtnText() {
      if (this.redeem.isRedeemed && !this.countDownStart) {
        return "REDEEMED";
      }

      if (this.redeem.isRedeemed && this.countDownStart) {
        return "SHOW";
      }

      return "REDEEM";
    },
  },
  methods: {
    showConfirmModal() {
      if (this.modalBtnText === "SHOW") {
        this.$emit("show");
      } else if (!this.redeem.isRedeemed && !this.countDownStart) {
        this.$emit("confirm");
      }
    },

    countDown(second, minute, hour, day, left) {
      const now = this.$dayjs().valueOf();
      const distance = left - now;

      this.minute = Math.floor((distance % hour) / minute);
      this.second = Math.floor((distance % minute) / second);

      // do something later when date is reached
      if (distance <= 0) {
        clearInterval(this.time_obj);
        this.$emit("timeout");
      }
    },

    startCountDown() {
      const vm = this;
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
      console.log(this.redeem.redeemEndAt);
      const left = this.$dayjs(this.redeem.redeemEndAt).valueOf();

      // first trigger
      vm.countDown(second, minute, hour, day, left);

      this.time_obj = setInterval(() => {
        vm.countDown(second, minute, hour, day, left);
      }, second);
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
