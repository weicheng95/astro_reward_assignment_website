<template>
  <div>
    <div :class="[{ 'is-active': $store.getters.vendorModal }, 'modal redeem-modal']">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create new Vendor</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <Vendor-form @submitForm="formSubmitHandler"></Vendor-form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VendorForm from "./VendorForm.vue";

export default {
  name: "CreateUpdateVendorModal",
  props: {
  },
  components: {
    VendorForm,
  },
  data() {
    return {
      vendors: [],
      VendorTypes: [],
    };
  },
  methods: {
    closeModal() {
      this.$store.commit("modalStatus", { variableName: "modal" }); // reset modal detail
      this.$store.commit("vendorModal", false);
    },

    async formSubmitHandler(form, file) {
      try {
        const { action } = this.$store.getters.modal;
        const vendorForm = JSON.parse(JSON.stringify(form));
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
              vendorForm.logo = `${process.env.VUE_APP_BUCKET_URL}${uploadLinkRes.data.fileName}`;
            }
          }
        }

        // update or create new vendor
        const vendorRes = action === "CREATE"
          ? await this.createVendor(vendorForm)
          : await this.updateVendor(vendorForm);
        if (vendorRes.data) {
          // reload if success
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },
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
