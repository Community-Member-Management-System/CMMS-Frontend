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
                  <v-avatar color="primary" size="120">
                    <span class="white--text headline">Avatar</span>
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
                    <v-text-field v-model="name" label="昵称 *" required :rules="nameRules"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-select label="性别 *" v-model="gender" required :items="['男', '女', '保密']"></v-select>
                  </v-col>
                </v-row>
                <v-text-field v-model="email" label="Email *" required :rules="emailRules"></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="phone"
              label="手机"
              :rules="[v => (!v || /^1(3|4|5|7|8)\d{9}$/.test(v) || '手机号无效')]"
            ></v-text-field>
            <v-text-field
              v-model="description"
              label="个人简介"
              :rules="[v => v.length <= 50 || '个人简介不能超过 50 个字符']"
            ></v-text-field>
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
  name: "SetUserInfo",
  data: function () {
    return {
      avatar: null,
      name: "",
      gender: "",
      phone: "",
      email: "",
      description: "",
      valid: false,
      nameRules: [
        (v) => !!v || "昵称不能为空",
        (v) => (v && v.length <= 10) || "昵称不能超过 10 个字符",
      ],
      emailRules: [
        (v) => !!v || "Email 不能为空",
        (v) => !v || /.+@.+\..+/.test(v) || "Email 无效",
      ],
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