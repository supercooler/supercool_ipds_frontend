<template>
  <div style="text-align: center">
    <el-card class="box-card">
      <div class="block">
        <el-avatar :size="50" :src="circleUrl"></el-avatar>
      </div>
      <div class="text item">
        <span>姓名：{{ user.userName }}</span>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="text item">
        <el-button type="danger" plain @click="logout">登出系统</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserInformationMobile",
  data() {
    return {
      user: {},
      circleUrl: require("@/assets/head.jpg")
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    logout() {
      localStorage.setItem("user", JSON.stringify(""));
      this.$router.push("/customer-login-mobile");
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
</style>
