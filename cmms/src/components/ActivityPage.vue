<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- 活动信息 -->
        <v-card class="mb-5 pa-10">
          <v-row>
            <v-col cols="10">
              <h1>{{ activity.activityName }}</h1>
            </v-col>
            <v-col cols="2">
              <v-chip color="green" text-color="white">
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
                {{ activity.activityStatus }}
              </v-chip>
            </v-col>
          </v-row>
          <v-row>
            <v-col>时间：{{ activity.activityTime }} 地点：{{ activity.activityLocation }}</v-col>
          </v-row>
          <markdown-it-vue-light class="md-body" :content="activity.activityContent" />
        </v-card>

        <!-- 评论区 -->
        <v-card class="mb-5 pa-5">
          <v-card-title>评论 {{comments.length}}</v-card-title>
          <!-- 发表评论 -->
          <v-text-field
            class="mx-10"
            v-model="message"
            type="text"
            outlined
            rounded
            solo
            clearable
            flat
            label="在这里发表评论"
            append-icon="mdi-emoticon-happy"
            append-outer-icon="mdi-send"
            clear-icon="mdi-close-circle"
            @click:append="chooseEmoticon"
            @click:append-outer="sendMessage"
            @click:clear="clearMessage"
          ></v-text-field>
          <!-- 评论列表 -->
          <v-list three-line>
            <v-list-item v-for="(comment, i) in comments" :key="i">
              <v-list-item-avatar color="primary"></v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{comment.username}}</v-list-item-title>
                <v-list-item-content class="my-3">{{comment.content}}</v-list-item-content>
                <v-list-item-subtitle>{{comment.time}}</v-list-item-subtitle>
                <v-divider></v-divider>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MarkdownItVueLight from "markdown-it-vue/dist/markdown-it-vue-light.umd";

export default {
  name: "ActivityPage",
  data: () => ({
    message: "",
    activity: {
      activityName: "Linux install party",
      activityTime: "2020-7-17, 15:00-16:00",
      activityLocation: "西校区3B101",
      activityStatus: "正在进行中",
      activityContent:
        "## 活动内容1\n ......\n ### 活动内容1.1\n ...... \n ## 活动内容2\n ......",
    },
    comments: [
      {
        username: "同学A",
        content: "测试评论",
        time: "1 小时前",
      },
      {
        username: "同学B",
        content: "测试评论",
        time: "1 小时前",
      },
      {
        username: "同学C",
        content: "测试评论",
        time: "1 小时前",
      },
    ],
  }),
  computed: {},
  methods: {
    chooseEmoticon() {
      // TODO: choose emoticon
      alert("choose emoticon");
    },
    sendMessage() {
      // TODO: send message
      alert("send message: " + this.message);
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    },
  },
  components: {
    MarkdownItVueLight,
  },
};
</script>
