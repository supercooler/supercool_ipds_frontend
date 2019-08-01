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
            <el-tag v-if="parkingOrder.parkingLot !== null">{{ parkingOrder.parkingLot.name }}</el-tag>
          </el-form-item>
          <el-form-item label="停车员:">
            <el-tag v-if="parkingOrder.parkingBoy !== null">
              {{
              parkingOrder.parkingBoy.name
              }}
            </el-tag>
          </el-form-item>
          <el-form-item label="手机号码:">
            <el-tag v-if="parkingOrder.parkingBoy !== null">
              {{
              parkingOrder.parkingBoy.phone
              }}
            </el-tag>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="parkingOrder.status === '已停车'"
              type="primary"
              @click="fetchCar"
              ref="fetchCarButton"
              :disabled="isFetchCarDisable"
            >取车</el-button>
            <el-button
              v-if="parkingOrder.status === '待确认'"
              type="primary"
              @click="openRateDialog"
            >确认订单</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-dialog title="提示" :visible.sync="show" :before-close="handleClose">
        <el-rate v-model="rate" show-text allow-half></el-rate>
        <span slot="footer" class="dialog-footer">
          <el-button @click="finishOrder">取 消</el-button>
          <el-button type="primary" @click="finishOrder">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import StatusBar from "@/components/mobile/StatusBar.vue";
import Constant from "@/common/constance.js";
import { VanDialog } from "vant";

export default {
  name: "ParkingOrderMobile",
  data() {
    return {
      parkingOrder: {
        carLisenceNumber: "",
        parkingLot: {},
        parkingBoy: {},
        score: 5.0
      },
      isFetchCarDisable: false,
      show: false,
      rate: 5.0
    };
  },
  components: {
    StatusBar,
    VanDialog
  },
  methods: {
    openRateDialog() {
      this.show = true;
    },
    handleClose() {
      this.show = false;
    },
    fetchCar() {
      this.isFetchCarDisable = true;
      this.$store.state.statusBarCount = 4;
      this.parkingOrder.status = Constant.IN_FETCHING_CAR;
      this.$store.dispatch("updateOrderStatus", this.parkingOrder);
      let boyName = this.parkingOrder.parkingBoy.name;
      this.$get("/sendOneWebSocket/" + boyName);
    },
    async finishOrder() {
      this.$store.state.statusBarCount = 5;
      this.parkingOrder.status = Constant.FINISH_FETCHING;
      this.parkingOrder.score = this.rate;
      await this.updateOrder();
      let boyName = this.parkingOrder.parkingBoy.name;
      this.$get("/sendOneWebSocket/" + boyName);
      this.show = false;
    },
    updateOrder() {
      this.$store.dispatch("updateOrderStatus", this.parkingOrder);
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
