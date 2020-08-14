<template>
  <v-container>
    <!-- head -->
    <!-- 放社团信息里 -->
    <!-- <v-row>
      <v-col justify="center" align="center">
        <v-img height="250px">
          <v-avatar color="primary" size="100"></v-avatar>
          <h1 class="display-1 py-3">{{ communityName }}</h1>
          <v-btn class="mx-2 mb-4" color="primary">- 解散社团</v-btn>
        </v-img>
      </v-col>
    </v-row>-->
    <!-- <v-row justify="center">
      <v-col cols="2">
        <v-avatar color="primary"></v-avatar>
      </v-col>
      <v-col align-self="center" cols="3">
        <div class="text-h4">{{ communityName }}</div>
      </v-col>
    </v-row>-->

    <!-- <v-divider></v-divider> -->

    <v-row justify="center" align="center">
      <v-col justify="center" align="center">
        <v-avatar size="130">
          <v-icon dark v-if="!community.avatar">mdi-account-circle</v-icon>
          <v-img v-else :src="community.avatar"></v-img>
        </v-avatar>
      </v-col>
      <v-col>
        <div class="text-h4">{{ community.name }}</div>
        <div class="mt-5">
          <div v-if="authType == 'user'">
            <v-btn
              v-if="community.join_status == '未加入'"
              class="mx-2 mb-4"
              color="primary"
              @click="userSetJoinStatus(community.id,true)"
            >+ 申请加入</v-btn>
            <v-btn
              v-else-if="community.join_status == '审核中'"
              class="mx-2 mb-4"
              color="error"
              @click="userSetJoinStatus(community.id,false)"
            >x 取消申请</v-btn>
            <v-btn
              v-else
              class="mx-2 mb-4"
              color="error"
              @click="userSetJoinStatus(community.id,false)"
            >- 退出社团</v-btn>
          </div>
          <div v-else>
            <v-btn v-if="community.join_status == '审核中'" class="mx-2 mb-4" color="error">解散社团</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <!-- body -->
    <v-row class="mb-10">
      <v-col>
        <v-tabs v-model="tab" background-color="grey lighten-3" fixed-tabs>
          <v-tab v-for="(it, idx) in communityTabs" :key="idx">{{ it.tabName }}</v-tab>
        </v-tabs>

        <v-row class="background">
          <v-col>
            <v-scroll-x-transition>
              <keep-alive>
                <component
                  :is="communityTabs[tab].tabComponent"
                  :authType="authType"
                  :community="community"
                ></component>
              </keep-alive>
            </v-scroll-x-transition>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommunityInfo from "@/components/Community/CommunityInfo";
import CommunityActivity from "@/components/Community/CommunityActivity";
import CommunityNotice from "@/components/Community/CommunityNotice";
import CommunityMember from "@/components/Community/CommunityMember";
import CommunityTodo from "@/components/Community/CommunityTodo";
export default {
  name: "Community",
  // props: { authType: { type: String, required: true, default: "admin" } }, //user or admin
  data: function () {
    return {
      tab: 0,
      community: { admins: [] },
    };
  },
  computed: {
    communityTabs() {
      const allTabs = [
        { tabName: "社团信息", tabComponent: "CommunityInfo" },
        { tabName: "社团活动", tabComponent: "CommunityActivity" },
        { tabName: "社团通知", tabComponent: "CommunityNotice" },
        { tabName: "社团成员", tabComponent: "CommunityMember" },
        { tabName: "待办事项", tabComponent: "CommunityTodo" },
      ];
      if (this.authType == "admin") return allTabs;
      else if (this.authType == "user") return allTabs.slice(0, 3);
      else return null;
    },

    authType() {
      if (
        this.$store.getters.user &&
        this.community.admins.indexOf(parseInt(this.$store.getters.user.id)) >
          -1
      )
        return "admin";
      else return "user";
    },
  },
  created() {
    this.axios
      .get("/api/community/" + this.$route.params["communityId"])
      .then((response) => {
        this.community = response.data;
      });
  },
  methods: {
    userSetJoinStatus(communityId, joinStatus) {
      this.axios
        .post(
          `/api/community/${communityId}/join`,
          { join: joinStatus },
          {
            headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
          }
        )
        .then((response) => {
          this.community.join_status = response.data.valid
            ? "已加入"
            : response.data.member
            ? "审核中"
            : "未加入";
          this.$toasted.show("操作成功！");
        });
    },
  },
  components: {
    CommunityInfo,
    CommunityActivity,
    CommunityNotice,
    CommunityMember,
    CommunityTodo,
  },
};
</script>