<template>
  <div>
    <nav-bar title="智能派单停车系统" class="nav-bar"></nav-bar>
    <div style="text-align: center;margin-top: 100px" class="loginMainPanel">
      <br />
      <div style="text-align: center">
        <div class="block">
          <el-avatar :size="80">
            <i class="el-icon-user"></i>
          </el-avatar>
        </div>
        <el-form :model="user" :rules="rules" ref="loginForm" label-width="100px">
          <el-form-item label="用户名" prop="userName">
            <el-input type="text" v-model="user.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="sumbitButton"
              type="primary"
              @keydown.enter="submitForm('loginForm')"
              @click="submitForm('loginForm')"
            >提交</el-button>
            <el-button @click="resetForm('loginForm')" class="resetButton">重置</el-button>
            <br />
            <div @click="locationRegister" class="registerButton">注册</div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from "vant";
import Constant from "@/common/constance.js";
export default {
  name: "CustomerLoginMobile",
  data() {
    return {
      user: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("loginUser", this.user);
        } else {
          this.$message.error("错了哦，这是一条错误消息");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    locationHomePage(role) {
      switch (role) {
        case Constant.ROLE_USER_CUSTOMER:
          this.$router.push("/customer-mobile");
          break;
        case Constant.ROLE_USER_PARKING_BOY:
          this.$router.push("/parking-boy-mobile");
          break;
      }
    },
    locationRegister() {
      this.$router.push("/register-user");
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped>
.block {
  margin-bottom: 20px;
}
.loginMainPanel {
  width: 90%;
  margin: 0 auto;
}
>>> .el-form {
  padding-right: 10%;
  margin-left: -8%;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
>>> .el-card {
  height: 500px;
}
>>> .element.style {
  width: 313px;
  padding-right: 70px;
}

>>> .el-avatar {
  background: #409eff;
  font-size: 26px;
}

.sumbitButton {
  float: left;
  line-height: 12px;
  width: 47%;
}

.resetButton {
  float: right;
  line-height: 12px;
  width: 47%;
}

.registerButton {
  background-color: white;
  line-height: 35px;
  width: 100%;
  color: black;
  border-radius: 5px;
  border: 1px solid #409eff;
  margin-top: 10px;
}
</style>
<style lang="less" scoped>
.van-nav-bar {
  height: 50px;
  background-color: #409eff;
  color: white;
}

&.van-nav-bar__text {
  color: white;
}

&.van-nav-bar__title {
  color: white;
}
</style>
