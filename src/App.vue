<template>
  <div id="app">
    <div id="nav">
      <!--    <Nav></Nav>-->
      <router-view />
    </div>
  </div>
  <!--  <el-container>-->
  <!--    <el-header>-->
  <!--      Header-->
  <!--    </el-header>-->
  <!--    <el-container>-->
  <!--      <el-aside width="200px">-->
  <!--        <Nav></Nav>-->
  <!--      </el-aside>-->
  <!--      <el-main>-->
  <!--        <router-view />-->
  <!--      </el-main>-->
  <!--    </el-container>-->
  <!--    <el-footer>@2019 SuperCool</el-footer>-->
  <!--  </el-container>-->
</template>
<script>
// import Nav from "@/components/Nav.vue";

export default {
  // mounted() {
  //   this.$get("/test").then(res => {
  //     console.log(res);
  //   });
  //   this.$post("/test?param=3").then(res => {
  //     console.log(res);
  //   });
  //   this.$delete("/test").then(res => {
  //     console.log(res);
  //   });
  //   this.$put("/test").then(res => {
  //     console.log(res);
  //   });
  // },
  components: {
    // Nav
  }
};
</script>

<style>
.el-header,
.el-footer {
  /* background-color: #B3C0D1; */
  /* color: #333; */
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /* background-color: #D3DCE6;
    color: #333; */
  text-align: center;
  line-height: 200px;
}

.el-main {
  /* background-color: #E9EEF3; */
  /* color: #333; */
  text-align: center;
  line-height: 160px;
  width: 100%;
  height: 850px;
}
</style>
