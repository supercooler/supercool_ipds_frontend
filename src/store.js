import Vue from "vue";
import Vuex from "vuex";
import { get, post, put, myDelete } from "./config/axios";
import Router from "./router.js";
import Constant from "@/common/constance.js";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    userName: "",
    type: "姓名",
    name: "",
    gender: "",
    tag: "",
    isGenderShow: false,
    isNameShow: true,
    isTagShow: false,
    centerDialogVisible: false,
    currentRow: {},
    parkingLots: [],
    response: {},
    activities: [
      {
        content: Constant.HAD_ORDERED,
        type: "primary",
        color: "#DCDCDC"
      },
      {
        content: Constant.HAD_DISPATCHED,
        color: "#DCDCDC"
      },
      {
        content: Constant.HAD_CAR_STOPED,
        color: "#DCDCDC"
      },
      {
        content: Constant.IN_FETCHING_CAR,
        color: "#DCDCDC"
      },
      {
        content: Constant.WILL_BE_CONFIRMED,
        color: "#DCDCDC"
      },
      {
        content: Constant.FINISH_FETCHING,
        color: "#DCDCDC"
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
    dialogFormVisible: false,
    parkingOrders: []
  },
  mutations: {
    changeType(state) {
      switch (state.type) {
        case "name":
          state.isNameShow = true;
          state.isGenderShow = !state.isNameShow;
          state.isTagShow = !state.isNameShow;
          break;
        case "gender":
          state.isGenderShow = true;
          state.isNameShow = !state.isGenderShow;
          state.isTagShow = !state.isGenderShow;
          break;
        case "tag":
          state.isTagShow = true;
          state.isNameShow = !state.isTagShow;
          state.isGenderShow = !state.isTagShow;
          break;
      }
    },
    showModifyForm(state, row) {
      state.parkingBoyInfo = {
        id: row.id,
        name: row.name,
        age: row.age,
        gender: row.gender,
        workExperience: row.workExperience,
        phone: row.phone,
        status: row.status,
        tag: row.tag
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
      localStorage.setItem("responseData", response.data);
      state.response = response;
    },
    loginUser(state, res) {
      if (res.msg == null) {
        let user = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        switch (user.role) {
          case Constant.ROLE_USER_CUSTOMER:
            Router.push("/customer-mobile");
            break;
          case Constant.ROLE_USER_PARKING_BOY:
            Router.push("/parking-boy-mobile");
            break;
          case Constant.ROLE_USER_SUPER_MANAGER:
            Router.push("/home");
            break;
        }
      } else {
        alert(res.msg);
      }
    },
    setSearchName(state, data) {
      state.name = data;
    },
    setSearchTag(state, data) {
      state.tag = data;
    },
    setWebSocket(state, data) {
      state.webSocket = data;
    },
    setParkingOrders(state, data) {
      state.parkingOrders = data;
    }
  },
  actions: {
    getParkingBoysFromBackend: context => {
      get("/parking-boys").then(response => {
        context.commit("setParkingBoys", response.data);
      });
    },
    searchParkingBoys: context => {
      let condition;
      if (context.state.isGenderShow)
        condition = { gender: context.state.gender };
      else if (context.state.isNameShow)
        condition = { name: context.state.name };
      else condition = { tag: context.state.tag };
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
      post("/users/login", user).then(res => {
        context.commit("loginUser", res);
      });
    },
    deleteParkingBoy: (context, id) => {
      myDelete("/parking-boys?id=" + id).then(() => {
        location.reload();
      });
    },
    createOrder: (context, appoinment) => {
      post("/parking-orders", appoinment).then(response => {
        context.commit("setResponse", response);
      });
    },
    getParkingOrderList: context => {
      get("/parking-orders").then(response => {
        context.commit("setResponse", response);
      });
    },
    getParkingOrders: context => {
      get("/parking-orders").then(response => {
        context.commit("setParkingOrders", response.data);
      });
    },
    deleteParkingOrder: (context, id) => {
      myDelete("/parking-orders?id=" + id).then(() => {
        location.reload();
      });
    },
    searchParkingOrders: (context, info) => {
      get("/parking-orders" + info).then(response => {
        context.commit("setParkingOrders", response.data);
      });
    },
    fetchCar: context => {
      put("/parking-orders", context.state.response.data).then(response => {
        if (response.status == 200) {
          context.state.response.data = response.body;
          context.state.activities[3].color = "#0bbd87";
          location.reload();
        }
      });
    }
  }
});
