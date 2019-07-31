import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { post, get, myDelete, put } from "./config/axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vant from "vant";
import "vant/lib/index.css";
//权限管理
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 验证是否需要登陆
    if (localStorage.getItem("user")["role"]) {
      // 查询本地存储信息是否已经登陆
      next();
    } else {
      next({
        path: "/login" // 未登录则跳转至login页面
      });
    }
  } else {
    next();
  }
});
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$delete = myDelete;
Vue.prototype.$put = put;

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
