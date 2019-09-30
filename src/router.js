import Vue from "vue";
import Router from "vue-router";
import Reward from "./views/Reward.vue";
import RewardDetail from "./views/RewardDetail.vue";
import AdminHome from "./views/Admin/Home.vue";
import RewardList from "./components/Admin/RewardList.vue";
import VendorList from "./components/Admin/VendorList.vue";
import CreateUpdateVendorModal from "./components/Admin/CreateUpdateVendorModal.vue";
import CreateUpdateRewardModal from "./components/Admin/CreateUpdateRewardModal.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Reward",
      component: Reward,
    },
    {
      path: "/rewards-detail/:id",
      name: "RewardDetail",
      component: RewardDetail,
    },
    {
      path: "/admin",
      name: "AdminHome",
      component: AdminHome,
      children: [
        {
          // A will be rendered in the second <router-view>
          // when /your-sidebar-url/a is matched
          path: "rewards",
          component: RewardList,
        },
        {
          // A will be rendered in the second <router-view>
          // when /your-sidebar-url/a is matched
          path: "vendors",
          component: VendorList,
        },
        {
          // A will be rendered in the second <router-view>
          // when /your-sidebar-url/a is matched
          path: "vendor/create",
          component: CreateUpdateVendorModal,
        },
        {
          // A will be rendered in the second <router-view>
          // when /your-sidebar-url/a is matched
          path: "reward/create",
          component: CreateUpdateRewardModal,
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("./components/User/Login.vue"),
    },
  ],
});
