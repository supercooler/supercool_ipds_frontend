import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { post, get, myDelete, put } from "./config/axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$delete = myDelete;
Vue.prototype.$put = put;

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
