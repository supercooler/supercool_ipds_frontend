<template>
  <div id="list">
    <el-table
      :data="$store.getters.doneParkingBoys"
      style="width: 100%"
      border
      :default-sort="{ prop: 'age', order: 'ascending' }"
    >
      <el-table-column align="center" prop="id" label="id"></el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="姓名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="age"
        label="年龄"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        prop="gender"
        label="性别"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        prop="workExperience"
        label="工作年限"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="phone"
        label="手机号码"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="status"
        label="状态"
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
              type="primary"
              icon="el-icon-edit"
              @click="$store.commit('showModifyForm', scope.row)"
              >修改</el-button
            >
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
  mounted() {
    this.$store.dispatch("getParkingBoysFromBackend");
  },
  methods: {
    deleteRow: function(row) {
      this.$confirm("确定删除该停车员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("deleteParkingBoy", row.id);
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
