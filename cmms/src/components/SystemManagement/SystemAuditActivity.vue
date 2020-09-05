<template>
  <v-container>
    <v-card v-for="(item, i) in items" :key="i" :to="`/activity/${item.id}`" class="pa-3 mb-3">
      <v-row>
        <v-col cols="10">
          <v-card-title>
            <div class="text-truncate">{{item.title}}</div>
          </v-card-title>

          <v-card-subtitle>
            <div class="mt-1">开始时间：{{$moment(item.start_time).format("YYYY-MM-DD HH:mm:ss") }}</div>
            <div class="mt-1">结束时间：{{$moment(item.end_time).format("YYYY-MM-DD HH:mm:ss") }}</div>
            <div class="mt-1">地点：{{ item.location }}</div>
          </v-card-subtitle>
        </v-col>

        <!-- 状态 chips -->
        <v-col cols="2">
          <v-chip v-if="item.status === '未开始'" color="blue" text-color="white">
            <v-avatar left>
              <v-icon>mdi-calendar-clock</v-icon>
            </v-avatar>未开始
          </v-chip>
          <v-chip v-else-if="item.status === '进行中'" color="yellow darken-3" text-color="white">
            <v-avatar left>
              <v-icon>mdi-clock-outline</v-icon>
            </v-avatar>进行中
          </v-chip>
          <v-chip v-else color="green" text-color="white">
            <v-avatar left>
              <v-icon>mdi-checkbox-marked-circle</v-icon>
            </v-avatar>已结束
          </v-chip>
        </v-col>
      </v-row>

      <v-card-text>
        <div class="text-truncate">{{item.description}}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="blue"
          outlined
          link
          @click.stop.native.prevent="$router.push(`/activity/modify/${item.related_community.id}/${item.id}`)"
          :id="'activity-edit-' + i"
        >编辑活动</v-btn>
        <v-btn
          color="red"
          outlined
          link
          @click.stop.native.prevent="deleteActivity(item.id,i)"
          :id="'activity-delete-' + i"
        >删除活动</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "SystemAuditActivity",
  data: function () {
    return {
      items: [],
    };
  },
  computed: {},
  activated() {
    this.axios.get("/api/activity").then((response) => {
      this.items = response.data;
    });
  },
  computed: {},
  methods: {
    deleteActivity(activityId) {
      this.$confirm("其他相关活动信息将一并删除", {
        title: "确认删除该活动？",
      }).then((res) => {
        if (res) {
          this.axios
            .delete("/api/activity/" + activityId, {
              headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
            })
            .then((response) => {
              this.$toasted.show("删除成功！", {
                theme: "bubble",
                position: "top-center",
                duration: 3000,
              });
              this.axios.get("/api/activity").then((response) => {
                this.items = response.data;
              });
            });
        }
      });
    },
  },
  props: {
    status: String,
    title: String,
    description: String,
    start_time: String,
    end_time: String,
    location: String,
    detailLink: [Object, String],
  },
};
</script>