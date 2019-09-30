<template>
  <div>
    <div :class="[{ 'is-active': isActive }, 'modal login-modal']">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <global-header></global-header>
          <p class="modal-header-title">Verify Astro account</p>
        </header>
        <section class="modal-card-body">
         <div class="form">
           <div class="field">
              <label class="label">
                <span>ID Number</span>
                <span class="is-pulled-right tips-btn whythis-btn" @click="showWhyThisModal = true">
                  Why need this?
                </span>
              </label>
              <div class="control">
                <div class="select">
                  <select v-model="form.IDType">
                    <option>MyCard number</option>
                    <option>Old NRIC number</option>
                    <option>Passport number</option>
                    <option>Army ID number</option>
                    <option>Police ID number</option>
                    <option>Navy ID number</option>
                  </select>
                </div>
              </div>
              <div class="control">
                <input class="input" type="text" placeholder="E.g. 570303135700" v-model="form.IDNumber">
              </div>
            </div>
            <div class="field">
              <label class="label">
                <span>Account / Smartcard Number</span>
                <span class="is-pulled-right sample-btn tips-btn">Sample</span>
              </label>
              <div class="control">
                <input class="input" type="number" pattern="[0-9]*" placeholder="E.g. 0931613456" v-model="form.accountNumber">
              </div>
            </div>
            <div class="field">
              <label class="checkbox">
                <input type="checkbox" v-model="form.isRemember">
                Remember me
              </label>
            </div>
            <div class="field is-grouped">
                <button class="button primary-white-btn" @click="closeModal">
                  CANCEL
                </button>
                <button :class="['button', {'primary-disable-btn' : isFormValid }, {'primary-pink-btn' : !isFormValid }]"
                :disabled="isFormValid"
                @click="confirmRedeem">
                  PROCEED
                </button>
            </div>
         </div>
        </section>
      </div>
    </div>

    <!-- why this modal -->
    <why-this-modal :isActive="showWhyThisModal" @modalClose="showWhyThisModal = false">
    </why-this-modal>
  </div>
</template>

<script>
import GlobalHeader from "../General/Header.vue";
import WhyThisModal from "./WhyThisModal.vue";

export default {
  props: {
    isActive: {
      type: Boolean,
      default: true,
    },
    rewardId: {
      type: Number,
      required: true,
    },
  },
  name: "Login",
  components: {
    GlobalHeader,
    WhyThisModal,
  },
  computed: {
    isFormValid() {
      return this.form.IDNumber === "" || this.form.accountNumber === "";
    },
  },
  data() {
    return {
      showWhyThisModal: false,
      form: {
        IDType: "MyCard number",
        IDNumber: "",
        accountNumber: "",
        isRemember: false,
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    async confirmRedeem() {
      await this.processReward(this.form.IDNumber, this.form.accountNumber, this.rewardId, this.form.isRemember);
      window.location.reload();
    },
  },
  mounted() {
    const info = this.$cookies.get(1);
    console.log(info);
  },
};
</script>

<style lang="scss" scoped>
  .login-modal {
    z-index: 10000;

   .modal-card {
      width: 100%;
      height: 100%;
      max-height: 100vh;
   }

  .modal-card-head {
    background-color: white;
    border-bottom: none;
    display: block;
    padding: 20px 0;
    .modal-header-title {
      padding-top: 10px;
      font-weight: bold;
      font-size: 20px;
      padding: 10px 20px;
    }
  }
  .modal-card-body {
    .select, select {
      width: 100%;
    }
    .control {
      padding: 10px 0;
    }
    .flex-50 {
      flex-basis: 50%;
    }
    .button {
      width: 100%;
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
    .tips-btn {
      color: $primary-pink-color;
      font-size: 16px;
      font-weight: 300;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
   .modal-card-head, .modal-card-body, .modal-card-foot {
     border-radius: 0;
   }
  }
</style>
