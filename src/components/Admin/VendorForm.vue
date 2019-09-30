<template>
  <div>
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" v-model="form.name">
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" v-model="form.email">
      </div>
    </div>
    <div class="field">
      <label class="label">Phone</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" v-model="form.phone">
      </div>
    </div>
    <div class="file has-name is-boxed">
      <label class="label">Image</label>
      <label class="file-label">
        <input class="file-input" type="file" ref="imageFile" @change="previewFiles">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            Choose a file…
          </span>
        </span>
        <span class="file-name" v-if="imageFile">
          {{imageFile.name}}
        </span>
      </label>
    </div>
    <footer class="form-submit-btn">
      <button class="button is-medium is-fullwidth cancel-button primary-white-btn"
      @click="closeModal">
        CANCEL
      </button>
      <button class="button is-medium is-fullwidth process-button primary-pink-btn"
      @click="submitForm">
        PROCEED
      </button>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "VendorForm",
  data() {
    return {
      form: {
        name: "",
        phone: "",
        email: "",
        imageUrl: "",
      },
      imageFile: null,
    };
  },
  computed: mapState(["vendorModal"]),
  watch: {
    vendorModal(newValue, oldValue) {
      console.log(newValue, oldValue);
      if (this.$store.getters.modal.item !== undefined && newValue) {
        this.form = this.$store.getters.modal.item;
      }
    },
  },
  methods: {
    previewFiles() {
      this.imageFile = this.$refs.imageFile.files.length ? this.$refs.imageFile.files[0] : null;
      console.log(this.imageFile);
    },
    closeModal() {
      this.$store.commit("modalStatus", { variableName: "modal" }); // clean up modal
      this.$store.commit("vendorModal", false);
    },
    submitForm() {
      this.$emit("submitForm", this.form, this.imageFile);
    },
  },
};

</script>

<style lang="scss" scoped>
.form-submit-btn {
  position: sticky;
  bottom: 0;
  width: 100%;
  left: 0;
  padding-bottom: 0;
  margin-top: 50px;
  display: flex;
}
</style>
