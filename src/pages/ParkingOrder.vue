<template>
  <div>
    <HandleBar />
    <OrderTable />
  </div>
</template>

<script>
import HandleBar from "../components/parkingOrders/HandleBar.vue";
import OrderTable from "../components/parkingOrders/OrderTable.vue";
export default {
  components: {
    HandleBar,
    OrderTable
  }
};
</script>
<style scoped></style>
