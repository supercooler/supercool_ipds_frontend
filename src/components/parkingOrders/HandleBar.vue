<template>
  <div
    id="order_form"
    align="right"
    @keydown.enter="submitForm('ruleForm')"
    style="float:right;"
  >
    <el-row>
      <el-select v-model="type" placeholder="请选择类型" @change="changeType">
        <el-option
          v-for="item in types"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="status" placeholder="请选择类型" v-show="statusShow">
        <el-option
          v-for="item in statuses"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
      <div width="180" style="display:inline-block">
        <el-form :rules="rules" :model="inputBoy" @submit.native.prevent>
          <el-form-item prop="name">
            <el-input
              placeholder="请输入名字"
              prefix-icon="el-icon-search"
              v-model="inputBoy.name"
              v-show="boyShow"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div width="180" style="display:inline-block">
        <el-form :rules="rules" :model="inputLot" @submit.native.prevent>
          <el-form-item prop="name">
            <el-input
              placeholder="请输入名字"
              prefix-icon="el-icon-search"
              v-model="inputLot.name"
              v-show="lotShow"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="searchParkingOrders"
        >搜索</el-button
      >
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    var validateInputId = (rule, value, callback) => {
      if (!value == Number) {
        callback(new Error("请输入数字!"));
      }
    };
    return {
      type: "status",
      types: [
        {
          value: "status",
          label: "状态"
        },
        {
          value: "boy",
          label: "停车员姓名"
        },
        {
          value: "lot",
          label: "停车场名称"
        }
      ],
      statusShow: true,
      boyShow: false,
      lotShow: false,
      status: "已下单",
      statuses: [
        {
          value: "已下单",
          label: "已下单"
        },
        {
          value: "已配单",
          label: "已配单"
        },
        {
          value: "已停车",
          label: "已停车"
        },
        {
          value: "取车中",
          label: "取车中"
        },
        {
          value: "待确认",
          label: "待确认"
        },
        {
          value: "已完成",
          label: "已完成"
        }
      ],
      rules: {
        id: [{ validator: validateInputId, trigger: "blur" }]
      },
      inputBoy: {
        name: ""
      },
      inputLot: {
        name: ""
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
    },
    changeType() {
      switch (this.type) {
        case "status":
          this.statusShow = true;
          this.boyShow = false;
          this.lotShow = false;
          break;
        case "boy":
          this.statusShow = false;
          this.boyShow = true;
          this.lotShow = false;
          break;
        case "lot":
          this.statusShow = false;
          this.boyShow = false;
          this.lotShow = true;
          break;
      }
    },
    searchParkingOrders() {
      if (this.statusShow) {
        this.$store.dispatch("searchParkingOrders", "?status=" + this.status);
      } else if (this.boyShow) {
        this.$store.dispatch(
          "searchParkingOrders",
          "?boy=" + this.inputBoy.name
        );
      } else if (this.lotShow) {
        this.$store.dispatch(
          "searchParkingOrders",
          "?lot=" + this.inputLot.name
        );
      }
    }
  },
  mounted() {
    this.$store.dispatch("getParkingOrders");
  }
};
</script>
<style scoped>
#order_form {
  margin-bottom: 30px;
}
</style>
