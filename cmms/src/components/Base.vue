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
        <v-menu :close-on-content-click="false" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="rgba(0, 0, 0, 0)" depressed v-on="on">
              <v-badge color="red" dot :value="newNotice">
                <v-icon>mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-card class="mx-auto px-3" min-width="400" max-width="400">
            <v-list>
              <v-list-item v-if="noticeStatus.length == 0">
                <v-list-item-content>
                  <v-list-item-subtitle>暂时没有通知</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <template v-else v-for="(item, index) in noticeStatus">
                <NoticeItem
                  :key="'notice-' + item.pk"
                  :status="item"
                  :notice="notice[index]"
                  @read="readNotice(index)"
                  @delete="deleteNotice(index)"
                ></NoticeItem>
                <v-divider v-if="index + 1 < noticeStatus.length" :key="index"></v-divider>
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
              <v-list-item to="/community/create">
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
import NoticeItem from "./NoticeItem.vue";
export default {
  name: "Base",
  components: { NoticeItem },
  data: () => ({
    isSuperuser: false,
    drawer: true,
    mini: false,
    fab: false,
    expand: false,
    query: "",
    noticeStatus: [],
    notice: [],
  }),
  mounted() {
    this.onResize();
    this.fetchUserInfo();
  },
  computed: {
    list() {
      let list = [
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
          targetPath: "/community",
        },
        {
          title: "所有活动",
          icon: "mdi-calendar",
          color: "blue",
          targetPath: "/activity",
        },
        {
          title: "系统管理",
          icon: "mdi-view-dashboard",
          color: "red",
          targetPath: "/system-management",
        },
      ];
      if (this.isSuperuser) return list;
      else return list.slice(0, 3);
    },
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
    newNotice() {
      for (let i = 0; i < this.noticeStatus.length; i++) {
        if (!this.noticeStatus[i].read) {
          return true;
        }
      }
      return false;
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
          this.isSuperuser = response.data.superuser;
          if (userNew) {
            this.$router.push("SetUserInfo");
          }
          this.$store.dispatch("updateUser", userID);
          this.fetchNoticeList();
        });
    },
    fetchNoticeList() {
      this.axios.get("/api/notice/").then((response) => {
        this.noticeStatus = response.data;
        for (let i = 0; i < this.noticeStatus.length; i++) {
          this.axios
            .post(
              "/api/notice/",
              { pk: this.noticeStatus[i].pk },
              {
                headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
              }
            )
            .then((response) => {
              this.notice.push(response.data);
            });
        }
      });
    },
    readNotice(index) {
      this.noticeStatus[index].read = true;
    },
    deleteNotice(index) {
      this.noticeStatus.splice(index, 1);
      this.notice.splice(index, 1);
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
      this.axios
        .post("/api/auth/logout", null, {
          headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
        })
        .then((response) => {
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
