<template>
  <v-container>
    <v-row>
      <v-col cols="4" v-for="(activity, i) in activities" :key="i">
        <activity-profile v-bind="activity">
          <template v-if="authType == 'admin' " v-slot:deleteBtn>
            <v-btn absolute right color="red darken-2" outlined link @click="deleteActivity">删除活动</v-btn>
          </template>
        </activity-profile>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="authType == 'admin' ">
      <v-btn elevation="5" bottom fixed class="mx-2" fab dark color="green" to="/create-activity">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import ActivityProfile from "@/components/Activity/ActivityProfile";
export default {
  name: "CommunityActivity",
  props: { authType: { type: String, required: true, default: "admin" } }, //user or admin
  data: function () {
    return {
      activities: [
        {
          status: "正在进行中",
          title: "Linux install party",
          description: "帮助安装Linux",
          startTime: "2020-07-17 15:00",
          endTime: "2020-07-17 16:00",
          location: "西校区3B101",
          detailLink: "/activity",
        },
        {
          status: "正在进行中",
          title: "Linux install party",
          description: "帮助安装Linux",
          startTime: "2020-07-17 15:00",
          endTime: "2020-07-17 16:00",
          location: "西校区3B101",
          detailLink: "/activity",
        },
        {
          status: "正在进行中",
          title: "Linux install party",
          description: "帮助安装Linux",
          startTime: "2020-07-17 15:00",
          endTime: "2020-07-17 16:00",
          location: "西校区3B101",
          detailLink: "/activity",
        },
        {
          status: "正在进行中",
          title: "Linux install party",
          description: "帮助安装Linux",
          startTime: "2020-07-17 15:00",
          endTime: "2020-07-17 16:00",
          location: "西校区3B101",
          detailLink: "/activity",
        },
        {
          status: "正在进行中",
          title: "Linux install party",
          description: "帮助安装Linux",
          startTime: "2020-07-17 15:00",
          endTime: "2020-07-17 16:00",
          location: "西校区3B101",
          detailLink: "/activity",
        },
      ],
    };
  },
  computed: {},
  methods: {
    getActivities() {
      // TODO: 获取该社团所有活动
    },
    deleteActivity() {
      this.$confirm("其他相关活动信息将一并删除", {
        title: "确认删除该活动？",
      }).then((res) => {
        if (res) {
          // TODO: 删除活动
        }
      });
    },
  },
  //   mounted() {
  //     this.getActivities();
  //   },
  activated() {
    this.getActivities();
  },
  components: {
    ActivityProfile,
  },
};
</script>