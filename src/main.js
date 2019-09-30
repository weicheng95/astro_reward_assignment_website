import Vue from "vue";
import Dayjs from "vue-dayjs";
import VueQuillEditor from "vue-quill-editor";
import VueCookies from "vue-cookies";
import App from "./App.vue";
import router from "./router";
import ApiServices from "./services/ApiServices";
import mixins from "./services/mixins";
import store from "./store";

import "@fortawesome/fontawesome-free/css/all.css";

// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

Vue.use(VueQuillEditor);
Vue.use(VueCookies);
Vue.config.productionTip = false;
Vue.use(Dayjs, {
  lang: "en",
});

Vue.mixin(ApiServices);
Vue.mixin(mixins);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
