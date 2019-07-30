<template>
  <div>
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
            <el-tag>{{ parkingOrder.parkingLot }}</el-tag>
          </el-form-item>
          <el-form-item label="停车员:">
            <el-tag>{{ parkingOrder.parkingBoyName }}</el-tag>
          </el-form-item>
          <el-form-item label="手机号码:">
            <el-tag>{{ parkingOrder.parkingBoyPhone }}</el-tag>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="fetchCar"
              ref="fetchCarButton"
              :disabled="isfetchCarDisable"
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
        carLisenceNumber: "1234567",
        parkingLot: "黄某停车场",
        parkingBoyName: "黄章冠",
        parkingBoyPhone: "13800138000"
      },
      isfetchCarDisable: false
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
      this.isfetchCarDisable = true;
      this.$store.dispatch("fetchCar");
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
