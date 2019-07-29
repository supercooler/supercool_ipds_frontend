import Vue from "vue";
import Router from "vue-router";
import ParkingBoy from "./pages/ParkingBoy.vue";
import ParkingLot from "./pages/ParkingLot.vue";
import ParkingOrder from "./pages/ParkingOrder.vue";
import Login from "./pages/Login.vue";
import Home from "./pages/Home.vue";
import CustomerMobile from "./pages/mobile/customer/CustomerMobile";

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
      name: "login",
      component: Login
    },
    {
      path: "/parking-lot",
      name: "parkingLot",
      component: ParkingLot
    },
    {
      path: "/parking-order",
      name: "ParkingOrder",
      component: ParkingOrder
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        { path: "parking-lot", component: ParkingLot },
        { path: "parking-order", component: ParkingOrder },
        { path: "", component: ParkingBoy }
      ]
    },
    {
      path: "/customer-mobile",
      name: "customer-mobile",
      component: CustomerMobile
    }
  ]
});
