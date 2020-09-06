<template>
  <v-app>
    <v-app-bar flat app class="background px-12">
      <v-btn-toggle tile color="primary" group>
        <v-btn id="tab-home" to="/">首页</v-btn>
        <v-btn id="tab-community" to="/tourist/community">社团</v-btn>
        <v-btn id="tab-activity" to="/tourist/activity">活动</v-btn>
      </v-btn-toggle>
      <v-btn right absolute rounded outlined href="/api/auth/cas_login" id="cas_login">统一身份验证登录</v-btn>
    </v-app-bar>
    <v-main class="background mt-2">
      <transition :name="transitionName" mode="out-in">
        <!-- <keep-alive> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    transitionName: "page-side2right",
  }),

  beforeRouteUpdate(to, from, next) {
    if (to.meta.pageNum > from.meta.pageNum)
      this.transitionName = "page-side2right";
    else if (to.meta.pageNum < from.meta.pageNum)
      this.transitionName = "page-side2left";
    next();
  },
};
</script>
<style scoped>
.login-btn {
  position: absolute;
  top: 20px;
  left: 35px;
  z-index: 1;
}
.page-side2left-enter-active,
.page-side2left-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.page-side2left-enter {
  opacity: 0;
  transform: translateX(-30%);
}
.page-side2left-leave-to {
  opacity: 0;
  transform: translateX(30%);
}
.page-side2right-enter-active,
.page-side2right-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.page-side2right-enter {
  opacity: 0;
  transform: translateX(30%);
}
.page-side2right-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
