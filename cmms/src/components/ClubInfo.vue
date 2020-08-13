<template>
  <v-container>
    <!-- head -->
    <v-row>
      <v-col justify="center" align="center">
        <v-img height="250px">
          <v-avatar color="primary" size="100">
            <span v-if="!avatar" class="white--text headline">暂无头像</span>
            <v-img v-else :src="avatar"></v-img>
          </v-avatar>
          <h1 class="display-1 py-3">{{ clubname }}</h1>
          <!-- <h3>目前状态: {{ joinStatus }}</h3> -->
          <v-btn v-if="joinStatus === '未加入'" class="mx-2 mb-4" color="primary">+ 申请加入</v-btn>
          <v-btn v-if="joinStatus !== '未加入'" class="mx-2 mb-4" color="error">- 退出</v-btn>
          <!-- <v-btn class="mx-2 mb-4" color="primary">管理社团</v-btn> -->
        </v-img>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <!-- body -->
    <v-row class="mb-10">
      <v-col>
        <v-card flat>
          <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="(it, idx) in clubDataType" :key="idx">{{ it }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(it, idx) in clubDataType" :key="idx">
              <!-- 社团基本信息 -->
              <v-row class="background" v-if="idx==0">
                <v-col>
                  <v-card class="ma-5 pa-5">
                    基本信息
                    <v-card-text>创建时间: {{ data.clubInfo.createDate }}</v-card-text>
                    <v-card-text>创建者: {{ data.clubInfo.creator }}, 目前拥有者: {{ data.clubInfo.owner }}</v-card-text>
                  </v-card>
                  <v-card class="ma-5 pa-5">
                    社团简介
                    <v-card-text>{{ data.clubInfo.profile }}</v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <!-- 社团动态 -->
              <v-row class="background" v-if="idx==1">
                <v-col cols="3" v-for="(a, i) in data.clubActivities" :key="i">
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
                    :show-club="false"
                  />
                </v-col>
              </v-row>

              <!--              &lt;!&ndash; 社团通知 &ndash;&gt;-->
              <!--              <v-row class="background" v-if="idx==2">-->
              <!--                <v-col>-->
              <!--                  <v-card class="ma-5 pa-5" v-for="(d, i) in data.clubNotice" :key="i">-->
              <!--                    <v-card-title>{{ d.title }}</v-card-title>-->
              <!--                    <v-card-subtitle>{{ d.subtitle }}</v-card-subtitle>-->
              <!--                    <v-card-text>{{ d.message }}</v-card-text>-->
              <!--                  </v-card>-->
              <!--                </v-col>-->
              <!--              </v-row>-->

              <!-- 社团成员 -->
              <v-row class="background" v-if="idx==2">
                <v-col>
                  <v-card class="mb-5 pa-5">
                    <v-card-title>管理员</v-card-title>
                    <v-list subheader>
                      <user-item
                        v-for="(a, i) in data.clubMember.admin"
                        :key="i"
                        :user-avatar="a.avatar"
                        :user-name="a.name"
                        :user-profile="a.profile"
                        :user-target="a.target"
                      />
                    </v-list>
                  </v-card>
                  <v-card class="mb-5 pa-5">
                    <v-card-title>成员</v-card-title>
                    <v-list subheader>
                      <user-item
                        v-for="(m, i) in data.clubMember.member"
                        :key="i"
                        :user-avatar="m.avatar"
                        :user-name="m.name"
                        :user-profile="m.profile"
                        :user-target="m.target"
                      />
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserItem from "@/components/UserItem";
import ActivityItem from "@/components/ActivityItem";
export default {
  name: "ClubInfo",
  data: function () {
    return {
      tab: null,
      clubname: "社团名称",
      avatar: null,
      clubDataType: [
        "社团信息",
        "社团活动",
        // "社团通知",
        "成员信息",
      ],
      joinStatus: "",
      valid: false,
      data: {
        clubInfo: {
          profile: "",
          createDate: "",
          owner: "",
          creator: "",
        },
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
            activityTarget: "/activity",
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
        ],
        // clubNotice: [
        //   {
        //     title: "zjx tql",
        //     subtitle: "2020-7-18",
        //     message: "wuhu qifei",
        //   },
        //   {
        //     title: "zjx tql",
        //     subtitle: "2020-7-18",
        //     message: "芜湖，起飞",
        //   },
        // ],
        clubMember: {
          admin: [
            {
              avatar: "",
              name: "ens",
              target: "",
              profile: "hello!",
            },
          ],
          member: [
            {
              avatar: "",
              name: "gyx",
              target: "",
              profile: "hello!",
            },
            {
              avatar: "",
              name: "zjx",
              target: "",
              profile: "hello!",
            },
          ],
        },
      },
    };
  },
  computed: {},
  methods: {},
  components: {
    UserItem,
    ActivityItem,
  },
  mounted() {
    this.axios
      .get("/api/community/" + this.$route.params["club_id"])
      .then((response) => {
        this.clubname = response.data["name"];
        this.avatar = response.data["avatar"];
        this.valid = response.data["valid"];
        this.joinStatus = response.data["join_status"];
        this.data.clubInfo.profile = response.data["profile"];
        this.data.clubInfo.createDate = response.data["date_created"];
        this.data.clubInfo.owner = response.data["owner"];
        this.data.clubInfo.creator = response.data["creator"];
        // this.data.clubMember.admin = response.data['admin']
      });
  },
};
</script>
