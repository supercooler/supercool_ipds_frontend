<template>
  <div id="update">
    <el-dialog
      title="修改"
      :visible.sync="$store.state.centerDialogVisible"
      width="30%"
      center
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="parkingBoyInfo"
        :rules="phoneRules"
        ref="modifyForm"
        :before-close="handleClose"
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
        <el-form-item label="手机:" prop="phone">
          <el-input v-model.number="parkingBoyInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-input v-model="parkingBoyInfo.status" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="标签:" prop="tag">
          <el-input v-model="parkingBoyInfo.tag"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="saveModifyForm('modifyForm')"
          >保 存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      var regex = new RegExp(/^[0-9]{11}$/);
      if (!regex.test(value)) {
        callback(new Error("请输入正确的手机号码！"));
      } else {
        callback();
      }
    };
    return {
      phoneRules: { phone: [{ validator: validatePhone, trigger: "blur" }] }
    };
  },
  computed: {
    parkingBoyInfo: function() {
      return this.$store.state.parkingBoyInfo;
    }
  },
  methods: {
    saveModifyForm: function(modifyForm) {
      this.$refs[modifyForm].validate(valid => {
        if (valid) {
          this.$store.state.centerDialogVisible = false;
          let model = this.$refs.modifyForm.model;
          let data = {
            age: model.age,
            gender: model.gender,
            id: model.id,
            name: model.name,
            phone: model.phone,
            status: model.status,
            workExperience: model.workExperience,
            tag: model.tag
          };
          this.$store.dispatch("updateParkingBoy", data);
          this.$message.success("保存成功");
        } else {
          this.$message.error("保存失败");
          return false;
        }
      });
    },
    handleClose: function() {
      this.$store.state.centerDialogVisible = false;
      this.$refs.modifyForm.resetFields();
    }
  }
};
</script>
