<template>
  <div class="card-view">
    <div class="container is-fluid">
      <h1 class="title">Exclusive rewards for Astro subscribers</h1>
      <span class="subtitle">REWARDS</span>
      <span class="sort-icon">Sort</span>
    </div>
    <div class="container is-fluid">
      <div class="card-wrapper">
        <div class="card-item"
        v-for="(reward,i) in rewards"
        :key="i"
        @click="showDetail(reward.id)">
          <card :reward="reward"></card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Reward/Card.vue";

export default {
  name: "Reward",
  data() {
    return {
      cardCount: 6,
      rewards: [],
      sort: {
        LATEST: "Latest",
      },
    };
  },
  components: {
    Card,
  },
  methods: {
    showDetail(id) {
      this.$router.push({ name: "RewardDetail", params: { id } });
    },
    sortRewards(actions) {
      switch (actions) {
        case this.sort.LATEST:
          // eslint-disable-next-line max-len
          this.rewards = this.rewards.sort((a, b) => ((this.$dayjs(a.redeemStart).isBefore(this.$dayjs(b.redeemStart))) ? 1 : -1));

          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.getRewards().then((response) => {
      if (response.data) {
        this.rewards = response.data;
        this.sortRewards(this.sort.LATEST);
      }
    });
  },
};

</script>
<style lang="scss" scoped>

.card-view {
  padding: 0 20px !important;
  .container {
    margin-bottom: 20px;
  }
  .subtitle {
    font-size: 20px;
    font-weight: bold;
  }
  .sort-icon {
    float:right;
  }

  .card-wrapper {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
    display: grid;
  }


  @media(max-width:1024px){
    .card-wrapper {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media(max-width:540px){
    .card-wrapper {
      grid-template-columns: 1fr;
    }
  }
}
</style>
