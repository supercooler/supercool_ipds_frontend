<template>
  <div style="text-align: center">
    <span><h2>我的订单</h2></span>
    <el-table
      :data="parkingOrderList"
      :default-sort="{ prop: 'bookTime', order: 'descending' }"
      @row-click="showOrder"
      stripe
    >
      <el-table-column prop="id" label="订单号"></el-table-column>
      <el-table-column prop="bookTime" label="预定时间"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope"
          ><el-tag>{{ scope.row.status }}</el-tag></template
        ></el-table-column
      >
    </el-table>
  </div>
</template>
<script>
import { clearInterval, setInterval } from "timers";
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
    }
  },
  mounted() {
    let userId = JSON.parse(localStorage.getItem("user")).id;
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.$store.dispatch("getParkingByUserId", userId);
      }, 100);
    }
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
