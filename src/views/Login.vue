<template>
  <el-row id="login">
    <el-col :span="8" :offset="8">
      <div class="grid-content">
        <el-button circle class="login_button">登录</el-button>
        <LoginForm />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import LoginForm from "../components/LoginForm";
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
}
</style>
