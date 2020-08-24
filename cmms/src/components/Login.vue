<template>
  <v-app>
    <v-app-bar class="background" flat>
      <v-spacer></v-spacer>
      <v-btn class="mx-auto" rounded outlined href="/api/auth/cas_login" id="cas_login">
        <!-- <v-icon>mdi-account</v-icon> -->
        统一身份验证登录
      </v-btn>
    </v-app-bar>
    <v-container class="fill-height background" fluid>
      <v-row class="mx-auto" align="center" justify="center">
        <v-col>
          <div class="text-h2 text-center my-5">USTC | 社团</div>
          <div class="text-h6 text-center mb-10">发现兴趣、寻找你喜欢的社团</div>
          <v-text-field
            class="search mx-auto"
            rounded
            filled
            single-line
            hide-details
            autofocus
            placeholder="搜索社团、活动、成员 ..."
            append-icon="mdi-magnify"
            @click:append="search"
            @keydown.enter="search"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-img class="ma-10" src="../assets/community.svg"></v-img>
        </v-col>
      </v-row>
      <!-- <v-row class="mx-auto mb-5" align="center" justify="center">
        <v-btn depressed><v-icon>mdi-chevron-double-down</v-icon>查看所有社团信息</v-btn>
      </v-row> -->
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data: () => ({}),
  methods: {
    search() {
      this.$router.push({
        path: "/search",
        query: { q: this.query },
      });
    },
  },
};
</script>
<style scoped>
.search {
  max-width: 500px;
}
</style>