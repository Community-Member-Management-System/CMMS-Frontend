<template>
  <v-container>
    <v-row>
      <v-col cols="3" v-for="(a, i) in clubActivities" :key="i">
        <activity-item
          :club-avatar="a.clubAvatar"
          :club-name="a.clubName"
          :club-profile="a.clubProfile"
          :club-target="a.clubTarget"
          :activity-name="a.activityName"
          :activity-time="a.activityTime"
          :activity-location="a.activityLocation"
          :activity-status="a.activityStatus"
          :activity-content="a.activityContent"
          :activity-target="a.activityTarget"
          show-club
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
import ClubActivityManagement from "@/components/ClubManagement/ClubActivityManagement";
export default {
  name: "ClubManagement",
  data: function () {
    return {
      clubActivities: [
        {
          clubAvatar: "",
          clubName: "ZJX Club!",
          clubProfile: "wuhu qifei",
          clubTarget: "",
          activityName: "Linux install party",
          activityTime: "2020-7-17, 15:00-16:00",
          activityLocation: "西校区3B101",
          activityContent: "帮助安装Linux",
          activityTarget: "",
          activityStatus: "正在进行中",
        },
        {
          clubAvatar: "",
          clubName: "ZJX Club!",
          clubProfile: "wuhu qifei",
          clubTarget: "",
          activityName: "Linux install party",
          activityTime: "2020-7-17, 15:00-16:00",
          activityLocation: "西校区3B101",
          activityContent: "帮助安装Linux",
          activityTarget: "",
          activityStatus: "已结束",
        },
        {
          clubAvatar: "",
          clubName: "ZJX Club!",
          clubProfile: "wuhu qifei",
          clubTarget: "",
          activityName: "Linux install party",
          activityTime: "2020-7-17, 15:00-16:00",
          activityLocation: "西校区3B101",
          activityContent: "帮助安装Linux",
          activityTarget: "",
          activityStatus: "已结束",
        },
        {
          clubAvatar: "",
          clubName: "ZJX Club!",
          clubProfile: "wuhu qifei",
          clubTarget: "",
          activityName: "Linux install party",
          activityTime: "2020-7-17, 15:00-16:00",
          activityLocation: "西校区3B101",
          activityContent: "帮助安装Linux",
          activityTarget: "",
          activityStatus: "已结束",
        },
        {
          clubAvatar: "",
          clubName: "ZJX Club!",
          clubProfile: "wuhu qifei",
          clubTarget: "",
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