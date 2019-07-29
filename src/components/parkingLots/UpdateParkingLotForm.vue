<template>
  <el-dialog title="修改停车场" :visible.sync="dialogFormVisible" width="400px">
    <el-form :model="parkingLot" ref="updateForm" :rules="rules">
      <el-form-item
        label="修改后的名字："
        prop="name"
        validate-on-rule-change="true"
      >
        <el-input
          v-model="parkingLot.name"
          autocomplete="off"
          maxlength="15"
          placeholder="长度应在1-15个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="修改后的容量：" prop="capacity">
        <el-input
          v-model="parkingLot.capacity"
          autocomplete="off"
          maxlength="3"
          placeholder="容量应在1-999之间"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateParkingLot()">确定</el-button>
        <el-button @click="cancelForm('updateForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "UpdateParkingLotForm",
  data() {
    return {
      dialogFormVisible: false,
      parkingLot: {
        id: "",
        name: "",
        capacity: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请填写修改后的停车场名字",
            trigger: "blur"
          },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        capacity: [
          {
            required: true,
            message: "请填写修改后的停车场容量",
            trigger: "blur"
          },
          {
            type: "number",
            message: "停车场容量必须为数字",
            trigger: "blur"
          },
          { min: 1, max: 999, message: "容量在0-999之间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    showDialog(parkingLot) {
      this.dialogFormVisible = true;
      this.parkingLot = parkingLot;
    },
    cancelForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    async updateParkingLot() {
      this.$store.dispatch("updateParkingLot", this.parkingLot).then(() => {
        location.reload();
      });
      this.dialogFormVisible = false;
    }
  }
};
</script>
