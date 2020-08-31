<template>
  <v-app>
    <v-container class="fill-height background" fluid>
      <v-btn
        class="mx-auto login-btn"
        large
        rounded
        outlined
        href="/api/auth/cas_login"
        id="cas_login"
      >统一身份验证登录</v-btn>
      <v-tabs class="fill-height" background-color="#EEEEEE" right>
        <v-tab id="tab-home">首页</v-tab>
        <v-tab id="tab-community">社团</v-tab>
        <v-tab id="tab-activity">活动</v-tab>
        <v-tab-item class="fill-height background">
          <v-row class="mx-auto py-auto" align="center" justify="center">
            <v-col>
              <div id="page-title" class="text-h2 text-center my-5">USTC | 社团</div>
              <div id="page-subtitle" class="text-h6 text-center mb-10">发现兴趣、寻找你喜欢的社团</div>
              <v-text-field
                id="search-input"
                class="search mx-auto"
                v-model="query"
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
          <SearchList id="searchlist" v-if="showResult" :query="searchInput"></SearchList>
        </v-tab-item>
        <v-tab-item class="fill-height background">
          <CommunityList></CommunityList>
        </v-tab-item>
        <v-tab-item class="fill-height background">
          <ActivityList></ActivityList>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-app>
</template>

<script>
import CommunityList from "./CommunityList";
import ActivityList from "./ActivityList";
import SearchList from "./SearchList";

export default {
  name: "Login",
  components: { CommunityList, ActivityList, SearchList },
  data: () => ({
    query: "",
    searchInput: "",
    showResult: false,
  }),
  methods: {
    search() {
      this.showResult = true;
      this.searchInput = this.query;
      this.$nextTick(() => {
        this.$vuetify.goTo("#searchlist");
      });
    },
  },
};
</script>
<style scoped>
.search {
  max-width: 500px;
}
.login-btn {
  position: absolute;
  top: 20px;
  left: 35px;
  z-index: 1;
}
</style>
