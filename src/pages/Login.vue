<template>
  <div id="main">
    <el-row id="login">
      <el-col :span="8" :offset="8">
        <div class="grid-content">
          <el-button circle class="login_button">登录</el-button>
          <LoginForm />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LoginForm from "../components/loginUser/LoginForm.vue";

export default {
  name: "login",
  components: {
    LoginForm
  }
};
</script>

<style scoped>
.login_button {
  width: 100px;
  height: 100px;
  background: #bfdfff;
  margin-bottom: 50px;
  margin-left: 100px;
  cursor: default;
  font-size: 20px;
  background: url("../assets/head.jpg");
}

.grid-content {
  text-align: center;
}

#main {
  background: url("../assets/background.jpg");
}
</style>
