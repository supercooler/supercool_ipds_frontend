<template>
  <div style="text-align: center">
    <span><h2>我的订单</h2></span>
    <el-table
      :data="parkingOrderList"
      :default-sort="{ prop: 'bookTime', order: 'descending' }"
      stripe
    >
      <el-table-column prop="id" label="订单号"></el-table-column>
      <el-table-column prop="bookTime" label="预定时间"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
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
  methods: {},
  mounted() {
    this.$store.dispatch("getParkingOrders");
    this.parkingOrderList = this.$store.state.response.data;
  }
};
</script>

<style scoped>
>>> .el-table th {
  text-align: center;
}
</style>
