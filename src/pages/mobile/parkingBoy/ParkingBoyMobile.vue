<template>
  <div style="text-align: center">
    <nav-bar title="智能派单停车系统" left-arrow class="nav-bar" @click-left="onClickLeft"></nav-bar>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" @click="clickHomePage">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" :info="infoMessage" @click="clickStopOrderItem">停车订单</van-tabbar-item>
      <template v-if="willDeal !== 0">
        <van-tabbar-item
          icon="friends-o"
          :info="willDeal"
          id="fetchOrder"
          @click="clickFetchOrderItem"
        >取车订单</van-tabbar-item>
      </template>
      <template v-else>
        <van-tabbar-item icon="friends-o" id="fetchOrder" @click="clickFetchOrderItem">取车订单</van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  name: "ParkingBoyMobile",
  components: {
    NavBar
  },
  data() {
    return {
      infoMessage: "",
      active: 0,
      willDeal: 0,
      fetchCarOrders: []
    };
  },
  watch: {
    fetchCarOrders: function() {
      this.willDeal = this.fetchCarOrders.filter(
        item => item.status === "已停车"
      ).length;
    }
  },
  mounted() {
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.getParkingOrdersByTimer();
      }, 1000);
    }
  },
  methods: {
    getParkingOrdersByTimer() {
      let parkingBoyName = JSON.parse(localStorage.getItem("user")).userName;
      this.$get(`/parking-orders/fetch?parkingBoyName=${parkingBoyName}`).then(
        res => {
          this.fetchCarOrders = res.data;
        }
      );
    },
    clickHomePage() {
      this.active = 0;
      alert("首页");
    },
    clickStopOrderItem() {
      this.active = 1;
      alert("停车订单");
    },
    clickFetchOrderItem() {
      this.active = 2;
      this.$router.push("/parking-boy-mobile/appointment-fetch-car-items-list");
    },
    onClickLeft() {
      this.$router.go(-1);
      this.active = 2;
    }
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  height: 50px;
  background-color: #44582d;
  color: white;
}

&.van-nav-bar__text {
  color: white;
}

&.van-nav-bar__title {
  color: white;
}

&.van-icon-arrow-left:before {
  color: white;
}
</style>
