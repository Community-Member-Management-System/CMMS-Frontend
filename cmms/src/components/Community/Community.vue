<template>
  <v-container>
    <!-- head -->
    <v-row>
      <v-col justify="center" align="center">
        <v-img height="250px">
          <v-avatar color="primary" size="100"></v-avatar>
          <h1 class="display-1 py-3">{{ communityName }}</h1>
          <v-btn class="mx-2 mb-4" color="primary">- 解散社团</v-btn>
        </v-img>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <!-- body -->
    <v-row class="mb-10">
      <v-col>
        <v-card flat>
          <v-tabs v-model="tab" background-color="grey lighten-3" fixed-tabs>
            <v-tab v-for="(it, idx) in communityTabs" :key="idx">{{ it.tabName }}</v-tab>
          </v-tabs>
          <!-- <v-row class="background">
            <v-col>
              <keep-alive>
                <component :is="communityTabs[tab].tabComponent"></component>
              </keep-alive>
            </v-col>
          </v-row>-->
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(it, idx) in communityTabs" :key="idx">
              <v-row class="background">
                <v-col>
                  <component :is="it.tabComponent"></component>
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
import CommunityInfo from "@/components/Community/CommunityInfo";
import CommunityActivity from "@/components/Community/CommunityActivity";
import CommunityNotice from "@/components/Community/CommunityNotice";
import CommunityMember from "@/components/Community/CommunityMember";
import CommunityTodo from "@/components/Community/CommunityTodo";
export default {
  name: "Community",
  props: { authType: { type: String, required: true, default: "admin" } }, //user or admin
  data: function () {
    return {
      tab: 0,
      communityName: "社团名称",
    };
  },
  computed: {
    communityTabs() {
      let allTabs = [
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
  },
  methods: {},
  components: {
    CommunityInfo,
    CommunityActivity,
    CommunityNotice,
    CommunityMember,
    CommunityTodo,
  },
};
</script>