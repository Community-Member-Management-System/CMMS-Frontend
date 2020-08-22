<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title v-text="getNoticeTitle(notice)"></v-list-item-title>
      <v-list-item-subtitle v-text="notice ? notice.description : ''"></v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-list-item-action-text v-text="getNoticeTime(notice)"></v-list-item-action-text>
      <v-icon>close</v-icon>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "NoticeItem",
  data: () => ({}),
  props: {
    status: Object,
    notice: Object,
  },

  methods: {
    getNoticeTime(notice) {
      if (!notice) return "";
      let timestamp = notice.date;
      let mistiming = Math.round((Date.now() - Date.parse(timestamp)) / 1000);
      let arrr = ["年", "个月", "星期", "天", "小时", "分钟", "秒"];
      let arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
      for (let i = 0; i < arrn.length; i++) {
        let inm = Math.floor(mistiming / arrn[i]);
        if (inm != 0) {
          return inm + arrr[i] + "前";
        }
      }
    },
    getNoticeTitle(notice) {
      if (!notice) return "";
      let type = notice.type;
      let subtype = notice.subtype;
      switch (type) {
        case "PC":
          switch (subtype) {
            case 0:
              return "被邀请加入社团";
            case 1:
              return "取消管理员";
            case 2:
              return "被踢出社团";
          }
        case "CA":
          switch (subtype) {
            case 0:
              return "创建社团审核结果";
            case 1:
              return "加入社团审核结果";
          }
        case "B":
          return "你的账户已被封禁";
        case "C_AN":
          switch (subtype) {
            case 0:
              return "活动创建";
            case 1:
              return "活动更新";
            case 2:
              return "活动删除";
          }
        case "C_AP":
          switch (subtype) {
            case 0:
              return "社团管理员个人邀请被拒绝";
            case 1:
              return "社团成员权限变更";
            case 2:
              return "成员增减";
          }
        case "C_AA":
          return "社团管理员审核用户加入请求";
        case "C_D":
          return "社团已被解散";
        case "S_CA":
          return "系统管理员审核社团创建请求";
      }
    },
  },
};
</script>