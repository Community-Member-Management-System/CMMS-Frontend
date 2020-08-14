<template>
  <v-container>
    <v-row align="center" justify="center" class="mx-auto py-12 my-12">
      <v-col class="d-flex justify-center" cols="12" md="10">
        <v-card class="d-inline-block mx-1 mx-sm-4 pa-2" v-for="(i, idx) in signCode" :key="idx">
          <v-card-text class="pa-0 text-h2 text-sm-h1 text-center">{{ i }}</v-card-text>
        </v-card>
      </v-col>
      <!-- <v-progress-linear value="15"></v-progress-linear> -->
    </v-row>
    <v-row
      class="text-h5 text-sm-h3"
      align="center"
      justify="center"
    >{{ communityName }} - {{ activityName }} 签到</v-row>
  </v-container>
</template>

<script>
const jsotp = require("jsotp");

export default {
  name: "ActivitySignClub",

  data: () => ({
    signCode: "******",
    activityName: "......",
    communityID: 0,
    communityName: "加载中",
    activityID: 1,
    otpKey: null,
    otpInstance: null,
  }),
  methods: {},
  mounted() {
    this.activityID = this.$route.params.activity_id;
    this.axios.get("/api/activity/" + this.activityID).then((response) => {
      this.activityName = response.data.title;
      this.communityID = response.data.related_community;
      this.axios.get("/api/community/" + this.communityID).then((response) => {
        this.communityName = response.data.name;
      });
    });

    this.axios
      .get("/api/activity/" + this.activityID + "/secret_key")
      .then((response) => {
        this.otpKey = response.data["secret_key"];
        this.otpInstance = jsotp.TOTP(this.otpKey);
      });
    this.$nextTick(function () {
      window.setInterval(() => {
        this.signCode = this.otpInstance.now();
      }, 3000);
    });
  },
};
</script>
