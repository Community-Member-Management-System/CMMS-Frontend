<template>
  <v-container>
    <div class="text-h5 mb-3">搜索: " {{ query }} " 的结果</div>
    <v-row dense>
      <v-col>
        <v-card flat>
          <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.tab">
              <v-card v-for="(item, i) in item.content" :key="i" cols="12" class="mb-5 pa-5">
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
                  <v-btn color="primary darken-2" outlined link :to="item.link">查看详情</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MarkdownItVueLight from "markdown-it-vue/dist/markdown-it-vue-light.umd";

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
    };
  },
  computed: {},
  components: {
    MarkdownItVueLight,
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
            for (let i = 0; i < response.data.length; i++) {
              this.items[0].content.push({
                name: response.data[i].name,
                profile: response.data[i].profile,
                avatar: response.data[i].avatar,
                link: "/community/" + response.data[i].id,
              });
            }
          });
        this.axios.get("/api/users?search=" + this.query).then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.items[1].content.push({
              name: response.data[i].nick_name,
              profile: response.data[i].profile,
              avatar: response.data[i].avatar,
              link: "/user/" + response.data[i].id,
            });
          }
        });
        this.axios
          .get("/api/activity?search=" + this.query)
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              this.items[2].content.push({
                name: response.data[i].title,
                profile: response.data[i].description,
                avatar: null,
                link: "/activity/" + response.data[i].id,
              });
            }
          });
      }
    },
  },
};
</script>
