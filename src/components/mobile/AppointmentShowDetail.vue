<template>
  <div class="orderMainPanel">
    <status-bar class="statusBar"></status-bar>
    <div class="orderInfo">
      <el-form label-width="100px">
        <el-form-item label="用户名">
          <el-tag>{{ orderDetail.user.userName }}</el-tag>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-tag>{{ orderDetail.carLisenceNumber }}</el-tag>
        </el-form-item>
        <el-form-item label="停车场">
          <el-tag>{{ orderDetail.parkingLot.name }}</el-tag>
        </el-form-item>
      </el-form>
    </div>
    <template v-if="orderDetail.status === '已停车'">
      <div class="fetchCarButton" @click="fetchCar">取车</div>
    </template>
    <template v-else-if="orderDetail.status === '取车中'">
      <div class="fetchCarButton" @click="GivenCar">完成车辆交付</div>
    </template>
    <template v-else-if="orderDetail.status === '待确认'">
      <div class="fetchCarButton banButton">待确认</div>
    </template>
    <template v-else-if="orderDetail.status === '已完成'">
      <div class="fetchCarButton" @click="seeScore">点击查看评分</div>
    </template>
  </div>
</template>
<script>
import StatusBar from "./StatusBar.vue";
export default {
  data() {
    return {
      orderDetail: { user: {}, parkingLot: {} }
    };
  },
  components: {
    StatusBar
  },
  created() {
    switch (this.$route.params.status) {
      case "已下单":
        this.$store.state.statusBarCount = 1;
        break;
      case "已配单":
        this.$store.state.statusBarCount = 2;
        break;
      case "已停车":
        this.$store.state.statusBarCount = 3;
        break;
      case "取车中":
        this.$store.state.statusBarCount = 4;
        break;
      case "待确认":
        this.$store.state.statusBarCount = 5;
        break;
      case "已完成":
        this.$store.state.statusBarCount = 6;
        break;
    }
  },
  mounted() {
    let id = this.$route.params.id;
    this.$get(`/parking-orders/${id}`).then(res => {
      this.orderDetail = res.data;
    });
  },
  methods: {
    fetchCar: function() {
      this.orderDetail.status = "取车中";
      let username = this.orderDetail.user.userName;
      this.$put("/parking-orders", this.orderDetail).then(() => {
        this.$get("/sendOneWebSocket/" + username);
        this.$router.go(-1);
      });
    },
    GivenCar: function() {
      this.orderDetail.status = "待确认";
      let username = this.orderDetail.user.userName;
      this.$put("/parking-orders", this.orderDetail).then(() => {
        this.$get("/sendOneWebSocket/" + username);
        this.$router.go(-1);
      });
    },
    seeScore: function() {
      this.$message.success("本次订单的评分是：" + this.orderDetail.score);
    }
  }
};
</script>
<style scoped>
.orderMainPanel {
  width: 90%;
  padding-top: 100px;
  margin: 0 auto;
}
.statusBar {
  float: left;
}
.orderInfo {
  width: 70%;
  float: right;
}
.fetchCarButton {
  width: 100%;
  background-color: #44582d;
  color: #fff;
  display: inline-block;
  line-height: 35px;
  border-radius: 5px;
  position: relative;
}
.banButton {
  background-color: #999;
  color: white;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
