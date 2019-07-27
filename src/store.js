import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    type: "姓名",
    name: "",
    gender: "",
    isGenderShow: false,
    isNameShow: true,
    centerDialogVisible: false,
    parkingBoys: [
      {
        id: 1,
        name: "王小虎",
        age: 20,
        gender: "男",
        workExperience: "2年",
        phone: "13800138000",
        status: "忙碌"
      },
      {
        id: 2,
        name: "王大虎",
        age: 22,
        gender: "女",
        workExperience: "5年",
        phone: "13800138000",
        status: "空闲"
      },
      {
        id: 3,
        name: "王老虎",
        age: 32,
        gender: "男",
        workExperience: "15年",
        phone: "13700000000",
        status: "空闲"
      }
    ],
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
    genders: [
      {
        value: "male",
        label: "男"
      },
      {
        value: "female",
        label: "女"
      }
    ],
    parkingBoyInfo: {}
  },
  getters: {
    doneType: state => {
      return state.type;
    },
    doneTypes: state => {
      return state.types;
    },
    doneGenders: state => {
      return state.genders;
    },
    doneGender: state => {
      return state.gender;
    },
    doneIsGenderShow: state => {
      return state.isGenderShow;
    },
    doneIsNameShow: state => {
      return state.isNameShow;
    },
    doneName: state => {
      return state.name;
    },
    doneParkingBoyInfo: state => {
      return state.parkingBoyInfo;
    },
    doneParkingBoys: state => {
      return state.parkingBoys;
    },
    doneCenterDialogVisible: state => {
      return state.centerDialogVisible;
    }
  },
  mutations: {
    changeType(state) {
      state.isNameShow = state.type === "name" ? true : false;
      state.isGenderShow = !state.isNameShow;
    },
    showModifyForm(state, row) {
      state.parkingBoyInfo = {
        id: row.id,
        name: row.name,
        age: row.age,
        gender: row.gender,
        workExperience: row.workExperience,
        phone: row.phone,
        status: row.status
      };
      state.centerDialogVisible = true;
    }
  },
  actions: {}
});
