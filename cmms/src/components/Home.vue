<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="4" justify="center" align="center">
        <v-avatar size="130">
          <v-icon dark v-if="!user.avatar" size="130">mdi-account-circle</v-icon>
          <v-img v-else :src="user.avatar"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="4" align="center">
        <div class="text-h4">{{ user.nick_name }}</div>
        <div class="mt-5">
          <v-btn color="warning" to="/setuserinfo">资料设置</v-btn>
        </div>
      </v-col>
    </v-row>

    <v-divider></v-divider>
    <v-row class="mb-10">
      <v-col>
        <v-tabs background-color="#00000000" fixed-tabs v-model="tab">
          <v-tab v-for="item in items" :key="item.tab" :id="'home-tab-' + item.desc">{{ item.tab }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="mt-8" style="background-color:#00000000">
          <v-tab-item v-for="item in items" :key="item.tab">
            <div v-if="item.desc === 'info'">
              <!-- 个人信息 -->
              <v-row>
                <v-col>
                  <v-card class="px-5">
                    <v-card-title>基本信息</v-card-title>
                    <v-card-text>
                      <ul>
                        <li class="mt-1">真实姓名: {{ user.real_name }}</li>
                        <li class="mt-1">学号: {{ user.student_id }}</li>
                        <li class="mt-1">Email: {{ user.email }}</li>
                        <li class="mt-1">电话: {{ user.phone }}</li>
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
            </div>
            <div v-else>
              <!-- 社团 -->
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
                    <v-card-actions v-if="community.valid">
                      <v-btn
                        color="primary darken-2"
                        outlined
                        link
                        :to="'/community/' + community.id"
                      >查看详情</v-btn>
                    </v-card-actions>
                    <v-card-actions v-else>
                      <v-chip color="red" text-color="white">
                        <v-avatar left>
                          <v-icon>mdi-help-circle</v-icon>
                        </v-avatar>审核中
                      </v-chip>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: function () {
    return {
      tab: null,
      items: [
        { tab: "我的信息", desc: "info" },
        { tab: "我的社团", desc: "communities" },
      ],
    };
  },
  computed: {
    user() {
      let user = this.$store.getters.user;
      if (!user) {
        user = {
          avatar: null,
          nick_name: "",
          real_name: "",
          email: "",
          phone: "",
          profile: "",
          communities: [],
        };
      }
      return user;
    },
  },
  methods: {},
  mounted() {},
};
</script>
