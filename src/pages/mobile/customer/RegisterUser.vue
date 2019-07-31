<template>
  <div>
    <div style="text-align: center">
      <nav-bar
        title="智能派单停车系统"
        left-arrow
        class="nav-bar"
        @click-left="onClickLeft"
      >
      </nav-bar>
      <span><h2>注册</h2></span>
      <div>
        <el-form
          style="width: 255px;margin: 0 auto"
          :model="user"
          ref="addForm"
          :rules="rules"
        >
          <el-form-item label="用户名：" prop="userName">
            <el-input
              v-model="user.userName"
              autocomplete="off"
              maxlength="15"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input
              type="password"
              v-model="user.password"
              autocomplete="off"
            ></el-input> </el-form-item
          ><br />
          <el-form-item label="确认密码:" prop="checkPass">
            <el-input
              type="password"
              v-model="user.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('addForm')">重置</el-button><br />
            <el-button
              style="margin-top: 10px"
              type="primary"
              @click="addParkingBoy('addForm')"
              >确认</el-button
            >
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
  name: "registerUser",
  components: {
    NavBar
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.user.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      user: {
        userName: "",
        password: "",
        checkPass: "",
        role: Constant.ROLE_USER_CUSTOMER
      },

      rules: {
        userName: { required: true, message: "请输入用户名", trigger: "blur" },
        password: [{ required: true, message: "输入密码", trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // eslint-disable-next-line no-unused-vars
    addParkingBoy(formName) {
      this.$store.dispatch("registerUser", this.user);
    },
    onClickLeft() {
      this.$router.go(-1);
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

&.van-icon-setting-o:before {
  color: white;
}
</style>
<style scoped>
>>> .el-button {
  width: 255px;
}
</style>
