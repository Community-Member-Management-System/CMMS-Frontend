<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col justify="center" align="center">
        <v-avatar color="orange" size="100">
          <v-icon dark v-if="!user.avatar">mdi-account-circle</v-icon>
          <v-img v-else :src="user.avatar"></v-img>
        </v-avatar>
        <h1 class="display-1 py-3">
          {{ user.nick_name }}
        </h1>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-card flat>
          <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="item in items" :key="item.tab"> {{ item.tab }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.tab">
<!--              <v-card flat class="mx-auto my-auto pa-2" v-for="(d, i) in classifiedData[it]" :key="i">-->
<!--                <v-card-subtitle> {{ d.time }}</v-card-subtitle>-->
<!--                <v-card-text class="text&#45;&#45;primary">{{ d.message }}</v-card-text>-->
<!--              </v-card>-->
              <div v-if="item.desc === 'info'">
                <!-- 个人信息 -->
                <v-card>
                  <v-card-text>
                    <ul>
                      <li>真实姓名: {{ user.real_name }}</li>
                      <li>学号: {{ user.student_id }}</li>
                      <li>Email: {{ user.email }}</li>
                      <li>电话: {{ user.phone }}</li>
                      <li>个人简介: {{ user.profile }}</li>
                    </ul>
                  </v-card-text>
                </v-card>
              </div>
              <div v-else>
                <!-- 社团 -->
                <v-card flat class="mx-auto my-auto pa-2" v-for="community in user.communities" :key="community.id">
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title>{{ community.name }}</v-card-title>
                      <v-card-subtitle>{{ community.profile }}</v-card-subtitle>
                    </div>
                    <v-avatar color="blue" class="ma-3" size="125" tile>
                      <!-- <v-img :src="item.src"></v-img> -->
                      <span v-if="!community.avatar" class="white--text headline">暂无头像</span>
                      <v-img v-else :src="community.avatar"></v-img>
                    </v-avatar>
                  </div>
                  <v-card-actions>
                    <v-btn color="primary darken-2" outlined link :to='"/community/" + community.id'>查看详情</v-btn>
                  </v-card-actions>
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
        { tab: '你的信息', desc: 'info' },
        { tab: '你的社团', desc: 'communities' }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.user;
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>
