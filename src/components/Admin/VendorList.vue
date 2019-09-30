<template>
  <div class="table-container">
    <table class="table is-bordered">
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Logo</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
    </thead>
    <tbody>
      <tr v-for="(vendor, i) in vendors" :key="i">
        <td>{{ vendor.email }}</td>
        <td>{{ vendor.name }}</td>
        <td><img :src="vendor.logo" width="100" /></td>
        <td>{{ vendor.phone }}</td>
        <td>
          <button class="button" @click="editVendor(vendor)">Edit</button>
          <button class="button is-danger" @click="deleteVendor(vendor)">Delete</button>
        </td>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: "VendorList",
  components: {
  },
  data() {
    return {
      vendors: [],
    };
  },
  methods: {
    editVendor(vendor) {
      this.$store.commit("modalStatus",
        {
          variableName: "modal", item: vendor, action: "EDIT", type: "vendor",
        });

      this.$store.commit("vendorModal", true);
    },
    async deleteVendor(vendor) {
      const r = window.confirm("Are you sure want to delete this vendor?");
      if (r === true) {
        const deleteRes = await this.deleteVendorById(vendor.id);
        if (deleteRes.status === 200) {
          window.location.reload();
        }
      }
    },
  },
  mounted() {
    this.getVendors().then((response) => {
      if (response.data) {
        this.vendors = response.data;
      }
    }).catch((err) => {
      alert(err);
    });
  },
};

</script>

<style lang="scss">

</style>
