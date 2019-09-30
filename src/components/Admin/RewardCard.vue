<template>
  <div class="card-component" v-if="reward">
    <div class="card"  @click="$emit('editReward', reward)">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="reward.imageUrl" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="reward.vendor.logo" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">J{{ reward.vendor.name }}</p>
            <p class="subtitle is-6">{{ reward.highlight }}</p>
          </div>
        </div>

        <div class="content">
        {{ reward.title }}
        </div>
      </div>
    </div>
    <!-- delete icon -->
    <i class="fas fa-trash" @click="$emit('deleteReward', reward)"></i>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    reward: {
      type: Object,
    },
  },
};

</script>

<style lang="scss" scoped>
  .card {
    cursor: pointer;
  }
  .fa-trash {
    position: absolute;
    top: 3%;
    right: 3%;
    color: #118fe4;
    font-size: 25px;
    cursor: pointer;
  }
  .card-component {
    position: relative;
  }
</style>
