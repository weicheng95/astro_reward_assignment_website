<template>
  <div class="container is-fluid detail-wrapper" v-if="reward_detail">
    <div class="detail-image">
      <img :src="reward_detail.imageUrl" alt="Placeholder image"></div>
    <div class="detail-header">
      <div class="vendor">
        <figure class="image is-48x48">
          <img class="is-rounded vendor-logo" :src="reward_detail.vendor.logo">
        </figure>
        <div class="vendor-detail">
          <div class="vendor-detail_title title is-6">{{ reward_detail.vendor.name }}</div>
          <div class="vendor-detail_highlight subtitle is-7">
            {{ reward_detail.codeNotRequired ? "Redeem at Participating Store" : "Redeem Online" }}
          </div>
        </div>
      </div>
      <div class="coupon-detail">
        <div class="title is-6 sec-title">{{ reward_detail.title }}</div>
        <div class="third-title">{{ reward_detail.highlight }}</div>
        <br />
        <div>
          <span class="coupon-label">Redemption Period</span>
          <span class="coupon-text">{{ redemptPeriod }}</span>
        </div>
        <div>
          <span class="coupon-label">Website</span>
          <span class="coupon-text" v-html="getWebsiteLink"></span>
        </div>
        <div>
          <span class="coupon-label">locationLink</span>
          <span class="coupon-text" v-html="getlocationLink"></span>
        </div>
      </div>
    </div>
    <div class="detail-description">
      <div class="subtitle">Descriptions</div>
      <span class="content" v-html="reward_detail.description"></span>
    </div>
    <redeem-bar @confirm="redeemTrigger" :redeem="redeem" @show="showCode" v-show="reward_detail.codeRequired"></redeem-bar>
    <redeem-modal @confirm="redeemConfirmTrigger" @closeModal="showRedeemModal = false" :isActive="showRedeemModal"></redeem-modal>
    <login :isActive="showLoginModal" @closeModal="showLoginModal = false" :rewardId="reward_detail.id"></login>
    <reward-code-modal :isActive="showRewardCodeModal" @closeModal="closeRewardCodeModal" :rewardCode="redeem.rewardCode"></reward-code-modal>
  </div>
</template>

<script>
import RedeemBar from "../components/Reward/RedeemBar.vue";
import RedeemModal from "../components/Reward/RedeemModal.vue";
import RewardCodeModal from "../components/Reward/RewardCodeModal.vue";
import Login from "../components/User/Login.vue";

export default {
  name: "RewardDetail",
  data() {
    return {
      reward_detail: null,
      showRedeemModal: false,
      showLoginModal: false,
      showRewardCodeModal: false,
      redeem: {
        isRedeemed: false,
        isRedeemEnd: false,
        redeemEndAt: "",
        redeemStartAt: "",
        rewardCode: "",
      },
    };
  },
  components: {
    RedeemBar,
    RedeemModal,
    Login,
    RewardCodeModal,
  },
  computed: {
    redemptPeriod() {
      return `${this.$dayjs(this.reward_detail.redemptStart).format("DD MMM")} - ${this.$dayjs(this.reward_detail.redemptEnd).format("DD MMM YYYY")}`;
    },
    getWebsiteLink() {
      return `<a href="${this.reward_detail.website}" target='_blank'>Visit Link</a>`;
    },
    getlocationLink() {
      return `<a href="${this.reward_detail.locationLink}" target='_blank'>${this.reward_detail.locationText}</a>`;
    },
  },
  methods: {
    redeemTrigger() {
      this.showRedeemModal = true;
    },
    async redeemConfirmTrigger() {
      this.showRedeemModal = false;
      if (localStorage.getItem("user") == null) {
        this.showLoginModal = true;
      } else {
        // validate user and redeem reward
        const { IDNumber, accountNumber } = JSON.parse(localStorage.getItem("user"));
        await this.processReward(IDNumber, accountNumber, this.reward_detail.id);
        this.showCode();
      }
    },
    // show redeem code after succesfully redeem.
    showCode() {
      this.getRedeemInfoFromCookies();
      this.showRewardCodeModal = true;
    },
    // event trigger after reward code modal close
    closeRewardCodeModal() {
      this.showRewardCodeModal = false;
      this.getRedeemInfoFromCookies();
    },
    // get user info from localstorage, and use it to find redeem info.
    getRedeemInfoFromCookies() {
      const info = this.$cookies.get(this.reward_detail.id);
      if (info) {
        // find info from cookies if existed
        this.checkRedeemStatus(info);
      }
    },
    checkRedeemStatus(redeemInfo) {
      if (redeemInfo) {
        const res = {};
        res.isRedeemed = true;
        // check if redeem period is expired or not
        if (this.isTimeExpired(redeemInfo.redeemEndAt)) {
          res.isRedeemEnd = true;
          this.redeem = res;
        } else { // not yet expired
          res.redeemStartAt = redeemInfo.redeemStartAt;
          res.redeemEndAt = redeemInfo.redeemEndAt;
          res.rewardCode = redeemInfo.rewardCode;
          this.redeem = res;
        }
      }
    },
  },
  mounted() {
    if (!this.isEmptyObject(this.$route.params)) {
      this.getRewardById(this.$route.params.id).then((response) => {
        if (response.data) {
          this.reward_detail = response.data;
          // if this reward require code
          if (this.reward_detail.codeRequired) {
            // if user have ticked remember me
            this.getRedeemInfoFromCookies();
          }
        }
      });
    } else {
      this.$router.push({ name: "Reward" });
    }
  },
};
</script>

<style lang="scss">
.body-content {
  padding: 0;
}
</style>

<style lang="scss" scoped>
.detail-wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;

    .detail-header, .detail-description, .detail-image {
      padding: 0 20px !important;
    }
    .detail-header {
      margin-top: 10px;
      .vendor-logo {
        height: 100%;
      }
    }
    .coupon-detail {
      .sec-title {
       padding: 20px 0 0;
      margin-bottom: 10px;
      }
      .third-title {
        font-size: 14px;
      }
      .coupon-label {
        font-weight: bold;
        font-size: 14px;
        padding-right: 10px;
      }
      .coupon-text {
        font-size: 14px;
      }
    }
    .detail-description {
      .subtitle {
        font-size: 16px;
        padding-top: 10px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .content {
        font-size: 14px;
        ul {
          margin-left: 1em;
        }
      }
    }
    .detail-image, .detail-header {
      flex-grow: 0;
      max-width: 50%;
      flex-basis: 50%;
      padding: 2em;
    }
    .detail-image {
        padding-left: 0;
        img {
        max-width: 100%;
        width: 100%;
        height: auto;
        border-radius: 4px;
        object-fit: cover;
      }
    }
    .vendor {
      align-items: flex-start;
      display: flex;
      text-align: left;
      .vendor-detail {
        padding-left: 1em;
      }
    }
  @media (max-width: 900px) {
      .detail-image, .detail-header {
      flex-grow: 0;
      max-width: 100%;
      flex-basis: 100%;
    }
  }
}
</style>
