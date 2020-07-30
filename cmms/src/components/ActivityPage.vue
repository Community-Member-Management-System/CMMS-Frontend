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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MarkdownItVueLight from "markdown-it-vue/dist/markdown-it-vue-light.umd";

export default {
  name: "ActivityPage",
  data: () => ({
    activity: {
      activityName: "Linux install party",
      activityTime: "2020-7-17, 15:00-16:00",
      activityLocation: "西校区3B101",
      activityStatus: "正在进行中",
      activityContent:
        "## 活动内容1\n ......\n ### 活动内容1.1\n ...... \n ## 活动内容2\n ......",
    },
  }),
  computed: {},
  methods: {},
  components: {
    MarkdownItVueLight,
  },
};
</script>
