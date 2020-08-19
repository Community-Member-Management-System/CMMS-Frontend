<template>
  <v-container>
    <v-row>
      <v-col class="pl-0">
        <v-card>
          <v-card-title>
            基本信息
            <v-col align="end">
              <v-chip
                :color="community.join_status == '已加入'? 'green' :community.join_status == '审核中'?'yellow':'red' "
                text-color="white"
                v-if="authLevel === 3 "
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
            <ul>
              <li class="mt-1">社团名称：{{community.name}}</li>
              <li class="mt-2">创建时间：{{community.date_created}}</li>
              <li class="mt-2">创建者：{{ communityCreatorName || community.creator }}</li>
              <li class="mt-2">所有者：{{ communityOwnerName || community.owner }}</li>
            </ul>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pl-0">
        <v-card>
          <v-card-title>社团简介</v-card-title>
          <v-card-text>{{community.profile}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pl-0">
        <v-card>
          <v-card-title>睿课网</v-card-title>
          <v-card-text>
            链接：
            <a :href="community.rec_link">{{community.rec_link}}</a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="authLevel < 3 ">
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
    authLevel: { type: Number, required: true, default: 3 }, //user or admin
    community: { required: true, default: null },
  },
  data: function () {
    return {
      communityOwnerName: null,
      communityCreatorName: null,
    };
  },
  watch: {
    community(oldVal, newVal) {
      if (this.community && this.community.owner && this.community.creator) {
        this.axios
          .get(`/api/users/${this.community.creator}`)
          .then((response) => {
            this.communityCreatorName = response.data.nick_name;
          });
        this.axios
          .get(`/api/users/${this.community.owner}`)
          .then((response) => {
            this.communityOwnerName = response.data.nick_name;
          });
      }
    },
  },
  computed: {},
  methods: {},
};
</script>