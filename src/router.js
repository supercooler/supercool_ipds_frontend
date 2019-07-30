import Vue from "vue";
import Router from "vue-router";
import ParkingBoy from "./pages/ParkingBoy.vue";
import ParkingLot from "./pages/ParkingLot.vue";
import ParkingOrder from "./pages/ParkingOrder.vue";
import Login from "./pages/Login.vue";
import Home from "./pages/Home.vue";
import CustomerMobile from "./pages/mobile/customer/CustomerMobile";
import ParkingOrderMobile from "./pages/mobile/customer/ParkingOrderMobile";
import AppointmentInputBar from "./components/mobile/AppointmentInputBar";
import AppointmentList from "./components/mobile/AppointmentList";
import ParkingBoyMobile from "./pages/mobile/parkingBoy/ParkingBoyMobile";
import UserInformationMobile from "./components/mobile/UserInformationMobile";

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
      component: Home,
      children: [
        { path: "parking-lot", component: ParkingLot },
        { path: "parking-order", component: ParkingOrder },
        { path: "", component: ParkingBoy }
      ]
    },
    {
      path: "/customer-mobile",
      component: CustomerMobile,
      children: [
        { path: "", component: AppointmentInputBar },
        { path: "appointment-list", component: AppointmentList }
      ]
    },
    {
      path: "/appointment-list",
      name: "AppointmentList",
      component: AppointmentList
    },
    {
      path: "/parking-boy-mobile",
      name: "ParkingBoyMobile",
      component: ParkingBoyMobile
    },
    {
      path: "/parking-order-mobile",
      name: "ParkingOrderMobile",
      component: ParkingOrderMobile
    },
    {
      path: "/user-information-mobile",
      name: "UserInformationMobile",
      component: UserInformationMobile
    }
  ]
});
