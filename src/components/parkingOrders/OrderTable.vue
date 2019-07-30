<template>
  <div>
    <el-table :data="$store.state.parkingOrders" style="width: 100%" border>
      <el-table-column align="center" prop="id" label="id"></el-table-column>
      <el-table-column
        align="center"
        prop="state"
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
        label="停车场地点"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="score"
        label="停车收费"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="parking_boy_id"
        label="停车员编号"
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
  </div>
</template>
<script>
export default {
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
    }
  }
};
</script>
