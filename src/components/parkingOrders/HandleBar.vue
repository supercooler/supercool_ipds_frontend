<template>
  <div align="right" @keydown.enter="submitForm('ruleForm')">
    <el-row>
      <div width="180" style="display:inline-block">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="id">
            <el-input
              v-model="ruleForm.id"
              placeholder="请输入订单编号"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="submitForm('ruleForm')"
        >查询</el-button
      >
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        id: ""
      },
      rules: {
        id: [{ required: true, message: "请输入订单编号", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message.success("成功");
        } else {
          this.$message.error("错误");
          return false;
        }
      });
    }
  }
};
</script>
