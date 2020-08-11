<template>
  <v-app v-resize="onResize">
    <!-- navigation drawer -->
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" app>
      <v-list-item class="px-2">
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-list-item-title class="title ml-5">USTC | 社团</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="(item, idx) in list"
          :key="idx+'1'"
          link
          :to="item.targetPath"
          :color="item.color"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>

        <!-- 我的活动 下拉列表 -->
<!--        <v-list-group-->
<!--          v-for="(item, idxout) in outerList"-->
<!--          :key="idxout+'2'"-->
<!--          :prepend-icon="item.icon"-->
<!--          :color="item.color"-->
<!--          no-action-->
<!--        >-->
<!--          <template v-slot:activator>-->
<!--            <v-list-item-content>-->
<!--              <v-list-item-title>{{ item.title }}</v-list-item-title>-->
<!--            </v-list-item-content>-->
<!--          </template>-->

<!--          <v-list-item-->
<!--            v-for="(innerItem, idxin) in innerList[idxout]"-->
<!--            :key="idxin+'3'"-->
<!--            link-->
<!--            :to="innerItem.targetPath"-->
<!--            :color="item.color"-->
<!--          >-->
<!--            <v-list-item-title>{{ innerItem.title }}</v-list-item-title>-->
<!--          </v-list-item>-->
<!--        </v-list-group>-->
      </v-list>
    </v-navigation-drawer>

    <!-- content -->
    <v-main class="background">
      <!-- 回到顶部浮动按钮 -->
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        dark
        fixed
        bottom
        right
        color="primary"
        @click="toTop"
      >
        <v-icon>mdi-arrow-up-bold</v-icon>
      </v-btn>
      <!-- app bar -->
      <v-app-bar class="background" flat>
        <v-btn class="d-inline d-lg-none" icon @click.stop="drawer = true">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <!-- TODO: 搜索栏 -->
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
          <v-icon>mdi-brightness-7</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-divider vertical></v-divider>
        <v-avatar class="mx-5" color="grey" size="40">
          <v-icon dark v-if="!user.avatar">mdi-account-circle</v-icon>
          <v-img v-else :src="user.avatar"></v-img>
        </v-avatar>

        <!-- user drop-down menu -->
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="rgba(0, 0, 0, 0)" depressed v-on="on">
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-card class="px-3">
            <v-list>
              <v-list-item>
                <v-list-item-avatar color="grey">
                  <v-icon dark v-if="!user.avatar">mdi-account-circle</v-icon>
                  <v-img v-else :src="user.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <!-- TODO: get user info -->
                  <v-list-item-title>{{ user.nick_name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ user.profile }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item to="/setuserinfo">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>资料设置</v-list-item-title>
              </v-list-item>
              <v-list-item to="/create-community">
                <v-list-item-icon>
                  <v-icon>mdi-newspaper-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-title>创建社团</v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout()">
                <v-list-item-icon>
                  <v-icon>mdi-logout-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-title>退出登录</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-app-bar>

      <!-- 返回浮动按钮 -->
      <v-btn
        class="mx-5"
        fab
        dark
        color="primary"
        style="position: sticky; top: 30px; z-index:1;"
        @click="goBack"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    drawer: true,
    mini: false,
    fab: false,
    user: {
      id: "",
      new: true,
      nick_name: "",
      avatar: "",
      profile: "",
      communities: [],
      student_id: "",
      real_name: "",
      email: "",
      phone: "",
    },
    list: [
      {
        title: "我的信息",
        icon: "mdi-account",
        color: "green",
        targetPath: "/home",
      },
      {
        title: "所有社团",
        icon: "mdi-account-group",
        color: "orange accent-4",
        targetPath: "/myclubs",
      },
      // {
      //     title: "系统管理",
      //     icon: "mdi-view-dashboard",
      //     color: "#000000",
      //     targetPath: "",
      // },
    ],

    // outerList: [
    //   {
    //     title: "我的活动",
    //     icon: "mdi-calendar-multiselect",
    //     color: "light-blue accent-4",
    //     targetPath: "/",
    //   },
    // ],
    // innerList: [
    //   [
    //     {
    //       title: "正在进行的活动",
    //       color: "light-blue accent-4",
    //       targetPath: "/activity-now",
    //     },
    //     {
    //       title: "已经结束的活动",
    //       color: "light-blue accent-4",
    //       targetPath: "/activity-fin",
    //     },
    //     {
    //       title: "将要进行的活动",
    //       color: "light-blue accent-4",
    //       targetPath: "/activity-due",
    //     },
    //   ],
    // ],
  }),
  mounted() {
    this.onResize();
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      await this.axios
        .post("/api/auth/check", null, {
          headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
        })
        .then((response) => {
          // console.log("Check User: ");
          // console.log(response);
          this.user.id = response.data.userid.toString();
          this.user.new = response.data.new;
          if (this.user.new) {
            this.$router.push('SetUserInfo')
          }
        });
      let url = "/api/users/" + this.user.id;
      this.axios.get(url).then((response) => {
        // console.log("Fetch User Info: " + url);
        // console.log(response);
        this.user.nick_name = response.data.nick_name;
        this.user.avatar = response.data.avatar;
        this.user.profile = response.data.profile;
        this.user.communities = response.data.communities;
        this.user.student_id = response.data.student_id;
        this.user.real_name = response.data.real_name;
        this.user.email = response.data.email;
        this.user.phone = response.data.phone;
        // set user state
        this.$store.commit("setUser", this.user);
      });
    },
    onResize() {
      if (
        this.$vuetify.breakpoint.name === "lg" ||
        this.$vuetify.breakpoint.name === "xl"
      ) {
        this.drawer = true;
      } else {
        this.mini = false;
      }
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    goBack() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.go(-1);
      }
    },
    logout() {
      // TODO: send to backend
      this.axios
        .post("/api/auth/logout", null, {
          headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
        })
        .then((response) => {
          // console.log(response);
          alert(response.data.detail);
        });
      // clear cookies
      this.$cookies.remove("login");
      // jump to login page
      this.$router.push({ path: "/" });
    },
  },
};
</script>
