<template>
  <el-row class="tac">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      text-color="black"
      active-text-color="#409EFF"
    >
      <el-menu-item index="1" @click="locationView(1)">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>员工管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="2" @click="locationView(2)">
        <i class="el-icon-menu"></i>
        <span slot="title">停车场管理</span>
      </el-menu-item>
      <el-menu-item index="3" @click="locationView(3)">
        <i class="el-icon-setting"></i>
        <span slot="title">停车场 Dash Board</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  name: "Nav",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    relocation(val) {
      this.$router.push(val);
    },
    locationView(index) {
      switch (index) {
        case 1:
          this.$router.push("/home");
          break;
        case 2:
          this.$router.push("/home/parking-lot");
          break;
        case 3:
      }
    }
  }
};
</script>

<style>
.el-menu-item,
.el-submenu__title {
  text-align: left;
}
</style>
