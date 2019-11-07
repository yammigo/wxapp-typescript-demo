const watchBehavior = require("miniprogram-watch");
import globalDataBehavior from "../../common/behavior/globaldata-behavior";

Component({
  behaviors: [watchBehavior, globalDataBehavior],
  properties: {
    propA: {
      type: Number,
      value: 0
    }
  },
  data: {
    a: 0,
    b: {
      c: {
        d: 33
      },
      e: [1, 2, [3, 4]]
    }
  },
  watch: {
    propA(val: any, oldVal: any) {
      const latestPropLog = `propA new: ${val}, old: ${oldVal}`;
      console.log(latestPropLog);
      // 内容输出到globalData
      (this as any).setGlobalData({ latestPropLog });
    },
    a(val: any, oldVal: any) {
      console.log("a new: %s, old: %s", val, oldVal);
    },
    "b.c.d": function(val: any, oldVal: any) {
      console.log("b.c.d new: %s, old: %s", val, oldVal);
    },
    "b.e[2][0]": function(val: any, oldVal: any) {
      console.log("b.e[2][0] new: %s, old: %s", val, oldVal);
    },
    "b.e[3][4]": function(val: any, oldVal: any) {
      console.log("b.e[3][4] new: %s, old: %s", val, oldVal);
    }
  },
  methods: {
    onTap() {
      this.setData({
        a: 2,
        "b.c.d": 3,
        "b.e[2][0]": 444,
        c: 123
      });
      this.triggerEvent("update", {}, {});
    }
  }
});
