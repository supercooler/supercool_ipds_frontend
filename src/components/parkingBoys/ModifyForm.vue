<template>
  <div id="update">
    <el-dialog
      title="修改"
      :visible.sync="$store.getters.doneCenterDialogVisible"
      width="30%"
      center
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="parkingBoyInfo"
      >
        <el-form-item label="id:">
          <el-input v-model="parkingBoyInfo.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input v-model="parkingBoyInfo.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="年龄:">
          <el-input v-model="parkingBoyInfo.age" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-input v-model="parkingBoyInfo.gender" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="工作年限:">
          <el-input
            v-model="parkingBoyInfo.workExperience"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机:">
          <el-input v-model.number="parkingBoyInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-input v-model="parkingBoyInfo.status" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$store.state.centerDialogVisible = false"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="$store.state.centerDialogVisible = false"
          >保 存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  computed: {
    parkingBoyInfo: function() {
      return this.$store.getters.doneParkingBoyInfo;
    }
  }
};
</script>
