import Vue from "vue";
import Router from "vue-router";
import ParkingBoy from "./pages/ParkingBoy.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/parking-boy",
      name: "parking-boy",
      component: ParkingBoy
    },

    //addLogin
    {
      path: "/login",
      name: "/login",
      component: Login
    }
  ]
});