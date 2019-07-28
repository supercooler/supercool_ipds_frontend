<template>
 <el-form :model="addForm" ref="addForm" :rules="rules">
 <el-form-item label="修改后的名字：" prop="name" validate-on-rule-change='true'>
 <el-input v-model="addForm.name" autocomplete="off" maxlength=15 placeholder="长度应在1-15个字符"></el-input>
 </el-form-item>
 <el-form-item label="修改后的容量：" prop="capacity">
 <el-input v-model="addForm.capacity" autocomplete="off" maxlength=3 placeholder="容量应在1-999之间"></el-input>
 </el-form-item>
 <el-form-item>
 
 <el-button type="primary" @click="updateParkingLot">确定</el-button>
 <el-button @click="cancelForm">取消</el-button>
 </el-form-item>
 </el-form>
</template>
 
<script>
const axios = require('axios');
 
 export default {
 data() {
 return {
 addForm:{
 name:'',
 capacity:''
 },
 rules: {
 name: [
 { required: true, message: '请填写修改后的停车场名字', trigger: 'blur' },
 { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
 ],
 capacity: [
 { required: true, message: '请填写修改后的停车场容量', trigger: 'blur' },
 { min: 1, max: 999, message: '容量在0-999之间', trigger: 'blur' }
 ]
 }
 }
 },
 methods:{
      showUpdateDate(){
      this.$get("/parking-lots").then(res=>{
      console.log("show update parkingLot");
      this.$store.state.tableData=res.data;
      this.$store.state.redundantTableData=res.data;
      this.$store.commit('sortTable')
    })
      },
 updateParkingLot(){
    this.$emit('childTrigger')
    this.addForm.id=this.$store.state.currentRow.id
    this.addForm.address=this.$store.state.currentRow.address
    this.$put("/parking-lots",this.addForm).then(res => {
       console.log("update parkingLot");
    });
    this.$store.commit('updateParkingLot',this.addForm)
    this.showUpdateDate()
 },
 cancelForm(formName){
     this.$emit('childTrigger')
 }
 }
}
</script>
 
<style>
.el-radio{
 margin: left;
}
</style>