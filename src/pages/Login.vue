<template>
  <div id="main">
    <el-row id="login">
      <h1 align="center">智能派单停车系统</h1>
      <el-col :span="8" :offset="8">
        <div class="grid-content">
          <el-button circle class="login_button"></el-button>
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
  background-position: center;
  background-size: 180% 180%;
}

.grid-content {
  text-align: center;
}

#main {
  background: url("../assets/background.jpg");
}

#login h1 {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: white;
  margin-left: 100px;
}
</style>
