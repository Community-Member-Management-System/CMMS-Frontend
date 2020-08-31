<template>
  <v-app>
    <v-app-bar flat app class="background px-12">
      <v-btn-toggle tile color="primary" group>
        <v-btn id="tab-home" to="/tourist/welcome">首页</v-btn>
        <v-btn id="tab-community" to="/tourist/community">社团</v-btn>
        <v-btn id="tab-activity" to="/tourist/activity">活动</v-btn>
      </v-btn-toggle>
      <v-btn right absolute rounded outlined href="/api/auth/cas_login" id="cas_login">统一身份验证登录</v-btn>
    </v-app-bar>
    <v-main class="background mt-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data: () => ({}),
};
</script>
<style scoped>
.login-btn {
  position: absolute;
  top: 20px;
  left: 35px;
  z-index: 1;
}
</style>
