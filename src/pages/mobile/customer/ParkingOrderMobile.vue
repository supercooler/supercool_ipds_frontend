<template>
  <div style="width:338px;margin:0 auto">
    <span>
      <h2 align="center">订单详情</h2>
    </span>
    <div>
      <status-bar class="statusBar"></status-bar>
      <div class="fetchCar">
        <el-form status-icon ref="ruleForm" label-width="100px">
          <el-form-item label="车牌号:">
            <el-tag>{{ parkingOrder.carLisenceNumber }}</el-tag>
          </el-form-item>
          <el-form-item label="停车场:">
            <el-tag v-if="parkingOrder.parkingLot !== null">{{
              parkingOrder.parkingLot.name
            }}</el-tag>
          </el-form-item>
          <el-form-item label="停车员:">
            <el-tag>{{ parkingOrder.parkingBoy.name }}</el-tag>
          </el-form-item>
          <el-form-item label="手机号码:">
            <el-tag>{{ parkingOrder.parkingBoy.phone }}</el-tag>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="parkingOrder.status === '已停车'"
              type="primary"
              @click="fetchCar"
              ref="fetchCarButton"
              :disabled="isFetchCarDisable"
              >取车</el-button
            >
            <el-button
              v-if="parkingOrder.status === '待确认'"
              type="primary"
              @click="finishOrder"
              ref="fetchCarButton"
              >确认订单</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import StatusBar from "@/components/mobile/StatusBar.vue";
import Constant from "@/common/constance.js";

export default {
  name: "ParkingOrderMobile",
  data() {
    return {
      parkingOrder: {
        carLisenceNumber: "",
        parkingLot: {},
        parkingBoy: {}
      },
      isFetchCarDisable: false
    };
  },
  components: {
    StatusBar
  },
  methods: {
    fetchCar() {
      this.isFetchCarDisable = true;
      this.$store.state.statusBarCount = 4;
      this.parkingOrder.status = Constant.IN_FETCHING_CAR;
      this.$store.dispatch("updateOrderStatus", this.parkingOrder);
      let boyName = this.parkingOrder.parkingBoy.name;
      this.$get("/sendOneWebSocket/" + boyName);
    },
    finishOrder() {
      this.$store.state.statusBarCount = 5;
      this.parkingOrder.status = Constant.FINISH_FETCHING;
      this.$store.dispatch("updateOrderStatus", this.parkingOrder);
      let boyName = this.parkingOrder.parkingBoy.name;
      this.$get("/sendOneWebSocket/" + boyName);
    },
    initStatus(status) {
      switch (status) {
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
    }
  },
  computed: {
    getParkingOrder() {
      return this.$store.state.response.data;
    }
  },
  mounted() {
    this.parkingOrder = this.$store.state.parkingOrder;
    this.initStatus(this.parkingOrder.status);
  },
  watch: {
    "$store.state.parkingOrder"(newValue) {
      this.parkingOrder = newValue;
      this.initStatus(newValue.status);
    }
  }
};
</script>

<style scoped>
.statusBar {
  margin-top: 10px;
  float: left;
}
.fetchCar {
  float: right;
}
</style>
