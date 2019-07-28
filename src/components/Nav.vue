<template>
  <el-row class="tac">
    <el-col :span="3">
      <el-menu
        default-active="3"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <i class="el-icon-edit"></i>
          <span slot="title">员工管理</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-edit"></i>
          <span slot="title" @click="relocation('/parkingLot')"
            >停车场管理</span
          >
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-edit"></i>
          <span slot="title" @click="relocation('/parking-boy')"
            >停车员管理</span
          >
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-edit"></i>
          <span slot="title">停车场Dashboard</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-edit"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    relocation(val) {
      this.$router.push(val);
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
