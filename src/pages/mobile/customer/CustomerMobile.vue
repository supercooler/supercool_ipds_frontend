<template>
  <div class="" style="text-align: center">
    <nav-bar title="智能派单停车系统" left-arrow class="nav-bar"></nav-bar>
    <span><h2>预约停车</h2></span>
    <div style="text-align: center">
      <van-cell-group>
        <van-field
          v-model="appointmentDto.plateNumber"
          label="车牌"
          placeholder="请输入车牌"
          :required="true"
          :error-message="errorMessage.plateNumber"
          size="7"
        ></van-field>
        <van-field
          v-model="appointmentDto.phone"
          type="number"
          label="手机"
          placeholder="请输入手机号"
          :required="true"
          :error-message="errorMessage.phone"
          size="11"
        ></van-field>
        <van-field
          v-model="appointmentDto.address"
          label="预约地点"
          placeholder="请输入预约地点"
          :required="true"
          :error-message="errorMessage.address"
        ></van-field>
      </van-cell-group>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="coupon">预约</van-tabbar-item>
      <van-tabbar-item icon="friends">我的</van-tabbar-item> </van-tabbar
    ><br />
    <van-button type="info" @click="placeOrder">确定预约</van-button>
  </div>
</template>
<script>
import { NavBar, Dialog } from "vant";
export default {
  name: "CustomerMobile",
  components: {
    NavBar
  },
  data() {
    return {
      appointmentDto: {
        plateNumber: "",
        phone: "",
        address: ""
      },
      isCheck: true,
      active: 0,
      inputStatus: { plateNumber: false, phone: false, address: false },
      errorMessage: { plateNumber: "", phone: "", address: "" }
    };
  },
  methods: {
    placeOrder() {
      this.checkAll();
      if (
        this.inputStatus.address &&
        this.inputStatus.phone &&
        this.inputStatus.plateNumber
      ) {
        this.showDialog();
      }
    },
    showDialog() {
      Dialog.confirm({
        title: "确认预约",
        message: "您确定要预约停车吗？"
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          this.$message("取消操作");
        });
    },
    checkAll() {
      this.checkAddress();
      this.checkPhone();
      this.checkPlateNumber();
    },
    checkAddress() {
      if (this.appointmentDto.address === "") {
        this.errorMessage.address = "地址不能为空";
      } else {
        this.errorMessage.address = "";
        this.inputStatus.address = true;
      }
    },
    checkPlateNumber() {
      if (this.appointmentDto.plateNumber === "") {
        this.errorMessage.plateNumber = "车牌不能为空";
      } else {
        this.errorMessage.plateNumber = "";
        this.inputStatus.plateNumber = true;
      }
    },
    checkPhone() {
      if (this.appointmentDto.phone === "") {
        this.errorMessage.phone = "电话不能为空";
        this.isCheck = false;
      } else {
        this.errorMessage.phone = "";
        this.inputStatus.phone = true;
      }
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
  watch: {
    appointmentDto: {
      handler() {
        this.checkAll();
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  height: 50px;
  background-color: rgba(30, 44, 76, 0.93);
  color: white;
}

&.van-nav-bar__text {
  color: white;
}

&.van-nav-bar__title {
  color: white;
}

&.van-icon-arrow-left:before {
  color: white;
}
</style>
