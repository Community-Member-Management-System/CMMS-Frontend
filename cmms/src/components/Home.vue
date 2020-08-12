<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col justify="center" align="center">
        <v-avatar size="200">
          <v-icon dark v-if="!user.avatar">mdi-account-circle</v-icon>
          <v-img v-else :src="user.avatar"></v-img>
        </v-avatar>
      </v-col>
      <v-col>
        <div class="text-h4">{{ user.nick_name }}</div>
        <div class="text-h6">{{ user.profile }}</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mb-10">
      <v-col>
        <v-card flat>
          <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.tab">
              <div v-if="item.desc === 'info'">
                <!-- 个人信息 -->
                <v-card class="px-5">
                  <v-card-text>
                    <ul>
                      <li>真实姓名: {{ user.real_name }}</li>
                      <li>学号: {{ user.student_id }}</li>
                      <li>Email: {{ user.email }}</li>
                      <li>电话: {{ user.phone }}</li>
                    </ul>
                  </v-card-text>
                </v-card>
              </div>
              <div v-else>
                <!-- 社团 -->
                <v-card class="pa-5" flat v-for="community in user.communities" :key="community.id">
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
                  <v-divider class="my-3"></v-divider>
                </v-card>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
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
        { tab: "我的社团", desc: "communities" },
        { tab: "我的信息", desc: "info" },
      ],
    };
  },
  computed: {
    user() {
      let user = this.$store.getters.user;
      if (!user) {
        user =  {
          avatar: null,
          nick_name: "",
          real_name: "",
          email: "",
          phone: "",
          profile: "",
          communities: []
        }
      }
      return user
    },
  },
  methods: {},
  mounted() {},
};
</script>
