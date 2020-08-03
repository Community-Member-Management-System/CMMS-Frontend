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
          <v-tabs background-color="grey lighten-3" fixed-tabs v-model="tab">
            <v-tab v-for="(it, idx) in communityDataType" :key="idx">{{ it }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(it, idx) in communityDataType" :key="idx">
              <!-- 社团信息 -->
              <v-row class="background" v-if="idx==0">
                <v-col>
                  <community-info></community-info>
                </v-col>
              </v-row>

              <!-- 社团活动 -->
              <v-row class="background" v-if="idx==1">
                <v-col>
                  <community-activity />
                </v-col>
              </v-row>

              <!-- 社团通知 -->
              <v-row class="background" v-if="idx==2">
                <v-col>
                  <community-notice />
                </v-col>
              </v-row>

              <!-- 社团成员 -->
              <v-row class="background" v-if="idx==3">
                <v-col>
                  <community-member />
                </v-col>
              </v-row>

              <!-- 待办事项 -->
              <v-row class="background" v-if="idx==4">
                <v-col>
                  <community-todo />
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
  data: function () {
    return {
      tab: null,
      communityName: "社团名称",
      communityDataType: [
        "社团信息",
        "社团活动",
        "社团通知",
        "社团成员",
        "待办事项",
      ],
    };
  },
  computed: {},
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