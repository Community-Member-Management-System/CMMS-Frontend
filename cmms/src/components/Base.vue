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

        <!-- 搜索 -->
        <v-btn icon @click="expand = !expand">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-text-field
          v-show="expand"
          v-model="query"
          rounded
          filled
          single-line
          dense
          hide-details
          autofocus
          placeholder="搜索社团、活动、成员 ..."
          append-icon="mdi-arrow-right"
          @click:append="search"
          @keydown.enter="search"
        ></v-text-field>

        <!-- 切换主题 -->
        <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
          <v-icon>mdi-brightness-7</v-icon>
        </v-btn>

        <!-- 通知 -->
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="rgba(0, 0, 0, 0)" depressed v-on="on">
              <v-badge color="red" dot>
                <v-icon>mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-card class="mx-auto px-3" max-width="300">
            <v-list>
              <v-list-item v-if="notice.length == 0">
                <v-list-item-content>
                  <v-list-item-subtitle>暂时没有通知</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <template v-else v-for="(item, index) in notice">
                <v-list-item :key="item.pk">
                  <v-list-item-content>
                    <v-list-item-title>标题</v-list-item-title>
                    <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text>1 min</v-list-item-action-text>
                    <v-icon>close</v-icon>
                  </v-list-item-action>
                </v-list-item>
                <v-divider v-if="index + 1 < notice.length" :key="index"></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-menu>

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
          <v-card class="mx-auto px-3" max-width="300">
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
    expand: false,
    query: "",
    notice_status: [],
    notice: [],
    list: [
      {
        title: "我的主页",
        icon: "mdi-account",
        color: "green",
        targetPath: "/home",
      },
      {
        title: "所有社团",
        icon: "mdi-account-group",
        color: "orange accent-4",
        targetPath: "/clubs",
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
  computed: {
    user() {
      let user = this.$store.getters.user;
      if (!user) {
        user = {
          avatar: null,
          nick_name: "",
          real_name: "",
          email: "",
          phone: "",
          profile: "",
          communities: [],
        };
      }
      return user;
    },
  },
  methods: {
    fetchUserInfo() {
      this.axios
        .post("/api/auth/check", null, {
          headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
        })
        .then((response) => {
          let userID = response.data.userid.toString();
          let userNew = response.data.new;
          if (userNew) {
            this.$router.push("SetUserInfo");
          }
          this.$store.dispatch("updateUser", userID);
        });
    },
    fetchNoticeList() {
      // this.axios
      //   .get("/api/notice", null, {
      //     headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
      //   })
      //   .then((response) => {
      //     let userID = response.data.userid.toString();
      //     let userNew = response.data.new;
      //     if (userNew) {
      //       this.$router.push("SetUserInfo");
      //     }
      //     this.$store.dispatch("updateUser", userID);
      //   });
    },
    timeFormat(timestamp) {
      let mistiming = Math.round((Date.now() - timestamp) / 1000);
      let arrr = ["年", "个月", "星期", "天", "小时", "分钟", "秒"];
      let arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
      for (let i = 0; i < arrn.length; i++) {
        let inm = Math.floor(mistiming / arrn[i]);
        if (inm != 0) {
          return inm + arrr[i] + "前";
        }
      }
    },
    getNoticeTitle(type, subtype) {
      switch (type) {
        case "PC":
          switch (subtype) {
            case 0:
              return "被邀请加入社团";
            case 1:
              return "取消管理员";
            case 2:
              return "被踢出社团";
          }
        case "CA":
          switch (subtype) {
            case 0:
              return "创建社团审核结果";
            case 1:
              return "加入社团审核结果";
          }
        case "B":
          return "你的账户已被封禁";
        case "C_AN":
          switch (subtype) {
            case 0:
              return "活动创建";
            case 1:
              return "活动更新";
            case 2:
              return "活动删除";
          }
        case "C_AP":
          switch (subtype) {
            case 0:
              return "社团管理员个人邀请被拒绝";
            case 1:
              return "社团成员权限变更";
            case 2:
              return "成员增减";
          }
        case "C_AA":
          return "社团管理员审核用户加入请求";
        case "C_D":
          return "社团已被解散";
        case "S_CA":
          return "系统管理员审核社团创建请求";
      }
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
    search() {
      this.$router.push({
        path: "/search",
        query: { q: this.query },
      });
    },
  },
};
</script>
