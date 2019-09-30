<template>
  <div class="card" v-if="reward">
    <div class="card-image">
      <figure class="image is-3by2">
        <img :src="reward.imageUrl" alt="">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="reward.vendor.logo" alt="" class="is-rounded">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-6">J{{ reward.vendor.name }}</p>
          <p class="subtitle is-7">{{ reward.highlight }}</p>
        </div>
      </div>

      <div class="content">
       {{ reward.title }}
      </div>
    </div>
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
  watch: {
    reward() {
      console.log(this.reward);
    },
  },
  mounted() {
    console.log(this.reward);
  },
};

</script>

<style lang="scss">
  .card {
    cursor: pointer;
    border-radius: 5px;
    .image img {
      border-radius: 5px;
      height: 100%;
    }

    .card-content {
      .media {
        margin-bottom: 1rem;
      }
      .content {
        font-weight: bold;
      }
    }
  }
</style>
