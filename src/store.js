import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rewardModal: false,
    vendorModal: false,
    modal: {
      type: "",
      item: undefined,
      action: "",
    },
  },
  mutations: {
    rewardModal(state, isShow) {
      Vue.set(state, "rewardModal", isShow);
    },
    vendorModal(state, isShow) {
      Vue.set(state, "vendorModal", isShow);
    },
    modalStatus(state, {
      variableName, item, type, action,
    }) {
      state[variableName].type = type !== undefined ? type : "";
      state[variableName].item = item !== undefined ? item : undefined;
      state[variableName].action = action !== undefined ? action : "";
      Vue.set(state, "modal", state[variableName]);
    },
  },
  getters: {
    rewardModal: state => state.rewardModal,
    vendorModal: state => state.vendorModal,
    modal: state => state.modal,
  },
});
