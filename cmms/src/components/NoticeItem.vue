<template>
  <v-list-item @click="readNotice()">
    <v-list-item-content>
      <v-list-item-title :class="read ? '' : 'font-weight-bold'" v-text="getNoticeTitle(notice)"></v-list-item-title>
      <v-list-item-subtitle
        :class="read ? '' : 'font-weight-bold'"
        v-text="notice ? notice.description : ''"
      ></v-list-item-subtitle>
      <v-row class="mr-3" align="center">
        <v-spacer></v-spacer>
        <div class="text-caption">查看相关：</div>
        <v-btn
          v-if="notice.related_community"
          depressed
          small
          link
          :to="'/community/' + notice.related_community"
        >社团</v-btn>
        <v-btn
          v-if="notice.related_activity"
          depressed
          small
          link
          :to="'/activity/' + notice.related_activity"
        >活动</v-btn>
        <v-btn
          v-if="notice.related_user"
          depressed
          small
          link
          :to="'/user/' + notice.related_user"
        >成员</v-btn>
      </v-row>
    </v-list-item-content>
    <v-list-item-action>
      <v-list-item-action-text v-text="getNoticeTime(notice)"></v-list-item-action-text>
      <v-icon @click="deleteNotice()">close</v-icon>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "NoticeItem",
  data: () => ({
    clicked: false,
  }),
  props: {
    status: Object,
    notice: Object,
  },
  computed: {
    read: function () {
      if (this.clicked || !this.status) return true;
      else return this.status.read;
    },
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
    readNotice() {
      if (!this.read) {
        this.axios
          .post(
            "/api/notice/",
            { pk: this.status.pk, method: "read" },
            {
              headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
            }
          )
          .then((response) => {
            this.clicked = true;
            this.$emit("read");
          });
      }
    },
    deleteNotice() {
      this.axios
        .post(
          "/api/notice/",
          { pk: this.status.pk, method: "delete" },
          {
            headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
          }
        )
        .then((response) => {
          this.$emit("delete");
        });
    },
  },
};
</script>