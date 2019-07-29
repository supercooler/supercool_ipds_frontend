<template>
  <el-container>
    <el-header
      ><span><strong>智能派单停车系统</strong></span>
      <span style="margin-left: 1400px">Hello, {{ userName }}</span>
    </el-header>
    <el-container>
      <el-aside>
        <Nav></Nav>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>super cool</el-footer>
  </el-container>
</template>

<script>
import Nav from "../components/Nav.vue";

export default {
  name: "Home",
  components: { Nav },
  data() {
    return {
      userName: ""
    };
  },
  mounted() {
    this.userName = localStorage.getItem("userName");
  }
};
</script>

<style scoped>
>>> .el-header {
  height: 30px;
  width: 100%;
  background-color: rgba(30, 44, 76, 0.93);
  color: white;
  text-align: left;
}

>>> .el-footer {
  width: 100%;
  background-color: rgba(30, 44, 76, 0.93);
  color: white;
}

>>> .el-aside {
  overflow: auto;
  border: 1px solid rgba(19, 20, 15, 0.04);
}

>>> element.style {
  background-color: rgba(214, 214, 214, 0.02);
}
</style>
