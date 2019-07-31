<template>
  <div style="text-align: center">
    <span>
      <h2>我接手的取车订单</h2>
    </span>
    <el-table :data="fetchCarOrders" stripe>
      <el-table-column prop="id" label="订单号"></el-table-column>
      <el-table-column
        prop="parkingLot.name"
        label="所停停车场"
      ></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag @click="getFetchCarOrderItemDetail(scope.row)">
            <el-badge :value="1" v-if="scope.row.status === '已停车'">{{
              scope.row.status
            }}</el-badge>
            <template v-else>{{ scope.row.status }}</template>
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// import { clearInterval, setInterval } from "timers";
export default {
  name: "AppointmentList",
  data() {
    return {
      fetchCarOrders: []
    };
  },
  methods: {
    getFetchCarOrderItemDetail: function(row) {
      this.$router.push({
        path: `/parking-boy-mobile/appointment-fetch-car-detail/${row.id}/${
          row.status
        }`
      });
    },
    getParkingOrdersByTimer() {
      let parkingBoyName = JSON.parse(localStorage.getItem("user")).userName;
      this.$get(`/parking-orders/fetch?parkingBoyName=${parkingBoyName}`).then(
        res => {
          this.fetchCarOrders = res.data;
        }
      );
    }
  },
  mounted() {
    // if (this.timer) {
    //   clearInterval(this.timer);
    // } else {
    //   this.timer = setInterval(() => {
    //     this.getParkingOrdersByTimer();
    //   }, 100);
    // }
    this.getParkingOrdersByTimer();
  }
};
</script>

<style scoped>
>>> .el-table .cell {
  text-align: center;
}
>>> .el-badge__content.is-fixed {
  top: 7px;
  right: -2px;
}
</style>
