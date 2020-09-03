<template>
  <v-app>
    <v-app-bar flat app class="background px-12">
      <v-btn-toggle tile color="primary" group>
        <v-btn id="tab-home" @click="switchPage(0)">首页</v-btn>
        <v-btn id="tab-community" @click="switchPage(1)">社团</v-btn>
        <v-btn id="tab-activity" @click="switchPage(2)">活动</v-btn>
      </v-btn-toggle>
      <v-btn right absolute rounded outlined href="/api/auth/cas_login" id="cas_login">统一身份验证登录</v-btn>
    </v-app-bar>
    <v-main class="background mt-2">
      <transition :name="transitionName" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    transitionName: "page-side2right",
    pageNum: 0,
  }),
  methods: {
    switchPage(num) {
      let routers = ["/", "/tourist/community", "/tourist/activity"];
      if (num > this.pageNum) this.transitionName = "page-side2right";
      else if (num < this.pageNum) this.transitionName = "page-side2left";
      this.pageNum = num;
      if (this.$route.path !== routers[num]) this.$router.push(routers[num]);
    },
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
