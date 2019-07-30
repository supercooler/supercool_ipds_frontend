<template>
  <div style="text-align: center;margin-top: 100px">
    <el-card class="box-card">
      <div class="block">
        <el-avatar :size="80" :src="circleUrl"></el-avatar>
      </div>
      <br />
      <div style="text-align: center">
        <el-form
          :model="user"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input
              type="text"
              v-model="user.userName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="user.password"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @keydown.enter="submitForm('loginForm')"
              @click="submitForm('loginForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import Constant from "@/common/constance.js";
export default {
  name: "CustomerLoginMobile",
  data() {
    return {
      circleUrl: ".././assets/head.jpg",
      user: {
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
          this.$store.dispatch("loginUser", this.user);
        } else {
          this.$message.error("错了哦，这是一条错误消息");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    locationHomePage(role) {
      switch (role) {
        case Constant.ROLE_USER_CUSTOMER:
          this.$router.push("/customer-mobile");
          break;
        case Constant.ROLE_USER_PARKING_BOY:
          this.$router.push("/parking-boy-mobile");
          break;
      }
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
>>> .el-card {
  height: 500px;
}
>>> .element.style {
  width: 313px;
  padding-right: 70px;
}
</style>
