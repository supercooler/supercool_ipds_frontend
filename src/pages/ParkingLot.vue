<template>
  <div class="parkingLot">
    <el-button type="primary" class="addButton" v-model="input3">添加</el-button>
    <el-button type="primary" icon="el-icon-search" class="searchButton" @click="searchData">搜索</el-button>
    <el-input
    class="searchbar"
      type="text"
      placeholder="请输入内容"
      v-model="text"
      maxlength="15"
      show-word-limit
    >
    </el-input>
    <el-table id="table" border="true" :data="this.$store.state.tableData" style="width: 100%">
      <el-table-column label="名字" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大小" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.capacity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">
            <i class="el-icon-edit"></i>修改
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
            <i class="el-icon-delete"></i>删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "parkingLot",
  props: {
    msg: String
  },
  data() {
    return {
      input3: "",
      text: ""
    };
  },
   methods:{
    searchData(){
      this.$get("/parking-lots").then(res=>{
      console.log("ParkingLot1");
      this.$store.state.tableData=res.data;
      this.$store.state.redundantTableData=res.data;
      this.$store.commit('searchDataByName',this.text);
    })
    }
  },
  created(){
    this.$get("/parking-lots").then(res=>{
      console.log("ParkingLot");
      this.$store.state.tableData=res.data;
      this.$store.state.redundantTableData=res.data;
      this.$store.commit('sortTable');
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.hello{
  position: relative;
  width:100%;
}
.button {
  width: 100%;
  margin: auto;
  margin-bottom: 5px;
  position: relative;
}
.addButton{
  float:left;
  left:10px;
  margin-top:10px;
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
.searchButton{
  margin-top:10px;
   float:right;
}
.searchbar{
  margin-top:10px;
  width:200px;
  float:right;
}
</style>
