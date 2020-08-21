<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-10">
          <v-card-title>
            <v-icon>mdi-pencil</v-icon>审核社团
          </v-card-title>
          <v-form class="ma-5">
            <v-row>
              <v-col cols="5">
                <v-row justify="center">
                  <v-avatar color="primary" size="270" class="mt-12">
                    <span v-if="!community.avatar" class="white--text headline">Avatar</span>
                    <v-img v-else :src="community.avatar"></v-img>
                  </v-avatar>
                </v-row>
              </v-col>
              <v-col cols="7">
                <v-row>
                  <v-col>
                    <v-text-field v-model="community.name" label="社团名称 *" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      hint="http[s]?://rec.ustc.edu.cn/.+"
                      label="睿课网链接"
                      v-model="community.rec_link"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-textarea label="社团简介 *" outlined v-model="community.profile"></v-textarea>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
          <v-card-actions class="justify-center">
            <v-btn color="primary" large @click="audit(true)">
              <v-icon>mdi-check</v-icon>通过
            </v-btn>
            <v-btn color="red" large @click="audit(false)">
              <v-icon>mdi-close</v-icon>拒绝
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AuditCommunityDetail",
  props: {
    communityId: { type: String, required: true }, //
  },
  data: function () {
    return {
      community: {
        name: "",
        profile: "",
        avatar: null,
        rec_link: "",
      },
    };
  },

  computed: {},

  created() {
    let url = `/api/community/audit/${this.communityId}`;
    this.axios.get(url).then((response) => {
      this.community = response.data;
    });
  },

  methods: {
    audit(valid) {
      this.axios
        .patch(
          "/api/community/audit/" + this.communityId + "/",
          {
            valid: valid,
          },
          {
            headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
          }
        )
        .then((response) => {
          if (!valid) {
            this.axios
              .delete("/api/community/" + this.communityId, {
                headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
              })
              .then((response) => {
                this.$toasted.show("审核成功");
                this.$router.push("/system-management");
              });
          } else {
            this.$toasted.show("审核成功");
            this.$router.push("/system-management");
          }
        });
    },
  },
};
</script>
