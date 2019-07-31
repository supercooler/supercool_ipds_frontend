<template>
  <div>
    <el-dialog
      title="管理停车场"
      :visible.sync="dialogFormVisible"
      width="800px"
    >
      <div class="dialog-body">
        <el-transfer
          filterable
          :titles="['未管理停车场', '已管理停车场']"
          v-model="parkingLotValue"
          :data="data"
        >
        </el-transfer>
      </div>
      <div class="dialog-footer" style="margin-top: 10px">
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
        <el-button @click="cancelEdit">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EditParkingLotDialog",
  data() {
    return {
      data: [],
      parkingLotValue: [],
      allParkingLots: [],
      parkingLots: [],
      dialogFormVisible: false,
      parkingBoy: {},
      managementParkingLot: []
    };
  },
  methods: {
    confirmEdit() {
      let resultParkingLot = [];
      this.parkingLotValue.forEach(item => {
        resultParkingLot.push(
          this.allParkingLots.filter(parkingLot => parkingLot.id == item)[0]
        );
      });
      this.parkingLotValue = [];
      this.data = [];
      this.parkingBoy.parkingLots = resultParkingLot;
      this.$store.dispatch("updateParkingBoy", this.parkingBoy);
    },
    cancelEdit() {
      this.parkingLotValue = [];
      this.data = [];
      this.dialogFormVisible = false;
    },
    showDialog() {
      this.dialogFormVisible = true;
    },
    initParkingLots(parkingBoy) {
      this.$get("/parking-lots").then(response1 => {
        this.$get("/parking-lots/management").then(response2 => {
          this.allParkingLots = response1.data;
          this.managementParkingLot = response2.data;
          this.parkingBoy = parkingBoy;
          this.parkingLots = parkingBoy.parkingLots;
          this.initValue();
          this.initData();
        });
      });
    },
    initData() {
      let data = [];
      let keyList = this.managementParkingLot.map(item => item.id);
      this.allParkingLots.forEach(item => {
        if (
          keyList.includes(item.id) &&
          !this.parkingLotValue.includes(item.id)
        ) {
          data.push({ key: item.id, label: item.name, disabled: true });
        } else {
          data.push({ key: item.id, label: item.name, disabled: false });
        }
      });
      this.data = data;
    },
    initValue() {
      if (this.parkingLots.length !== 0) {
        this.parkingLotValue = this.parkingLots.map(item => item.id);
      }
    }
  },
  destroyed() {
    this.parkingLotValue = [];
    this.data = [];
  }
};
</script>

<style scoped>
>>> .el-transfer-panel__item.el-checkbox .el-checkbox__label {
  display: inline-block;
}
</style>
