<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in status"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp"
      >{{ activity.content }}</el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import Constant from "@/common/constance.js";
export default {
  name: "StatusBar",
  data() {
    return {
      status: [
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
      ]
    };
  },
  beforeMount() {
    for (let i = 0; i < this.$store.state.statusBarCount; i++) {
      this.status[i].color = "#0bbd87";
    }
  }
};
</script>
