<template>
  <div>
    <el-dialog
      title="添加停车场"
      :visible.sync="dialogFormVisible"
      width="400px"
    >
      <el-form :model="parkingLot" ref="addForm" :rules="rules">
        <el-form-item label="名字：" prop="name" validate-on-rule-change="true">
          <el-input
            v-model="parkingLot.name"
            autocomplete="off"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="容量：" prop="capacity">
          <el-input
            v-model.number="parkingLot.capacity"
            autocomplete="off"
            maxlength="3"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input
            v-model="parkingLot.address"
            autocomplete="off"
            maxlength="299"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addParkingLot('addForm')" +
            >确定
          </el-button>
          <el-button @click="cancelForm('addForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "AddParkingLotDialog",
  props: ["currentPage", "pageSize"],
  data() {
    return {
      dialogFormVisible: false,
      parkingLot: {
        name: "",
        capacity: "",
        address: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入停车场名称", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        capacity: [
          { required: true, message: "请填写停车场容量", trigger: "blur" },
          { type: "number", message: "停车场容量必须为数字" }
        ],
        address: [
          { required: true, message: "请填写停车场地址", trigger: "blur" },
          {
            min: 1,
            max: 300,
            message: "停车场地址长度应在300以内",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    addParkingLot(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createParkingLot(formName);
        }
      });
    },
    async createParkingLot(formName) {
      this.$store.dispatch("createParkingLot", {
        name: this.parkingLot.name,
        capacity: this.parkingLot.capacity,
        address: this.parkingLot.address
      });
      await this.getParkingLots();
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    async getParkingLots() {
      this.$store.dispatch("getParkingLots", {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
    },
    cancelForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    showDialog() {
      this.dialogFormVisible = true;
    }
  }
};
</script>
