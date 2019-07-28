import Vue from "vue";
import Vuex from "vuex";
import { get, put } from "./config/axios";

Vue.use(Vuex);
var validatePhone = (rule, value, callback) => {
  var regex = new RegExp(/^[0-9]{11}$/);
  if (!regex.test(value)) {
    callback(new Error("请输入正确的手机号码！"));
  } else {
    callback();
  }
};
export default new Vuex.Store({
  state: {
    type: "姓名",
    name: "",
    gender: "",
    isGenderShow: false,
    isNameShow: true,
    centerDialogVisible: false,
    currentRow: {},
    tableData: [
      {
        id: "",
        name: "",
        capacity: "",
        address: ""
      }
    ],
    redundantTableData: [
      {
        id: "",
        name: "",
        capacity: "",
        address: ""
      }
    ],
    parkingBoys: [],
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
    parkingBoyInfo: {},
    phoneRules: { phone: [{ validator: validatePhone, trigger: "blur" }] }
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
    doneParkingBoyPhone: state => {
      return state.parkingBoyPhone;
    },
    donePhoneRules: state => {
      return state.phoneRules;
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
    },
    setParkingBoys(state, data) {
      state.parkingBoys = data;
    },
    sortTable(state) {
      var capacity = state.tableData
        .map(i => i.capacity)
        .sort((a, b) => a - b)
        .reverse();
      var backupTable = [];
      capacity.forEach(v => {
        var index = state.redundantTableData.map(i => i.capacity).indexOf(v);
        backupTable.push(state.tableData[index]);
        state.redundantTableData[index].capacity = -1;
      });
      state.tableData = backupTable;
      state.redundantTableData = backupTable;
    },
    searchDataByName(state, keyName) {
      state.tableData = state.redundantTableData;
      if (keyName != "") {
        var searchTable = state.tableData.filter(item => item.name == keyName);
        state.tableData = searchTable;
      }
    },
    updateParkingLot(state, formName) {
      var index = state.tableData.map(i => i.id).indexOf(parseInt(formName.id));
      state.tableData[index].name = formName.name;
      state.tableData[index].capacity = formName.capacity;
      state.redundantTableData[index].name = formName.name;
      state.redundantTableData[index].capacity = formName.capacity;
    },
    saveCurrentRow(state, row) {
      state.currentRow = row;
    },
    setSearchName(state, name) {
      state.name = name;
    }
  },
  actions: {
    getParkingBoysFromBackend: context => {
      get("/parking-boys").then(response => {
        context.commit("setParkingBoys", response.data);
      });
    },
    searchParkingBoys: context => {
      let condition = context.state.isGenderShow
        ? { gender: context.state.gender }
        : { name: context.state.name };
      get("/parking-boys", condition).then(response => {
        context.commit("setParkingBoys", response.data);
      });
    },
    updateParkingBoy: (context, data) => {
      put("/parking-boys", data).then(() => {
        location.reload();
      });
    }
  }
});
