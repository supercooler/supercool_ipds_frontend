<template>
  <div style="text-align: center">
    <nav-bar title="智能派单停车系统" left-arrow class="nav-bar"></nav-bar>
    <h1>我是一个莫得感情的Parking Boy</h1>
    <br /><van-icon name="fire"></van-icon>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" :info="infoMessage"
        >新订单</van-tabbar-item
      >
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
      active: 0
    };
  },
  mounted() {
    let result = localStorage.getItem("WebSocket");
    if (result !== null) {
      this.infoMessage = "1";
    }
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  height: 50px;
  background-color: rgba(30, 44, 76, 0.93);
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
