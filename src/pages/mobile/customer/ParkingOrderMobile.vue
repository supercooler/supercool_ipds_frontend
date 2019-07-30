<template>
  <div>
    <span><h2>我的订单</h2></span>
    <div>
      <van-panel title="停车订单">
        <div>
          <p>订单号：{{ getParkingOrder.id }}</p>
          <p>预约时间： {{ getParkingOrder.bookTime }}</p>
          <p>停车员： {{ getParkingOrder.parkingBoy.name }}</p>
          <p>状态：{{ getParkingOrder.status }}</p>
        </div>
        <!--        <div slot="footer">-->
        <!--          <van-button size="small" type="danger">按钮</van-button>-->
        <!--        </div>-->
      </van-panel>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParkingOrderMobile",
  data() {
    return {
      parkingOrder: {}
    };
  },
  computed: {
    getParkingOrder() {
      return this.$store.state.response.data;
    }
  }
  // mounted() {
  //   this.parkingOrder = localStorage.getItem("responseData");
  // },
  // watch: {
  //   "$store.state.response"(newValue) {
  //     this.parkingOrder = newValue.data;
  //   }
  // }
};
</script>

<style scoped></style>
