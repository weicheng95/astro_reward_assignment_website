<template>
  <div>
    <div class="field">
      <label class="label">Select Vendor</label>
      <div class="control">
        <div class="select is-primary">
          <select v-model="form.vendorId">
            <option v-for="(vendor, i) in vendors" :key="i" :value="vendor.id">{{ vendor.name }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" v-model="form.title">
      </div>
    </div>
    <div class="field">
      <label class="label">Highlight</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" v-model="form.highlight">
      </div>
    </div>
    <div class="field">
      <label class="label">Website</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" v-model="form.website">
      </div>
    </div>
    <div class="field">
      <label class="label">Location Text</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" v-model="form.locationText">
      </div>
    </div>
    <div class="field">
      <label class="label">Location Link</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" v-model="form.locationLink">
      </div>
    </div>
    <div class="field">
      <label class="label">Reward Type</label>
      <div class="control">
        <div class="select is-primary">
          <select v-model="form.rewardTypeId">
            <option v-for="(rewardType, i) in rewardTypes" :key="i" :value="rewardType.id">{{rewardType.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <label class="checkbox">
        <input type="checkbox" v-model="form.codeRequired">
        Code Required
      </label>
    </div>
    <div class="field" v-show="form.codeRequired">
      <label class="label">Code</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" v-model="form.code">
      </div>
    </div>
    <div class="field" v-show="form.codeRequired">
      <label class="label">Code Count</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" v-model="form.codeLeft">
      </div>
    </div>
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" v-model="form.isFlashSale">
        Flash Sale
      </label>
    </div>
    <div class="field">
      <label class="label">Schedule</label>
      <div class="control is-flex">
        <datetime type="datetime" v-model="form.scheduleStart"></datetime>
        <span>-</span>
        <datetime type="datetime" v-model="form.scheduleEnd"></datetime>
      </div>
    </div>
    <div class="field">
      <label class="label">Redeem</label>
      <div class="control is-flex">
        <datetime type="datetime" v-model="form.redeemStart"></datetime>
        <span>-</span>
        <datetime type="datetime" v-model="form.redeemEnd"></datetime>
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
    <div class="field editor-field">
      <quill-editor class="editor-example bubble"
                      ref="myTextEditor"
                      :content="form.description"
                      :options="editorOption"
                      @change="onEditorChange($event)">
      </quill-editor>
    </div>
    <footer class="form-submit-btn">
      <button class="button is-medium is-fullwidth cancel-button primary-white-btn" @click="closeModal">
        CANCEL
      </button>
      <button class="button is-medium is-fullwidth process-button primary-pink-btn" @click="submitForm">PROCEED</button>
    </footer>
  </div>
</template>

<script>

import { Datetime } from "vue-datetime";
import { mapState } from "vuex";
// You need a specific loader for CSS files
import "vue-datetime/dist/vue-datetime.css";

export default {
  name: "RewardForm",
  computed: mapState(["rewardModal"]),
  watch: {
    rewardModal(newValue, oldValue) {
      console.log(newValue, oldValue);
      if (this.$store.getters.modal.item !== undefined && newValue) {
        this.form = this.$store.getters.modal.item;
      }
    },
  },
  props: {
    vendors: {
      type: Array,
      required: true,
    },
    rewardTypes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      form: {
        title: "",
        highlight: "",
        vendorId: null,
        website: "",
        locationLink: "",
        locationText: "",
        rewardTypeId: null,
        codeRequired: false,
        code: "",
        isFlashSale: false,
        scheduleStart: "",
        scheduleEnd: "",
        redeemStart: "",
        redeemEnd: "",
        imageUrl: "",
        description: "",
        codeLeft: 0,
      },
      imageFile: null,
      editorOption: {
        theme: "bubble",
        placeholder: "support html",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["link", "image"],
            ["clean"],
          ],
        },
      },
    };
  },
  components: {
    Datetime,
  },
  methods: {
    previewFiles() {
      this.imageFile = this.$refs.imageFile.files.length ? this.$refs.imageFile.files[0] : null;
    },
    closeModal() {
      this.$store.commit("modalStatus", { variableName: "modal" }); // reset modal detail
      this.$store.commit("rewardModal", false);
    },
    submitForm() {
      this.$emit("submitForm", this.form, this.imageFile);
    },
    onEditorChange({ editor, html, text }) {
      this.form.description = html;
    },
  },
  created() {
  },
  mounted() {
  },
};

</script>

<style lang="scss">
.vdatetime input{
  @extend .custom-input
}
.form-submit-btn {
  position: sticky;
  bottom: 0;
  width: 100%;
  left: 0;
  padding-bottom: 0;
  margin-top: 50px;
  display: flex;
}
.editor-field {
  border: 1px solid black;
  margin: 20px 0;
}
</style>
