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
      console.log(row);
    }
  },
  mounted() {
    let userId = JSON.parse(localStorage.getItem("user")).id;
    this.$store.dispatch("getParkingByUserId", userId);
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
