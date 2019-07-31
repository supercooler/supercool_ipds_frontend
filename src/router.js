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
import CustomerLoginMobile from "./pages/mobile/customer/CustomerLoginMobile";
import AppointmentShowDetail from "./components/mobile/AppointmentShowDetail.vue";
import RegisterUser from "./pages/mobile/customer/RegisterUser";
import AppointmentFetchCarItems from "./components/mobile/AppointmentFetchCarItems.vue";
import AppointmentShowParkItemsDetail from "./components/mobile/AppointmentShowParkItemsDetail.vue";
import AppointmentParkCarItems from "./components/mobile/AppointmentParkCarItems.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/parking-boy",
      name: "parking-boy",
      component: ParkingBoy,
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/parking-lot",
      name: "parkingLot",
      component: ParkingLot,
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      }
    },
    {
      path: "/parking-order",
      name: "ParkingOrder",
      component: ParkingOrder,
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      }
    },
    {
      path: "/home",
      component: Home,
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      },
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
        { path: "appointment-list", component: AppointmentList },
        { path: "user-information-mobile", component: UserInformationMobile },
        { path: "parking-order-mobile", component: ParkingOrderMobile }
      ],
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      }
    },
    {
      path: "/appointment-list",
      name: "AppointmentList",
      component: AppointmentList,
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      }
    },
    {
      path: "/parking-boy-mobile",
      name: "ParkingBoyMobile",
      component: ParkingBoyMobile,
      children: [
        {
          path: "appointment-park-car-items-list",
          component: AppointmentParkCarItems
        },
        {
          path: "appointment-park-car-detail/:id/:status",
          component: AppointmentShowParkItemsDetail
        },
        {
          path: "appointment-fetch-car-items-list",
          component: AppointmentFetchCarItems
        },
        {
          path: "appointment-fetch-car-detail/:id/:status",
          component: AppointmentShowDetail
        }
      ],
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      }
    },
    {
      path: "/parking-order-mobile",
      name: "ParkingOrderMobile",
      component: ParkingOrderMobile,
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      }
    },
    {
      path: "/user-information-mobile",
      name: "UserInformationMobile",
      component: UserInformationMobile,
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      }
    },
    {
      path: "/customer-login-mobile",
      name: "CustomerLoginMobile",
      component: CustomerLoginMobile
    },
    {
      path: "/register-user",
      name: "RegisterUser",
      component: RegisterUser
    }
  ]
});
