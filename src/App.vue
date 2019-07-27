<template>
  <div id="app">
    <div id="nav">
      <router-link to="/parking-boy">ParkingBoy</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    this.$get("/test").then(res => {
      console.log(res);
    });
    this.$post("/test?param=3").then(res => {
      console.log(res);
    });
    this.$delete("/test").then(res => {
      console.log(res);
    });
    this.$put("/test").then(res => {
      console.log(res);
    });
  }
};
</script>

<style></style>
