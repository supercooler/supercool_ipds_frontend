<template>
  <div class="" style="text-align: center">
    <nav-bar
      title="智能派单停车系统"
      left-arrow
      class="nav-bar"
      @click-right="onClickRight"
      @click-left="onClickLeft"
    >
      <van-icon name="setting-o" slot="right"></van-icon>
    </nav-bar>
    <router-view @changActive="changeActive"></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="coupon" @click="locationIndex(0)"
        >预约</van-tabbar-item
      >
      <van-tabbar-item icon="friends" @click="locationIndex(1)"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script>
import { NavBar } from "vant";
export default {
  name: "CustomerMobile",
  components: {
    NavBar
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    locationIndex(index) {
      switch (index) {
        case 0:
          this.$router.push("/customer-mobile");
          this.active = 0;
          break;
        case 1:
          this.$router.push("/customer-mobile/appointment-list");
          this.active = 1;
          break;
      }
    },
    changeActive(index) {
      this.active = index;
    },
    onClickRight() {
      this.$router.push("/customer-mobile/user-information-mobile");
      this.active = 1;
    },
    onClickLeft() {
      this.$router.go(-1);
      this.active = 0;
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

&.van-icon-setting-o:before {
  color: white;
}
</style>
