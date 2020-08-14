<template>
  <v-container>
    <v-row>
      <v-col class="pl-0">
        <v-card>
          <v-card-title>
            {{community.name}}
            <v-col align="end">
              <v-chip
                :color="community.join_status == '已加入'? 'green' :community.join_status == '审核中'?'yellow':'red' "
                text-color="white"
                v-if="authType == 'user' "
              >
                <v-avatar left>
                  <v-icon v-if="community.join_status == '已加入'">mdi-checkbox-marked-circle</v-icon>
                  <v-icon v-else-if="community.join_status == '审核中'">mdi-help-circle</v-icon>
                  <v-icon v-else>mdi-close-circle</v-icon>
                </v-avatar>
                {{ community.join_status }}
              </v-chip>
              <v-chip color="green" text-color="white" v-else>
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
                {{ community.valid ?'已通过审核':'未通过审核' }}
              </v-chip>
            </v-col>
          </v-card-title>

          <v-card-subtitle>
            <div class="mt-1">{{community.profile}}</div>
            <div class="mt-2">创建时间：{{community.date_created}}</div>
            <div class="mt-2">创建者: {{ community.creator }}, 目前拥有者: {{ community.owner }}</div>
          </v-card-subtitle>
        </v-card>
      </v-col>
      <!-- <v-col cols="3" align="center">
        <div>
          <v-avatar size="120" color="primary"></v-avatar>
        </div>

        <div class="mt-5">
          <div v-if="authType == 'user'">
            <v-btn outlined color="primary">关注</v-btn>
            <v-btn class="ml-2" outlined color="primary">加入</v-btn>
          </div>
          <div v-else>
            <v-btn outlined color="primary">编辑</v-btn>
            <v-btn class="ml-2" outlined color="red">解散</v-btn>
          </div>
        </div>
      </v-col>-->
    </v-row>
    <v-row justify="center" v-if="authType == 'admin' ">
      <v-btn
        elevation="5"
        bottom
        fixed
        class="mx-2"
        fab
        dark
        color="green"
        :to="`/community/${community.id}/modify`"
      >
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CommunityInfo",
  props: {
    authType: { type: String, required: true, default: "admin" }, //user or admin
    community: { required: true, default: null },
  },
  data: function () {
    return {
      // community: {
      //   id: 0,
      //   members: "string",
      //   join_status: "string",
      //   name: "USTC LUG",
      //   profile: "简介简介简介简介简介简介简介简介简介简介简介",
      //   date_created: "2020-08-06 09:24:38",
      //   avatar: "string",
      //   valid: true,
      //   creator: 0,
      //   owner: 0,
      //   admins: [0],
      // },
    };
  },
  computed: {},
  methods: {},
};
</script>