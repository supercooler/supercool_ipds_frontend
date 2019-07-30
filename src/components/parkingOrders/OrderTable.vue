<template>
  <div>
    <el-table
      :data="
        $store.state.parkingOrders.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )
      "
      style="width: 100%"
      border
    >
      <el-table-column align="center" prop="id" label="id"></el-table-column>
      <el-table-column
        align="center"
        prop="status"
        label="订单状态"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="carLisenceNumber"
        label="车牌号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="userPhone"
        label="用户联系电话"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="preLocation"
        label="预约地点"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="score"
        label="停车收费"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="parkingBoy.name"
        label="停车员姓名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="parkingLot.name"
        label="停车场名称"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="operation"
        label="操作"
        width="300px"
      >
        <template slot-scope="scope">
          <el-row>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteRow(scope.row)"
              >删除</el-button
            >
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="$store.state.parkingOrders.length"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    deleteRow: function(row) {
      this.$confirm("确定删除该订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("deleteParkingOrder", row.id);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  mounted() {
    this.$store.dispatch("getParkingOrders");
  }
};
</script>
