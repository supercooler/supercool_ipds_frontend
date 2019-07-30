<template>
  <div style="width:338px;margin:0 auto">
    <span>
      <h2 align="center">订单详情</h2>
    </span>
    <div>
      <status-bar class="statusBar"></status-bar>
      <div class="fetchCar">
        <el-form
          status-icon
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="车牌号:">
            <el-tag>{{ parkingOrder.carLisenceNumber }}</el-tag>
          </el-form-item>
          <el-form-item label="停车场:">
            <el-tag>{{ parkingOrder.parkingLot.name }}</el-tag>
          </el-form-item>
          <el-form-item label="停车员:">
            <el-tag>{{ parkingOrder.parkingBoy.name }}</el-tag>
          </el-form-item>
          <el-form-item label="手机号码:">
            <el-tag>{{ parkingOrder.parkingBoy.phone }}</el-tag>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="parkingOrder.status !== '已完成'"
              type="primary"
              @click="fetchCar"
              ref="fetchCarButton"
              :disabled="isFetchCarDisable"
              >取车</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import StatusBar from "@/components/mobile/StatusBar.vue";

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
  computed: {
    getParkingOrder() {
      return this.$store.state.response.data;
    }
  },
  components: {
    StatusBar
  },
  methods: {
    fetchCar() {
      this.isFetchCarDisable = true;
      this.$store.state.statusBarCount = 4;
      this.$store.dispatch("fetchCar");
    }
  },
  mounted() {
    this.parkingOrder = this.$store.state.parkingOrder;
    this.$store.state.parkingOrders.forEach(() => {});
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
