<template>
  <v-container>
    <v-row>
      <v-col cols="4" v-for="(activity, i) in activities" :key="i">
        <activity-profile v-bind="activity">
          <template v-if="authLevel < 3 " v-slot:actions>
            <v-btn
              color="blue"
              right
              outlined
              link
              @click.stop.native.prevent="$router.push(`/activity/modify/${community.id}/${activity.id}`)"
              :id="'activity-edit-' + i"
            >编辑活动</v-btn>
            <v-btn
              absolute
              right
              color="red"
              outlined
              link
              @click.stop.native.prevent="deleteActivity(activity.id,i)"
              :id="'activity-delete-' + i"
            >删除活动</v-btn>
          </template>
        </activity-profile>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="authLevel < 3 ">
      <v-btn
        elevation="5"
        bottom
        fixed
        class="mx-2"
        fab
        dark
        color="green"
        :to="`/activity/create/${community.id}`"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import ActivityProfile from "@/components/Activity/ActivityProfile";
export default {
  name: "CommunityActivity",
  props: {
    authLevel: { type: Number, required: true, default: 3 },
    community: { required: true, default: null },
  },
  data: function () {
    return {
      activities: [],
    };
  },
  computed: {
    // activities() {
    //   if (!this.community) return [];
    //   let activities = [];
    //   let activity;
    //   for (let activityId of this.community.activities) {
    //     this.axios.get("/api/activity/" + activityId).then((response) => {
    //       activity = response.data;
    //       activity.detailLink = "/activity/" + activity.id;
    //       activities.push(activity);
    //     });
    //   }
    //   return activities;
    // },
  },
  methods: {
    getActivities() {
      if (!this.community) return;
      this.activities = [];
      let activity;
      for (let activityId of this.community.activities) {
        this.axios.get("/api/activity/" + activityId).then((response) => {
          activity = response.data;
          // activity.detailLink = {
          //   name: "ActivityPage",
          //   params: { activity_id: activityId, authLevel: this.authLevel },
          // };
          activity.detailLink = `${
            this.authLevel < 5 ? "" : "/tourist"
          }/activity/${activityId}`;
          this.activities.push(activity);
        });
      }
    },
    deleteActivity(activityId, index) {
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
              this.$emit("modifyCommunity");
              this.activities.splice(index, 1);
            });
        }
      });
    },
  },
  activated() {
    this.getActivities();
  },
  components: {
    ActivityProfile,
  },
};
</script>