<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- 活动信息 -->
        <v-card class="mb-5 pa-10">
          <v-row>
            <v-col cols="10">
              <h1>{{ activity.title }}</h1>
            </v-col>
            <v-col cols="2">
              <v-chip color="green" text-color="white">
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
                {{ activity.status }}
              </v-chip>
            </v-col>
          </v-row>
          <v-row>
            <v-col>时间：{{ activity.location }} 地点：{{ activity.location }}</v-col>
          </v-row>
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
