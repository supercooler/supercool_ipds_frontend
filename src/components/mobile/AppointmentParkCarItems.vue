<template>
  <div style="text-align: center">
    <span>
      <h2>我的待停车订单</h2>
    </span>
    <el-table :data="parkCarOrders" stripe>
      <el-table-column prop="id" label="订单号"></el-table-column>
      <el-table-column prop="bookTime" label="预约时间"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag @click="getParkCarOrderItemDetail(scope.row)">
            <el-badge :value="1">{{scope.row.status}}</el-badge>
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { clearInterval, setInterval } from "timers";
export default {
  name: "AppointmentList",
  data() {
    return {
      parkCarOrders: [
        {
          id: "1",
          bookTime: "2019-10-10",
          status: "已下单"
        }
      ]
    };
  },
  methods: {
    getParkCarOrderItemDetail: function(row) {
      this.$router.push({
        path: `/parking-boy-mobile/appointment-park-car-detail/${row.id}/${row.status}`
      });
    },
    getParkingOrdersByTimer() {
      let parkingBoyName = JSON.parse(localStorage.getItem("user")).userName;
      this.$get(`/parking-orders/park?parkingBoyName=${parkingBoyName}`).then(
        res => {
          this.parkCarOrders = res.data;
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
