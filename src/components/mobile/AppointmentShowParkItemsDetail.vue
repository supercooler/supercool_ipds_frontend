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
          <!-- <el-tag>{{orderDetail.parkingLot.name}}</el-tag> -->
          <el-select v-model="value" placeholder="请选择停车场" size="small">
            <el-option
              v-for="item in parkingLots"
              :key="item.id"
              :label="item.name"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约时间">
          <el-tag>{{ orderDetail.bookTime }}</el-tag>
        </el-form-item>
        <el-form-item label="预约地点">
          <el-tag>{{ orderDetail.preLocation }}</el-tag>
        </el-form-item>
      </el-form>
    </div>
    <div class="parkCarButton" @click="parkCar">停车</div>
  </div>
</template>
<script>
import StatusBar from "./StatusBar.vue";
export default {
  data() {
    return {
      orderDetail: { user: {} },
      parkingLots: [],
      value: ""
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
    this.$get(
      `/parking-lots/boy?parkingBoyName=${
        JSON.parse(localStorage.getItem("user")).userName
      }`
    ).then(res => {
      this.parkingLots = res.data;
    });
  },
  methods: {
    parkCar: function() {
      this.orderDetail.status = "已停车";
      let username = this.orderDetail.user.userName;
      this.orderDetail.parkingLot = this.value;
      this.orderDetail.parkingLot.restCapacity -= 1;
      this.$put("/parking-orders", this.orderDetail).then(() => {
        this.$get("/sendOneWebSocket/" + username);
        this.$router.go(-1);
      });
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
.parkCarButton {
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
