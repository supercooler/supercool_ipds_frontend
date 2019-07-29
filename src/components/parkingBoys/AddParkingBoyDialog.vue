<template>
  <div>
    <el-dialog
      title="添加停车员"
      :visible.sync="$store.state.dialogFormVisible"
      width="400px"
    >
      <el-form :model="addForm" ref="addForm" :rules="rules">
        <el-form-item label="姓名：" prop="name">
          <el-input
            v-model="addForm.name"
            autocomplete="off"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input
            v-model.number="addForm.age"
            autocomplete="off"
            maxlength="2"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="gender">
          <el-radio-group v-model="addForm.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工作年限：" prop="workExperience">
          <el-input
            v-model.number="addForm.workExperience"
            autocomplete="off"
            maxlength="2"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-input
            v-model.number="addForm.phone"
            autocomplete="off"
            maxlength="11"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="addParkingBoy('addForm')"
          >确 定</el-button
        >
        <el-button @click="cancelForm('addForm')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      var regex = new RegExp(/^[0-9]{11}$/);
      if (!regex.test(value)) {
        callback(new Error("请输入正确的手机号码！"));
      } else {
        callback();
      }
    };
    var validateNumber = (rule, value, callback) => {
      var regex = new RegExp(/^[0-9]{2}$/);
      if (!regex.test(value)) {
        callback(new Error("请输入正确的年龄！"));
      } else {
        callback();
      }
    };
    return {
      addForm: {},
      rules: {
        name: [
          { required: true, message: "请输入停车员名称", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        age: [{ required: true, trigger: "blur", validator: validateNumber }],
        workExperience: [
          { required: true, trigger: "blur", validator: validateNumber }
        ],
        phone: [{ validator: validatePhone, trigger: "blur", required: true }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }]
      }
    };
  },
  methods: {
    addParkingBoy: function(formName) {
      console.log(this.addForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let model = this.$refs[formName].model;
          let data = {
            age: model.age,
            gender: model.gender,
            name: model.name,
            phone: model.phone,
            workExperience: model.workExperience
          };
          this.$store.dispatch("addParkingBoy", data);
          this.$store.state.dialogFormVisible = false;
        } else {
          this.$message.error("添加失败！");
        }
      });
    },
    cancelForm(formName) {
      this.$store.state.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style></style>
