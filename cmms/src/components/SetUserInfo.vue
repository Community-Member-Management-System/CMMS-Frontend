<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-10">
          <v-card-title>
            <v-icon>mdi-pencil</v-icon>设置个人信息
          </v-card-title>
          <v-form class="ma-5" v-model="valid">
            <v-row>
              <v-col cols="2">
                <v-row justify="center">
                  <v-avatar size="120">
                    <!-- <span class="white--text headline">Avatar</span> -->
                    <v-icon dark v-if="!user.avatar">mdi-account-circle</v-icon>
                    <v-img v-else :src="user.avatar"></v-img>
                  </v-avatar>
                </v-row>
                <v-row justify="center" class="mt-3">
                  <v-btn outlined rounded color="primary" @click="onButtonClick">上传头像</v-btn>
                  <input
                    ref="uploader"
                    class="d-none"
                    type="file"
                    accept="image/png, image/jpeg, image/bmp"
                    @change="onFileChanged"
                  />
                </v-row>
              </v-col>
              <v-col cols="10">
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="user.nick_name"
                      label="昵称 *"
                      required
                      :rules="nickNameRules"
                      id='userinfo-nickname'
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="user.real_name"
                      label="真实姓名 *"
                      required
                      :rules="realNameRules"
                      id='userinfo-realname'
                    ></v-text-field>
                  </v-col>
                  <!-- <v-col>
                    <v-select label="性别 *" v-model="gender" required :items="['男', '女', '保密']"></v-select>
                  </v-col>-->
                </v-row>
                <v-text-field v-model="user.email" label="Email" required :rules="emailRules" id='userinfo-email'></v-text-field>
              </v-col>
            </v-row>
            <v-text-field v-model="user.phone" label="手机" :rules="phoneRules" id='userinfo-phone'></v-text-field>
            <v-text-field v-model="user.profile" label="个人简介" :rules="profileRules" id='userinfo-profile'></v-text-field>
          </v-form>
          <v-card-actions class="justify-center">
            <v-btn color="primary" large :disabled="!valid" @click="submit" id='userinfo-submit'>
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
  name: "SetUserInfo",
  data: function () {
    return {
      user: {
        avatar: null,
        nick_name: "",
        real_name: "",
        email: "",
        phone: "",
        profile: "",
      },
      // gender: "",
      valid: false,
      isSelecting: false,
      selectedFile: null,
      nickNameRules: [
        (v) => !!v || "昵称不能为空",
        (v) => (v && v.length <= 64) || "昵称不能超过 64 个字符",
      ],
      realNameRules: [
        (v) => !!v || "真实姓名不能为空",
        (v) => (v && v.length <= 16) || "真实姓名不能超过 16 个字符",
      ],
      emailRules: [
        // (v) => !!v || "Email 不能为空",
        (v) => !v || /.+@.+\..+/.test(v) || "Email 无效",
      ],
      phoneRules: [(v) => !v || /^1(3|4|5|7|8)\d{9}$/.test(v) || "手机号无效"],
      profileRules: [(v) => v.length <= 256 || "个人简介不能超过 256 个字符"],
    };
  },
  computed: {
    vuexUser() {
      return this.$store.getters.user;
    },
  },
  watch: {
    vuexUser: {
      handler(newVal, oldVal) {
        if (newVal) this.user = { ...newVal };
      },
      immediate: true,
    },
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
      // console.log(this.selectedFile);

      // 上传头像文件，设置 avatar image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.user.avatar = e.target.result;
      };
      if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile);
      }
    },
    submit() {
      // TODO: 提交
      let formData = new FormData();
      formData.append("real_name", this.user.real_name);
      formData.append("nick_name", this.user.nick_name);
      if (this.user.email) formData.append("email", this.user.email);
      if (this.user.phone) formData.append("phone", this.user.phone);
      if (this.user.profile) formData.append("profile", this.user.profile);
      if (this.selectedFile) formData.append("avatar", this.selectedFile);

      let url = "/api/users/" + this.user.id + "/";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": this.$cookies.get("csrftoken"),
        },
      };
      this.axios
        .patch(url, formData, config)
        .then((response) => {
          this.$store.dispatch("updateUser", this.user.id);
          this.$toasted.show("信息已保存");
          return response;
        })
        .catch((err) => {
          let msg = ""
          if (err.response) {
            console.log(err.response)
            if (err.response.data.email) {
              msg = "Email 与其他用户重复！"
            }
          }
          this.$toasted.show("信息保存失败。" + msg)
          console.log(err);
        });
    },
  },
};
</script>
