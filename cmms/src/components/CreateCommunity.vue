<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-10">
          <v-card-title>
            <v-icon>mdi-pencil</v-icon>创建社团
          </v-card-title>
          <v-form class="ma-5" v-model="valid">
            <v-row>
              <v-col cols="5">
                <v-row justify="center">
                  <v-avatar color="primary" size="180" class="mt-6">
                    <span class="white--text headline">Avatar</span>
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
  name: "CreateCommunity",
  data: function () {
    return {
      valid: false,
      community: {
        name: "",
        profile: "",
        avatar: null,
      },
    };
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

      // TODO: 上传头像文件，设置 avatar image
    },
    submit() {
      // TODO: 提交
      alert("信息已保存");
    },
  },
};
</script>