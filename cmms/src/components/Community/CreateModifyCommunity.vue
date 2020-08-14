<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-10">
          <v-card-title>
            <v-icon>mdi-pencil</v-icon>
            {{isCreatingCommunity?'创建社团':'修改社团'}}
          </v-card-title>
          <v-form class="ma-5" v-model="valid">
            <v-row>
              <v-col cols="5">
                <v-row justify="center">
                  <v-avatar color="primary" size="180" class="mt-6">
                    <span v-if="!community.avatar" class="white--text headline">Avatar</span>
                    <v-img v-else :src="community.avatar"></v-img>
                  </v-avatar>
                </v-row>
                <v-row justify="center" class="mt-4">
                  <v-btn outlined large rounded color="primary" @click="onButtonClick">上传头像</v-btn>
                  <input
                    ref="uploader"
                    class="d-none"
                    type="file"
                    accept="image/png, image/jpeg, image/bmp"
                    @change="onFileChanged"
                  />
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
                    <v-textarea label="社团简介 *" outlined v-model="community.profile"></v-textarea>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
          <v-card-actions class="justify-center">
            <v-btn color="primary" large :disabled="!valid" @click="submit">
              <v-icon>mdi-check</v-icon>提交
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CreateModifyCommunity",
  props: {
    communityId: { type: String, required: false, default: null }, //
  },
  data: function () {
    return {
      valid: false,
      community: {
        name: "",
        profile: "",
        avatar: null,
      },
      selectedFile: null,
    };
  },

  computed: {
    isCreatingCommunity() {
      if (this.communityId !== null) return false;
      else return true;
    },
  },

  created() {
    // 若为修改社团，则拉取社团信息
    if (!this.isCreatingCommunity) {
      let url = `/api/community/${this.communityId}`;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": this.$cookies.get("csrftoken"),
        },
      };
      this.axios.get(url, config).then((response) => {
        this.community = response.data;
        // TODO 判断是否有修改的权限
      });
    }
  },

  methods: {
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.community.avatar = e.target.result;
      };
      if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile);
      }
    },
    submit() {
      let formData = new FormData();
      formData.append("name", this.community.name);
      formData.append("profile", this.community.profile);
      if (this.selectedFile) formData.append("avatar", this.selectedFile);

      let url = "/api/community/";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": this.$cookies.get("csrftoken"),
        },
      };
      if (this.isCreatingCommunity) {
        this.axios
          .post(url, formData, config)
          .then((response) => {
            this.$toasted.show("创建完成，请等待管理员审核。");
            return response;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.axios
          .patch(`/api/community/${this.communityId}`, formData, config)
          .then((response) => {
            this.$toasted.show("修改成功！");
            this.community = response.data;
            this.$router.push({ path: `/community/${this.communityId}` });
          })
          .catch((err) => {
            this.$toasted.show("修改失败！");
            console.log(err);
          });
      }
    },
  },
};
</script>
