<template>
  <div>
    <div align="left" style="float:left;">
      <el-button type="danger" icon="el-icon-minus" @click="delOrders"
        >批量删除</el-button
      >
    </div>
    <div align="right" @keydown.enter="submitForm('user')" style="float:right;">
      <el-row>
        <div width="180" style="display:inline-block">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="id">
              <el-input
                v-model="ruleForm.id"
                placeholder="请输入订单编号"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="submitForm('user')"
          >查询</el-button
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: ""
      },
      rules: {
        id: [{ required: true, message: "请输入订单编号", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message.success("成功");
        } else {
          this.$message.error("错误");
          return false;
        }
      });
    },
    delOrders() {
      this.$message.success("删除成功");
    }
  },
  mounted() {
    this.$store.dispatch("getParkingOrders");
  }
};
</script>
