<template>
  <div id="LoginForm" @keydown.enter="submitForm('ruleForm')">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input
          type="text"
          v-model="ruleForm.userName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      ruleForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let user = {
            userName: this.$refs[formName].model.userName,
            password: this.$refs[formName].model.password
          };
          this.$store.dispatch("loginUser", user);
        } else {
          this.$message.error("错了哦，这是一条错误消息");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
