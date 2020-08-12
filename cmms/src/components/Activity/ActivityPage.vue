<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- 活动信息 -->
        <v-card class="mb-5 pa-10">
          <v-row>
            <v-col cols="10">
              <div class="text-h4">{{ activity.title }}</div>
            </v-col>
            <v-col cols="2">
              <v-chip v-if="activity.status === '未开始'" color="blue" text-color="white">
                <v-avatar left>
                  <v-icon>mdi-calendar-clock</v-icon>
                </v-avatar>未开始
              </v-chip>
              <v-chip v-if="activity.status === '进行中'" color="yellow darken-3" text-color="white">
                <v-avatar left>
                  <v-icon>mdi-clock-outline</v-icon>
                </v-avatar>进行中
              </v-chip>
              <v-chip v-if="activity.status === '已结束'" color="green" text-color="white">
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>已结束
              </v-chip>
            </v-col>
          </v-row>
          <v-card-text class="px-0 py-1">创建于：{{ activity.created_date }}</v-card-text>
          <v-card-text class="px-0 py-1">活动时间：{{ activity.start_time }} - {{ activity.end_time }}</v-card-text>
          <v-card-text class="px-0 py-1">
            <!-- <v-icon>mid-map-marker</v-icon> -->
            活动地点：{{ activity.location }}
          </v-card-text>
          <v-divider class="my-5"></v-divider>
          <markdown-it-vue-light class="md-body" :content="activity.description" />
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
      location: "",
      title: "",
      description: "",
      start_time: "",
      end_time: "",
      created_date: "",
      status: "",
    },
  }),
  computed: {},
  mounted() {
    this.axios
      .get("/api/activity/" + this.$route.params.activity_id)
      .then((response) => {
        console.log(response);
        this.activity.location = response.data.location;
        this.activity.title = response.data.title;
        this.activity.description = response.data.description;
        this.activity.start_time = response.data.start_time;
        this.activity.end_time = response.data.end_time;
        this.activity.created_date = response.data.created_date;
        this.activity.status = response.data.status;
      });
  },
  methods: {},
  components: {
    MarkdownItVueLight,
  },
};
</script>