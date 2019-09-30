import Api from "./Api";

export default {
  methods: {

    // reward
    getRewards() {
      return Api().get("rewards");
    },
    getRewardById(param) {
      return Api().get(`reward/${param}`);
    },
    getRewardTypes() {
      return Api().get("rewardtypes");
    },
    createReward(params) {
      return Api().post("reward", params);
    },
    updateReward(params) {
      return Api().put("reward", params);
    },
    editReward(params) {
      return Api().put("reward", params);
    },
    deleteRewardById(id) {
      return Api().delete(`reward/${id}`);
    },
    redeemReward(params) {
      return Api().post("reward/redeem", params); // rewardId, IDNumber, accountNumber, IDType
    },
    isRewardRedeem(params) {
      return Api().post("reward/redeem/check", params); // rewardId, IDNumber, accountNumber, IDType
    },
    // vendor
    getVendors() {
      return Api().get("vendors");
    },
    createVendor(params) {
      return Api().post("vendor", params);
    },
    updateVendor(params) {
      return Api().put("vendor", params);
    },
    deleteVendorById(id) {
      return Api().delete(`vendor/${id}`);
    },
    // file upload
    getUploadLink(params) {
      return Api().post("file", params);
    },
  },
};
