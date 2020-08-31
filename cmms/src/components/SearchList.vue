<template>
  <v-container>
    <div class="text-h5 mb-3">搜索: " {{ query }} " 的结果</div>
    <v-row dense>
      <v-col>
        <v-card flat>
          <v-tabs background-color="#EEEEEE" fixed-tabs>
            <v-tab>社团</v-tab>
            <v-tab>用户</v-tab>
            <v-tab>活动</v-tab>
            <!-- community -->
            <v-tab-item class="background">
              <v-row dense>
                <v-col v-for="(item, i) in communities" :key="i" cols="12">
                  <v-card class="mb-5 pa-5">
                    <div class="d-flex flex-no-wrap justify-space-between">
                      <div>
                        <v-card-title class="headline" v-text="item.name"></v-card-title>
                        <v-card-text>
                          <markdown-it-vue-light class="md-body" :content="item.profile" />
                        </v-card-text>
                      </div>
                      <v-avatar color="blue" class="ma-3" size="125" tile>
                        <span v-if="!item.avatar" class="white--text headline">暂无头像</span>
                        <v-img v-else :src="item.avatar"></v-img>
                      </v-avatar>
                    </div>
                    <v-card-actions>
                      <v-btn
                        color="primary darken-2"
                        outlined
                        link
                        :to="'/community/' + item.id"
                      >查看主页</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- user -->
            <v-tab-item class="background">
              <v-row v-if="users.length" dense>
                <v-col v-for="(item, i) in users" :key="i" cols="12">
                  <UserItem
                    :userAvatar="item.avatar"
                    :userName="item.nick_name"
                    :userProfile="item.profile"
                    :userTarget="'/community/' + item.id"
                  ></UserItem>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- activity -->
            <v-tab-item class="background">
              <v-row v-if="activities.length" dense>
                <v-col v-for="(item, i) in activities" :key="i" cols="12">
                  <ActivityItem :item="item"></ActivityItem>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MarkdownItVueLight from "markdown-it-vue/dist/markdown-it-vue-light.umd";
import ActivityItem from "./ActivityItem.vue";
import UserItem from "./UserItem.vue";

export default {
  name: "SearchList",
  data: function () {
    return {
      tab: null,
      items: [
        { tab: "社团", content: [] },
        { tab: "用户", content: [] },
        { tab: "活动", content: [] },
      ],
      communities: [],
      activities: [],
      users: [],
    };
  },
  computed: {},
  components: {
    MarkdownItVueLight,
    ActivityItem,
    UserItem,
  },
  props: {
    query: String,
  },
  watch: {
    query(oldVal, newVal) {
      if (oldVal !== newVal) {
        this.search();
      }
    },
  },
  mounted() {
    this.search();
  },
  methods: {
    clear() {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].content = [];
      }
    },
    search() {
      if (this.query) {
        this.clear();
        this.axios
          .get("/api/community?search=" + this.query)
          .then((response) => {
            this.communities = response.data;
          });
        this.axios.get("/api/users?search=" + this.query).then((response) => {
          this.users = response.data;
        });
        this.axios
          .get("/api/activity?search=" + this.query)
          .then((response) => {
            this.activities = response.data;
          });
      }
    },
  },
};
</script>
