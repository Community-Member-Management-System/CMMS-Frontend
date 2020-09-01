<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="4" justify="center" align="center">
        <v-avatar id="user-avatar" size="130">
          <v-icon dark v-if="!user.avatar" size="130">mdi-account-circle</v-icon>
          <v-img v-else :src="user.avatar"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="4" align="center">
        <div id="user-name" class="text-h4">{{ user.nick_name }}</div>
        <div class="mt-5">
          <v-btn id="user-follow" color="primary">关注</v-btn>
          <v-btn id="user-pm" class="ml-2" color="primary">私信</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-tabs background-color="#00000000" fixed-tabs v-model="tab">
          <v-tab v-for="(it, idx) in tabs" :key="idx">{{ it }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="mt-8" style="background-color:#00000000">
          <v-tab-item>
            <v-row>
              <v-col>
                <v-card class="px-5">
                  <v-card-title>基本信息</v-card-title>
                  <v-card-text>
                    <ul>
                      <li class="mt-1">账号: {{ user.id || user.pk }}</li>
                      <li class="mt-1">昵称: {{ user.nick_name }}</li>
                      <li class="mt-1">个人简介: {{ user.profile }}</li>
                    </ul>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card class="px-5">
                  <v-card-title>个人简介</v-card-title>
                  <v-card-text>{{ user.profile }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>

          <v-tab-item>
            <v-row v-for="community in user.communities" :key="community.id">
              <v-col>
                <v-card class="pa-5">
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title>{{ community.name }}</v-card-title>
                      <v-card-subtitle>{{ community.profile }}</v-card-subtitle>
                    </div>
                    <v-avatar color="blue" class="ma-3" size="125" tile>
                      <span v-if="!community.avatar" class="white--text headline">暂无头像</span>
                      <v-img v-else :src="community.avatar"></v-img>
                    </v-avatar>
                  </div>
                  <v-card-actions>
                    <v-btn
                      color="primary darken-2"
                      outlined
                      link
                      :to="'/community/' + community.id"
                    >查看详情</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UserPage",
  props: { userId: { type: String, required: true } },
  data: function () {
    return {
      tab: null,
      user: {},
      tabs: ["个人信息", "参加社团"],
    };
  },
  created() {
    this.axios.get(`/api/users/${this.userId}`).then((response) => {
      this.user = response.data;
    });
  },
  computed: {},
  methods: {},
};
</script>
