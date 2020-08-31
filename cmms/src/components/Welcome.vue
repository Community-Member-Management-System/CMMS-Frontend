<template>
  <v-container fluid>
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
  </v-container>
</template>

<script>
import SearchList from "./SearchList";

export default {
  name: "Login",
  components: { SearchList },
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
</style>