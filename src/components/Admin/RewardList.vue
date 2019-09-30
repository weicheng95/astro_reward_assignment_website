<template>
  <div class="container is-fluid">
    <div class="card-wrapper">
      <div class="card-item"
        v-for="(reward,i) in rewards"
        :key="i">
        <reward-card :reward="reward" @deleteReward="deleteReward" @editReward="editReward"></reward-card>
      </div>
    </div>
  </div>
</template>

<script>
import RewardCard from "./RewardCard.vue";

export default {
  name: "RewardList",
  components: {
    RewardCard,
  },
  data() {
    return {
      rewards: [],
    };
  },
  methods: {
    async deleteReward(reward) {
      console.log(reward);
      const r = window.confirm("Are you sure want to delete this reward?");
      if (r === true) {
        const deleteRes = await this.deleteRewardById(reward.id);
        if (deleteRes.status === 200) {
          window.location.reload();
        }
      }
    },
    editReward(reward) {
      this.$store.commit("modalStatus",
        {
          variableName: "modal", item: reward, action: "EDIT", type: "reward",
        });

      this.$store.commit("rewardModal", true);
    },
  },
  mounted() {
    this.getRewards().then((response) => {
      if (response.data) {
        this.rewards = response.data;
      }
    }).catch((err) => {
      alert(err);
    });
  },
};

</script>

<style lang="scss" scoped>
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
</style>
