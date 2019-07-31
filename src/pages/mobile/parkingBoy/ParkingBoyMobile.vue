<template>
  <div style="text-align: center">
    <nav-bar title="智能派单停车系统" left-arrow class="nav-bar" @click-left="onClickLeft"></nav-bar>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <template v-if="parkDeal !== 0">
        <van-tabbar-item icon="friends-o" :info="parkDeal" @click="clickParkOrderItem">停车订单</van-tabbar-item>
      </template>
      <template v-else>
        <van-tabbar-item icon="friends-o" @click="clickParkOrderItem">停车订单</van-tabbar-item>
      </template>
      <template v-if="willDeal !== 0">
        <van-tabbar-item
          icon="friends-o"
          :info="willDeal"
          id="fetchOrder"
          @click="clickFetchOrderItem"
        >取车订单</van-tabbar-item>
      </template>
      <template v-else>
        <van-tabbar-item icon="friends-o" @click="clickFetchOrderItem">取车订单</van-tabbar-item>
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
      parkDeal: 0,
      active: 0,
      willDeal: 0,
      fetchCarOrders: [],
      parkCarOrders: []
    };
  },
  watch: {
    fetchCarOrders: function() {
      this.willDeal = this.fetchCarOrders.filter(
        item => item.status === "已停车"
      ).length;
    },
    parkCarOrders: function() {
      this.parkDeal = this.parkCarOrders.length;
    }
  },
  mounted() {
    // if (this.timer) {
    //   clearInterval(this.timer);
    // } else {
    //   this.timer = setInterval(() => {
    //     this.getParkingOrdersByTimer();
    //   }, 1000);
    // }
    this.getParkingOrdersByTimer();
  },
  methods: {
    getParkingOrdersByTimer() {
      let parkingBoyName = JSON.parse(localStorage.getItem("user")).userName;
      this.$get(`/parking-orders/fetch?parkingBoyName=${parkingBoyName}`).then(
        res => {
          this.fetchCarOrders = res.data;
        }
      );
      this.$get(`/parking-orders/park?parkingBoyName=${parkingBoyName}`).then(
        res => {
          this.parkCarOrders = res.data;
        }
      );
    },
    clickParkOrderItem() {
      this.active = 0;
      this.$router.push("/parking-boy-mobile/appointment-park-car-items-list");
    },
    clickFetchOrderItem() {
      this.active = 1;
      this.$router.push("/parking-boy-mobile/appointment-fetch-car-items-list");
    },
    onClickLeft() {
      this.$router.go(-1);
      this.active = 1;
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
