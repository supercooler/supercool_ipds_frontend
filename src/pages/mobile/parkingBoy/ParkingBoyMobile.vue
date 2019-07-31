<template>
  <div style="text-align: center">
    <nav-bar
      title="智能派单停车系统"
      left-arrow
      class="nav-bar"
      @click-left="onClickLeft"
    >
      <el-button size="mini" round slot="right" plain @click="logout"
        >登出系统</el-button
      >
    </nav-bar>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <template v-if="parkDeal !== 0">
        <van-tabbar-item
          icon="friends-o"
          :info="parkDeal"
          @click="clickParkOrderItem"
          >停车订单</van-tabbar-item
        >
      </template>
      <template v-else>
        <van-tabbar-item icon="friends-o" @click="clickParkOrderItem"
          >停车订单</van-tabbar-item
        >
      </template>
      <template v-if="willDeal !== 0">
        <van-tabbar-item
          icon="friends-o"
          :info="willDeal"
          id="fetchOrder"
          @click="clickFetchOrderItem"
          >取车订单</van-tabbar-item
        >
      </template>
      <template v-else>
        <van-tabbar-item icon="friends-o" @click="clickFetchOrderItem"
          >取车订单</van-tabbar-item
        >
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
  methods: {
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
    },
    logout() {
      localStorage.setItem("user", JSON.stringify(""));
      this.$router.push("/customer-login-mobile");
    },
    //******************************************************************Web Socket********************************************** */
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
      console.log(
        "WebSocket连接发生错误   状态码：" + this.websocket.readyState
      );
    },
    setOnopenMessage() {
      console.log("WebSocket连接成功    状态码：" + this.websocket.readyState);
    },
    setOnmessageMessage() {
      // 根据服务器推送的消息做自己的业务处理
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
    setOncloseMessage() {
      console.log("WebSocket连接关闭    状态码：" + this.websocket.readyState);
    },
    onbeforeunload() {
      this.closeWebSocket();
    },
    closeWebSocket() {
      this.websocket.close();
    }
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
    if (localStorage.getItem("user")) {
      this.userName = JSON.parse(localStorage.getItem("user")).userName;
    } else {
      this.$message.error("请您先登录！", 3);
      this.$router.push("/customer-login-mobile");
    }
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
    // WebSocket
    if ("WebSocket" in window) {
      this.websocket = new WebSocket(
        "ws://localhost:8080/websocket/" +
          JSON.parse(localStorage.getItem("user")).userName
      );
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
