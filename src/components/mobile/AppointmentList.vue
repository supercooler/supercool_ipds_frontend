<template>
  <div style="text-align: center">
    <span>
      <h2>我的订单</h2>
    </span>
    <el-table
      :data="parkingOrderList"
      :default-sort="{ prop: 'bookTime', order: 'descending' }"
      @row-click="showOrder"
      stripe
    >
      <el-table-column prop="id" label="订单号"></el-table-column>
      <el-table-column prop="bookTime" label="预定时间"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Constant from "@/common/constance.js";
export default {
  name: "AppointmentList",
  data() {
    return {
      parkingOrderList: [],
      parkingOrder: {}
    };
  },
  methods: {
    showOrder(row) {
      switch (row.status) {
        case Constant.HAD_ORDERED:
          this.$store.state.statusBarCount = 1;
          break;
        case Constant.HAD_DISPATCHED:
          this.$store.state.statusBarCount = 2;
          break;
        case Constant.HAD_CAR_STOPED:
          this.$store.state.statusBarCount = 3;
          break;
        case Constant.IN_FETCHING_CAR:
          this.$store.state.statusBarCount = 4;
          break;
        case Constant.WILL_BE_CONFIRMED:
          this.$store.state.statusBarCount = 5;
          break;
        case Constant.FINISH_FETCHING:
          this.$store.state.statusBarCount = 6;
          break;
      }
      this.$router.push("/customer-mobile/parking-order-mobile");
      this.$store.state.parkingOrder = row;
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
      let userId = JSON.parse(localStorage.getItem("user")).id;
      this.$store.dispatch("getParkingByUserId", userId);
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
  mounted() {
    let userId = JSON.parse(localStorage.getItem("user")).id;
    this.$store.dispatch("getParkingByUserId", userId);
    // WebSocket
    if ("WebSocket" in window) {
      this.websocket = new WebSocket(
        "ws://39.100.40.15:8080/websocket/" +
          JSON.parse(localStorage.getItem("user")).userName
      );
      this.initWebSocket();
    } else {
      alert("当前浏览器 Not support websocket");
    }
  },
  beforeDestroy() {
    this.onbeforeunload();
  },
  watch: {
    "$store.state.parkingOrders"() {
      this.parkingOrderList = this.$store.state.parkingOrders;
    }
  }
};
</script>

<style scoped>
>>> .el-table th {
  text-align: center;
}
>>> .el-table .cell {
  text-align: center;
}
</style>
