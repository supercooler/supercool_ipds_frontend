<template>
  <div id="searchBar" align="right">
    <el-row>
      <el-select
        v-model="$store.state.type"
        placeholder="请选择类型"
        @change="$store.commit('changeType')"
      >
        <el-option
          v-for="item in types"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        v-model="$store.state.gender"
        placeholder="请选择性别"
        v-show="$store.state.isGenderShow"
      >
        <el-option
          v-for="item in $store.state.genders"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
      <div width="180" style="display:inline-block">
        <el-form :rules="rules" :model="inputData">
          <el-form-item prop="name">
            <el-input
              placeholder="请输入名字"
              prefix-icon="el-icon-search"
              v-model="inputData.name"
              v-show="$store.state.isNameShow"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="$store.dispatch('searchParkingBoys')"
        >搜索</el-button
      >
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    var validateInputName = (rule, value, callback) => {
      var regex = new RegExp(/^[\u4e00-\u9fa5a-zA-Z ]{0,15}$/);
      if (!regex.test(value)) {
        callback(new Error("请输入英文或者中文!"));
      }
    };
    return {
      types: [
        {
          value: "name",
          label: "姓名"
        },
        {
          value: "gender",
          label: "性别"
        }
      ],
      inputData: {
        name: this.$store.state.name
      },
      rules: {
        name: [{ validator: validateInputName, trigger: "blur" }]
      }
    };
  },
  watch: {
    "inputData.name": function() {
      return this.$store.commit("setSearchName", this.inputData.name);
    }
  }
};
</script>

<style></style>
