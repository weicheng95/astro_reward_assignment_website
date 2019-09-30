<template>
  <div>
    <div :class="[{ 'is-active': $store.getters.rewardModal }, 'modal redeem-modal']">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create new reward</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <reward-form
          :vendors="vendors"
          :rewardTypes="rewardTypes"
          @submitForm="formSubmitHandler"></reward-form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RewardForm from "./RewardForm.vue";

export default {
  name: "CreateUpdateRewardModal",
  components: {
    RewardForm,
  },
  data() {
    return {
      vendors: [],
      rewardTypes: [],
    };
  },
  methods: {
    closeModal() {
      this.$store.commit("modalStatus", { variableName: "modal" }); // reset modal detail
      this.$store.commit("rewardModal", false);
    },

    async formSubmitHandler(form, file) {
      try {
        const { action } = this.$store.getters.modal;
        const rewardForm = JSON.parse(JSON.stringify(form));
        if (action === "CREATE" && (!form || !file)) {
          throw new Error("form or file not found");
        }

        if (file) {
          // convert file to blob
          const blobData = await this.fileToBlob(file);
          // generate upload link
          const uploadLinkRes = await this.getUploadLink({ filename: file.name });

          if (uploadLinkRes.data) {
            // upload file to S3
            const uploadRes = await axios.put(uploadLinkRes.data.uploadURL, blobData, {
              headers: {
                "Content-Type": file.type,
              },
            });
            if (uploadRes.status === 200) {
              rewardForm.imageUrl = `${process.env.VUE_APP_BUCKET_URL}${uploadLinkRes.data.fileName}`;
            }
          }
        }
        // update or create new reward
        const rewardRes = action === "CREATE"
          ? await this.createReward(rewardForm)
          : await this.updateReward(rewardForm);
        if (rewardRes.data) {
          // reload if success
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    try {
      const vendorRes = await this.getVendors();
      if (vendorRes.data) {
        this.vendors = vendorRes.data;
      }

      const rewardtypeRes = await this.getRewardTypes();
      if (rewardtypeRes.data) {
        this.rewardTypes = rewardtypeRes.data;
      }
    } catch (err) {
      console.log(err);
    }
  },
};

</script>

<style lang="scss" scoped>
  @media(min-width: 769px){
    .modal-content, .modal-card {
      width: 90% !important;
    }
  }
</style>
