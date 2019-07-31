<template>
  <div>
    <div style="text-align: center">
      <span><h2>预约停车</h2></span>
      <div>
        <el-form
          style="width: 255px;margin: 0 auto"
          :model="appointmentDto"
          ref="addForm"
          :rules="rules"
        >
          <el-form-item
            label="车牌："
            prop="plateNumber"
            validate-on-rule-change="true"
          >
            <el-input
              v-model="appointmentDto.plateNumber"
              autocomplete="off"
              maxlength="7"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="phone">
            <el-input
              v-model.number="appointmentDto.phone"
              autocomplete="off"
              maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item label="地址：" prop="address">
            <el-input
              v-model="appointmentDto.address"
              autocomplete="off"
              maxlength="100"
            ></el-input>
          </el-form-item>
          <el-form-item label="预约时间：" prop="bookTime">
            <el-date-picker
              v-model="appointmentDto.bookTime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <br /><br />
    </div>
    <el-button type="primary" @click="addParkingBoy('addForm')"
      >确定预约</el-button
    >
  </div>
</template>

<script>
import { Dialog } from "vant";

export default {
  name: "AppointmentInputBar",
  data() {
    return {
      appointmentDto: {
        plateNumber: "",
        phone: "",
        address: "",
        bookTime: "",
        user: {}
      },
      isCheck: true,
      inputStatus: { plateNumber: false, phone: false, address: false },
      errorMessage: { plateNumber: "", phone: "", address: "" },
      rules: {
        plateNumber: [
          { required: true, message: "请输入车牌号", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请填写电话号码", trigger: "blur" },
          { type: "number", message: "电话号码必须为数字" }
        ],
        address: [
          { required: true, message: "请填写停车场地址", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "停车场地址长度应在100以内",
            trigger: "blur"
          }
        ],
        bookTime: [
          { required: true, message: "请填写预约时间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addParkingBoy(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showDialog();
        }
      });
    },
    showDialog() {
      Dialog.confirm({
        title: "确认预约",
        message: "您确定要预约停车吗？"
      })
        .then(() => {
          this.$store.dispatch("createOrder", this.appointmentDto).then(() => {
            this.$emit("changActive", 1);
            this.appointmentDto = {};
          });
        })
        .catch(() => {
          this.$message("取消操作");
        });
    },
    confirmOrder() {
      this.$store.dispatch("createOrder", this.appointmentDto);
    },
    onClickLeft() {
      this.$alert("开始");
    },
    onClickRight() {
      this.$alert("结束");
    }
  },
  mounted() {
    this.appointmentDto.user = JSON.parse(localStorage.getItem("user"));
  }
};
</script>

<style scoped>
/*>>> el-form {*/
/*  width: 244px;*/
/*  margin: 0 auto;*/
/*}*/
>>> .element.style {
  width: 244px;
  margin: 0 auto;
}
>>> .el-input {
  width: 250px;
}
>>> .el-input__inner {
  width: 210px;
  margin-left: 8px;
}

>>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 210px;
}
</style>
