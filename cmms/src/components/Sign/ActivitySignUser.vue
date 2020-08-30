<template>
  <v-container>
    <v-row
      class="py-12 my-12 text-h4 text-md-h3"
      justify="center"
      align="center"
    >{{ communityName }} {{ activityName }} 活动签到</v-row>
    <v-row justify="center" align="center" class="py-12 my-12">
      <v-col cols="10" sm="6">
        <v-form v-model="valid">
          <v-text-field
            class="text-h5"
            v-model="digitCode"
            type="text"
            placeholder="请输入 6 位签到码"
            rounded
            filled
            :rules="[v => (((v.length === 6) && /\d\d\d\d/.test(v)) || '签到码无效')]"
            :append-icon="valid ? 'mdi-arrow-right' : ''"
            @click:append="verifyRequest"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ActivitySignClub",
  data: function () {
    return {
      valid: false,
      digitCode: "",
      activityID: 1,
      communityName: "无名社团",
      activityName: "无名活动",
    };
  },
  mounted() {
    this.activityID = this.$route.params.activity_id;
    this.axios.get("/api/activity/" + this.activityID).then((response) => {
      this.activityName = response.data.title;
      this.communityID = response.data.related_community.id;
      this.axios.get("/api/community/" + this.communityID).then((response) => {
        this.communityName = response.data.name;
      });
    });
  },
  methods: {
    verifyRequest: function () {
      this.axios
        .post(
          "/api/activity/" + this.activityID + "/sign_in",
          { otp: this.digitCode },
          { headers: { "X-CSRFToken": this.$cookies.get("csrftoken") } }
        )
        .then((response) => {
          this.$toasted.show("签到成功！", {
            position: "top-center",
            duration: 3000,
          });
          this.valid = true;
        })
        .catch((error) => {
          this.$toasted.show("签到失败！请检查签到码是否有误", {
            position: "top-center",
            duration: 3000,
          });
          console.log(error);
        });
    },
  },
};
</script>