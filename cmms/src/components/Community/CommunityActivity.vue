<template>
  <v-container>
    <v-row>
      <v-col cols="4" v-for="(a, i) in communityActivities" :key="i">
        <activity-item
          :community-avatar="a.communityAvatar"
          :community-name="a.communityName"
          :community-profile="a.communityProfile"
          :community-target="a.communityTarget"
          :activity-name="a.activityName"
          :activity-time="a.activityTime"
          :activity-location="a.activityLocation"
          :activity-status="a.activityStatus"
          :activity-content="a.activityContent"
          :activity-target="a.activityTarget"
          show-community
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn elevation="5" bottom fixed class="mx-2" fab dark color="green" to="/create-activity">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import ActivityItem from "@/components/ActivityItem";
export default {
  name: "CommunityActivity",
  data: function () {
    return {
      communityActivities: [
        {
          communityAvatar: "",
          communityName: "ZJX Community!",
          communityProfile: "wuhu qifei",
          communityTarget: "",
          activityName: "Linux install party",
          activityTime: "2020-7-17, 15:00-16:00",
          activityLocation: "西校区3B101",
          activityContent: "帮助安装Linux",
          activityTarget: "",
          activityStatus: "正在进行中",
        },
        {
          communityAvatar: "",
          communityName: "ZJX Community!",
          communityProfile: "wuhu qifei",
          communityTarget: "",
          activityName: "Linux install party",
          activityTime: "2020-7-17, 15:00-16:00",
          activityLocation: "西校区3B101",
          activityContent: "帮助安装Linux",
          activityTarget: "",
          activityStatus: "已结束",
        },
        {
          communityAvatar: "",
          communityName: "ZJX Community!",
          communityProfile: "wuhu qifei",
          communityTarget: "",
          activityName: "Linux install party",
          activityTime: "2020-7-17, 15:00-16:00",
          activityLocation: "西校区3B101",
          activityContent: "帮助安装Linux",
          activityTarget: "",
          activityStatus: "已结束",
        },
        {
          communityAvatar: "",
          communityName: "ZJX Community!",
          communityProfile: "wuhu qifei",
          communityTarget: "",
          activityName: "Linux install party",
          activityTime: "2020-7-17, 15:00-16:00",
          activityLocation: "西校区3B101",
          activityContent: "帮助安装Linux",
          activityTarget: "",
          activityStatus: "已结束",
        },
        {
          communityAvatar: "",
          communityName: "ZJX Community!",
          communityProfile: "wuhu qifei",
          communityTarget: "",
          activityName: "Linux install party",
          activityTime: "2020-7-17, 15:00-16:00",
          activityLocation: "西校区3B101",
          activityContent: "帮助安装Linux",
          activityTarget: "",
          activityStatus: "已结束",
        },
      ],
    };
  },
  computed: {},
  methods: {},
  components: {
    ActivityItem,
  },
};
</script>