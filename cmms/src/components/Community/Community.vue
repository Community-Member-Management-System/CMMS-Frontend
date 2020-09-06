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
      <v-col cols="4" justify="center" align="center">
        <v-avatar size="130">
          <v-icon dark v-if="!community.avatar" size="130">mdi-account-circle</v-icon>
          <v-img v-else :src="community.avatar"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="4" align="center">
        <div class="text-h4">{{ community.name }}</div>
        <div class="mt-5">
          <div v-if="authLevel === 3">
            <v-btn
              v-if="community.join_status == '已加入'"
              class="mx-2 mb-4"
              color="error"
              @click="userSetJoinStatus(community.id,false)"
            >- 退出社团</v-btn>
            <template v-else-if="isInvited">
              <v-btn class="mx-2 mb-4" color="primary" @click="setInvitation('accept')">+ 接受</v-btn>
              <v-btn class="mx-2 mb-4" color="error" @click="setInvitation('deny')">x 拒绝</v-btn>
            </template>
            <v-btn
              v-else-if="community.join_status == '未加入'"
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
          </div>
          <div v-else-if="authLevel <= 1">
            <v-btn color="error" @click="deleteCommunity(community.id)">解散社团</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <!-- body -->
    <v-row class="mb-10">
      <v-col>
        <v-tabs v-model="tab" background-color="#00000000" fixed-tabs>
          <v-tab
            v-for="(it, idx) in communityTabs"
            :key="idx"
            :id="`community-tab-${it.tabComponent.toLowerCase()}`"
          >{{ it.tabName }}</v-tab>
        </v-tabs>

        <v-row class="background">
          <v-col>
            <!-- <transition
              mode="out-in"
              :enter-active-class="`animate__animated animate__fadeIn${enterDirection} animate__faster`"
              :leave-active-class="`animate__animated animate__fadeOut${leaveDirection} animate__faster`"
            >-->
            <v-scroll-x-transition>
              <keep-alive>
                <component
                  :is="communityTabs[tab].tabComponent"
                  :authLevel="authLevel"
                  :community="community"
                  @modifyCommunity="getCommunity()"
                ></component>
              </keep-alive>
            </v-scroll-x-transition>
            <!-- </transition> -->
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
  props: {
    communityId: { required: true, default: null },
  },
  data: function () {
    return {
      tab: 0,
      isSuperuser: false,
      invitations: [],
      community: { admins: [] },
      enterDirection: "Right",
      leaveDirection: "Left",
    };
  },
  watch: {
    tab(newVal, oldVal) {
      if (newVal > oldVal) {
        this.enterDirection = "Right";
        this.leaveDirection = "Left";
      } else {
        this.enterDirection = "Left";
        this.leaveDirection = "Right";
      }
    },
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
      if (this.authLevel < 3) return allTabs;
      else if (this.authLevel >= 3)
        return [
          { tabName: "社团信息", tabComponent: "CommunityInfo" },
          { tabName: "社团活动", tabComponent: "CommunityActivity" },

          { tabName: "社团成员", tabComponent: "CommunityMember" },
        ];
      else return null;
    },

    authLevel() {
      // 0: SystemAdmin, 1: CommunityOwner, 2: CommunityAdmin, 3: CommunityMember, 4: User, 5: Tourist
      if (this.isSuperuser) return 0;
      if (
        this.$store.getters.user &&
        this.community.owner == parseInt(this.$store.getters.user.id)
      )
        return 1;
      if (
        this.$store.getters.user &&
        this.community.admins.indexOf(parseInt(this.$store.getters.user.id)) >
          -1
      )
        return 2;
      if (this.$store.getters.user === null) return 5;
      return 3;
    },

    isInvited() {
      for (let invitation of this.invitations) {
        if (invitation.community == this.communityId) {
          return true;
        }
      }
      return false;
    },
    invitationId() {
      for (let invitation of this.invitations) {
        if (invitation.community == this.communityId) {
          return invitation.id;
        }
      }
      return 0;
    },
  },
  created() {
    if (this.$store.getters.user === null) {
      this.invitations = [];
    } else this.getInvitations();

    this.getCommunity();

    this.axios
      .post(
        "/api/auth/check",
        {},
        {
          headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
        }
      )
      .then((response) => {
        this.isSuperuser = response.data.superuser;
      });
  },
  activated() {
    this.getCommunity();
    this.axios
      .post(
        "/api/auth/check",
        {},
        {
          headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
        }
      )
      .then((response) => {
        this.isSuperuser = response.data.superuser;
      });
  },
  methods: {
    getInvitations() {
      this.axios.get("/api/community/invitation/").then((response) => {
        this.invitations = response.data;
      });
    },
    getCommunity() {
      this.axios.get("/api/community/" + this.communityId).then((response) => {
        this.community = response.data;
      });
    },

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

    setInvitation(status) {
      this.axios
        .post(
          `/api/community/invitation/${this.invitationId}/${status}/`,
          {},
          {
            headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
          }
        )
        .then((response) => {
          this.getInvitations();
          this.getCommunity();
          this.$toasted.show("操作成功！");
        });
    },

    deleteCommunity(communityId) {
      this.axios
        .delete(`/api/community/${communityId}`, {
          headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
        })
        .then((response) => {
          this.$router.push("/home");
          this.$toasted.show("删除成功！");
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