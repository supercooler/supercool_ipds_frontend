<template>
  <div class="parkingLot">
    <el-button type="primary" class="addButton" @click="showAddDialog"
      >添加
    </el-button>
    <el-button
      type="primary"
      icon="el-icon-search"
      class="searchButton"
      @click="searchParkingLot"
      >搜索
    </el-button>
    <el-input
      class="searchBar"
      type="text"
      placeholder="请输入停车场名字"
      v-model="text"
      maxlength="15"
      show-word-limit
    >
    </el-input>
    <el-table
      :data="
        parkingLots.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      :default-sort = "{prop: 'capacity', order: 'descending'}"
      stripe
      style="text-align: center"
    >
      <el-table-column prop="name" label="名字"></el-table-column>
      <el-table-column prop="capacity" label="容量"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row.id)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="parkingLots.length"
    >
    </el-pagination>
    <AddParkingLotDialog
      :currentPage="currentPage"
      :pageSize="pageSize"
      ref="addParkingLotDialog"
    ></AddParkingLotDialog>
    <updateParkingLotForm ref="updateParkingLotForm"></updateParkingLotForm>
  </div>
</template>

<script>
import UpdateParkingLotForm from "../components/parkingLots/UpdateParkingLotForm.vue";
import AddParkingLotDialog from "../components/parkingLots/AddParkingLotDialog.vue";

export default {
  name: "parkingLot",
  components: {
    UpdateParkingLotForm,
    AddParkingLotDialog
  },
  props: {
    msg: String
  },
  data() {
    return {
      parkingLots: [],
      dialogFormVisible: false,
      text: "",
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    handleEdit(parkingLot) {
      this.$refs.updateParkingLotForm.showDialog(parkingLot);
    },
    handleDelete(id) {
      this.$confirm("您确定要删除吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$store.dispatch("deleteParkingLot", id);
        })
        .catch(() => {});
    },
    showAddDialog() {
      this.$refs.addParkingLotDialog.showDialog();
    },
    searchParkingLot() {
      if (this.text === '') {
        this.$store.dispatch('getParkingLots');
      }else {
        this.$store.dispatch('searchParkingLots', this.text)
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  mounted() {
    this.$store.dispatch("getParkingLots", {
      currentPage: this.currentPage - 1,
      pageSize: this.pageSize
    });
  },
  watch: {
    "$store.state.parkingLots"(newValue) {
      this.parkingLots = newValue;
    }
  }
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#table {
  margin: auto;
}

.hello {
  position: relative;
  width: 100%;
}

.button {
  width: 100%;
  margin: auto;
  margin-bottom: 5px;
  position: relative;
}

.addButton {
  float: left;
  left: 10px;
  margin-top: 10px;
}

.searchBar {
  float: right;
  margin-bottom: 10px;
  margin-right: 10px;
  width: 200px;
}

.demo-ruleForm {
  float: left;
  width: 142px;
}

.searchButton {
  float: left;
  margin-bottom: 6px;
}

.input {
  float: left;
  width: 100%;
}

.searchButton {
  margin-top: 10px;
  float: right;
}

.searchBar {
  margin-top: 10px;
  width: 200px;
  float: right;
}
</style>
