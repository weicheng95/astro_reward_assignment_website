<template>
  <div>
    <div class="column">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <p>
            ADMIN
          </p>
          <a role="button"
          :class="[{'is-active' : navbar_burger }, 'navbar-burger burger']"
          @click="navbar_burger = !navbar_burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" :class="[{'is-active' : navbar_burger }, 'navbar-menu']">
          <div class="navbar-start">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                Vendor
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item" @click="showModal('vendorModal', 'vendor')">Create</a>
                <router-link to="/admin/vendors" class="navbar-item">Vendors</router-link>
              </div>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                Reward
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item" @click="showModal('rewardModal', 'reward')">
                  Create
                </a>
                <router-link to="/admin/rewards" class="navbar-item">Rewards</router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="column">
      <router-view></router-view>
      <create-update-reward-modal></create-update-reward-modal>
      <create-update-vendor-modal></create-update-vendor-modal>
    </div>
  </div>
</template>

<script>
import CreateUpdateRewardModal from "../../components/Admin/CreateUpdateRewardModal.vue";
import CreateUpdateVendorModal from "../../components/Admin/CreateUpdateVendorModal.vue";

export default {
  name: "AdminHome",
  data() {
    return {
      navbar_burger: false,
    };
  },
  components: {
    CreateUpdateRewardModal,
    CreateUpdateVendorModal,
  },
  methods: {
    showModal(modal, type) {
      this.$store.commit("modalStatus",
        {
          variableName: "modal", type, action: "CREATE",
        });
      this.$store.commit(modal, true);
    },
  },
  mounted() {
  },
};

</script>

<style lang="scss">

</style>
