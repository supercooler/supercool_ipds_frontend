import Vue from "vue";
import Vuex from "vuex";
import { get, post, put, myDelete } from "./config/axios";
import Router from "./router.js";

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
    userName: "",
    type: "姓名",
    name: "",
    gender: "",
    isGenderShow: false,
    isNameShow: true,
    centerDialogVisible: false,
    currentRow: {},
    parkingLots: [],
    response: {},
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
    phoneRules: { phone: [{ validator: validatePhone, trigger: "blur" }] },
    dialogFormVisible: false
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
    saveCurrentRow(state, row) {
      state.currentRow = row;
    },
    setParkingLots(state, response) {
      state.response = response;
      state.parkingLots = response.data;
    },
    setResponse(state, response) {
      state.response = response;
    },
    loginUser(state, res) {
      if ("msg" in res) alert(res.msg);
      else {
        localStorage.setItem("userName", JSON.stringify(res.userName));
        Router.push("/home");
      }
    },
    setSearchName(state, data) {
      state.name = data;
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
    getParkingLots: context => {
      get("/parking-lots").then(response => {
        context.commit("setParkingLots", response);
      });
    },
    createParkingLot: (context, parkingLot) => {
      post("/parking-lots", parkingLot).then(response => {
        if (response.status === 200) {
          this.$message.success("添加成功！");
        }
      });
    },
    updateParkingLot(context, parkingLot) {
      put("/parking-lots", parkingLot).then(response => {
        context.commit("setResponse", response);
      });
    },
    deleteParkingLot(context, id) {
      myDelete(`/parking-lots/${id}`).then(response => {
        context.commit("setResponse", response);
        location.reload();
      });
    },
    searchParkingLots(context, name) {
      get(`/parking-lots/${name}`).then(response => {
        context.commit("setParkingLots", response);
      });
    },
    updateParkingBoy: (context, data) => {
      put("/parking-boys", data).then(response => {
        context.commit("setResponse", response);
        location.reload();
      });
    },
    addParkingBoy: (context, data) => {
      post(`/parking-boys`, data).then(() => {
        location.reload();
      });
    },
    loginUser: (context, user) => {
      post("/users", user).then(res => {
        context.commit("loginUser", res);
      });
    },
    deleteParkingBoy: (context, id) => {
      console.log(id);
      myDelete("/parking-boys?id=" + id).then(res => {
        console.log(res);
      });
    }
  }
});
