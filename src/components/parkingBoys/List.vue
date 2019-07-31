<template>
  <div id="list">
    <el-table
      :data="$store.state.parkingBoys"
      style="width: 100%"
      border
      :default-sort="{ prop: 'age', order: 'ascending' }"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <div
            style="float: left; margin-right:20px; margin-left: 20px;margin-top: 10px"
            v-for="(parkingLot, index) in props.row.parkingLots"
            :key="index"
          >
            <span>{{ parkingLot.name }}</span>
          </div>
          <div>
            <el-button type="primary" @click="openEditDialog(props.row)"
              >管理停车场</el-button
            >
          </div>
        </template>
      </el-table-column>
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

      <el-table-column prop="tag" label="标签" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.tag }}</el-tag>
        </template>
      </el-table-column>

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
    <EditParkingLotDialog ref="editParkingLotDialog"></EditParkingLotDialog>
  </div>
</template>
<script>
import EditParkingLotDialog from "@/components/parkingBoys/EditParkingLotDialog.vue";
export default {
  components: {
    EditParkingLotDialog
  },
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
    },
    openEditDialog(parkingBoy) {
      this.$refs.editParkingLotDialog.initParkingLots(parkingBoy);
      this.$refs.editParkingLotDialog.showDialog();
    }
  }
};
</script>
<style scoped></style>
