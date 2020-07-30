<template>
  <v-container>
    <!-- head -->
    <v-row>
      <v-col justify="center" align="center">
        <v-img height="250px">
          <v-avatar color="primary" size="100">
            <!-- TODO: Image -->
          </v-avatar>
          <h1 class="display-1 py-3">{{ clubname }}</h1>
          <v-btn class="mx-2 mb-4" color="primary">- 解散社团</v-btn>
          <!-- <v-btn class="mx-2 mb-4" color="primary">管理社团</v-btn> -->
        </v-img>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <!-- body -->
    <v-row class="mb-10">
      <v-col>
        <v-card flat>
          <v-tabs background-color="grey lighten-3" fixed-tabs v-model="tab">
            <v-tab v-for="(it, idx) in clubDataType" :key="idx">{{ it }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(it, idx) in clubDataType" :key="idx">
              <!-- 社团基本信息 -->
              <v-row class="background" v-if="idx==0">
                <v-col>
                  <v-card class="ma-5 pa-5">
                    <v-card-text>一些社团信息</v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <!-- 社团活动 -->
              <v-row class="background" v-if="idx==1">
                <v-col>
                  <club-activity-management />
                </v-col>
              </v-row>

              <!-- 社团通知 -->
              <v-row class="background" v-if="idx==2">
                <v-col>
                  <v-card class="ma-5 pa-5" v-for="(d, i) in data.clubNotice" :key="i">
                    <v-card-title>{{ d.title }}</v-card-title>
                    <v-card-subtitle>{{ d.subtitle }}</v-card-subtitle>
                    <v-card-text>{{ d.message }}</v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <!-- 待办事项 -->
              <v-row class="background" v-if="idx==3">
                <v-col>
                  <club-todo-management />
                </v-col>
              </v-row>

              <!-- 成员信息 -->
              <v-row class="background" v-if="idx==4">
                <v-col>
                  <club-member-management />
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
import ActivityItem from "@/components/ActivityItem";
import ClubMemberManagement from "@/components/ClubManagement/ClubMemberManagement";
import ClubActivityManagement from "@/components/ClubManagement/ClubActivityManagement";
import ClubTodoManagement from "@/components/ClubManagement/ClubTodoManagement";
export default {
  name: "ClubManagement",
  data: function () {
    return {
      tab: null,
      clubname: "社团名称",
      clubDataType: [
        "社团信息",
        "社团活动",
        "社团通知",
        "待办事项",
        "成员信息",
      ],
      data: {
        clubInfo: {
          message: {
            time: "2020-7-15",
          },
        },

        clubNotice: [
          {
            title: "zjx tql",
            subtitle: "2020-7-18",
            message: "wuhu qifei",
          },
          {
            title: "zjx tql",
            subtitle: "2020-7-18",
            message: "芜湖，起飞",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {},
  components: {
    ClubMemberManagement,
    ClubActivityManagement,
    ClubTodoManagement,
  },
};
</script>