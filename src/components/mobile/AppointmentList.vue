<template>
  <div>
    <van-list finished-text="没有更多了">
      <van-cell
        v-for="item in parkingOrderList"
        :key="item"
        :title="item"
      ></van-cell>
    </van-list>
  </div>
</template>
<script>
export default {
  name: "AppointmentList",
  data() {
    return {
      parkingOrderList: [],
      loading: false,
      finished: false
    };
  },
  methods: {},
  mounted() {
    this.$store.dispatch("getParkingOrderList");
    this.parkingOrderList = this.$store.state.response.data;
  }
};
</script>

<style scoped></style>
