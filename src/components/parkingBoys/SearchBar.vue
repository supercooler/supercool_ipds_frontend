<template>
  <div id="searchBar" align="right">
    <el-row>
      <el-select
        v-model="$store.state.type"
        placeholder="请选择类型"
        @change="$store.commit('changeType')"
      >
        <el-option
          v-for="item in $store.getters.doneTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        v-model="$store.state.gender"
        placeholder="请选择性别"
        v-show="$store.getters.doneIsGenderShow"
      >
        <el-option
          v-for="item in $store.getters.doneGenders"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div width="180" style="display:inline-block">
        <el-input
          placeholder="请输入名字"
          prefix-icon="el-icon-search"
          v-model="$store.state.name"
          v-show="$store.getters.doneIsNameShow"
        ></el-input>
      </div>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
