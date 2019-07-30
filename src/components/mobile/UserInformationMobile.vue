<template>
  <div style="text-align: center">
    <el-card class="box-card">
      <div class="block">
        <el-avatar :size="50" :src="circleUrl"></el-avatar>
      </div>
      <div class="text item"><span>姓名：</span></div>
      <div class="text item"><span>联系方式：</span></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserInformationMobile",
  data() {
    return {
      circleUrl: "../../assets/head.jpg"
    };
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
