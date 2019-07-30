<template>
  <div class="" style="text-align: center">
    <nav-bar title="智能派单停车系统" left-arrow class="nav-bar"></nav-bar>
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
          this.$router.push("/customer-mobile/parking-order-mobile");
          this.active = 1;
          break;
      }
    },
    changeActive(index) {
      this.active = index;
    },
    initWebSocket() {
      // 连接错误
      this.websocket.onerror = this.setErrorMessage;

      // 连接成功
      this.websocket.onopen = this.setOnopenMessage;

      // 收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage;

      // 连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage;

      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload;
    },
    setErrorMessage() {
      console.log("WebSocket连接发生错误 状态码：" + this.websocket.readyState);
    },
    setOnopenMessage() {
      console.log("WebSocket连接成功 状态码：" + this.websocket.readyState);
    },
    setOnmessageMessage(event) {
      // 根据服务器推送的消息做自己的业务处理
      // this.$store.commit('setWebSocket', event.data);
      localStorage.setItem("WebSocket", event.data);
      console.log("服务端返回：" + event.data);
    },
    setOncloseMessage() {
      console.log("WebSocket连接关闭 状态码：" + this.websocket.readyState);
    },
    onbeforeunload() {
      this.closeWebSocket();
    },
    closeWebSocket() {
      this.websocket.close();
    }
  },
  mounted() {
    // WebSocket
    if ("WebSocket" in window) {
      this.websocket = new WebSocket("ws://39.100.40.15:8080/websocket");
      this.initWebSocket();
    } else {
      alert("当前浏览器 Not support websocket");
    }
  },
  beforeDestroy() {
    this.onbeforeunload();
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
