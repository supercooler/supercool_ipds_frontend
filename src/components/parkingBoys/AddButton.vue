<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="addParkingBoy"
      >添加</el-button
    >
    <add-parking-boy-dialog></add-parking-boy-dialog>
  </div>
</template>
<script>
import AddParkingBoyDialog from "./AddParkingBoyDialog.vue";
export default {
  methods: {
    addParkingBoy: function() {
      this.$store.state.dialogFormVisible = true;
    }
  },
  components: {
    AddParkingBoyDialog
  }
};
</script>
