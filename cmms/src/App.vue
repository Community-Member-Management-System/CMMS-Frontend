<template>
    <v-app>
        <!-- navigation drawer -->
        <v-navigation-drawer color="grey lighten-4" :mini-variant.sync="mini" app>
            <v-list-item class="px-2">
                <v-btn icon @click.stop="mini = !mini">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
                <v-list-item-title class="title ml-5"
                    >USTC | 社团</v-list-item-title
                >
            </v-list-item>

            <v-divider></v-divider>

            <v-list>
                <v-list-item
                    v-for="(item, idx) in list"
                    :key="idx"
                    link
                    :to="item.targetPath"
                    :color="item.color"
                >
                    <v-list-item-icon>
                        <v-icon>
                            {{ item.icon }}
                        </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>

                <!-- 我的活动 下拉列表 -->
                <v-list-group
                    v-for="(item, idxout) in outerList"
                    :key="idxout"
                    :prepend-icon="item.icon"
                    :color="item.color"
                    no-action
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>{{
                                item.title
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item
                        v-for="(innerItem, idxin) in innerList[idxout]"
                        :key="idxin"
                        link
                        :to="innerItem.targetPath"
                        :color="item.color"
                    >
                        <v-list-item-title>{{
                            innerItem.title
                        }}</v-list-item-title>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>

        <!-- content -->
        <v-content class="background">
          <!-- back to top btn -->
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
              <v-spacer></v-spacer>
              <!-- TODO: 搜索栏 -->
              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
              <v-btn icon>
                  <v-icon>mdi-brightness-7</v-icon>
              </v-btn>
              <v-btn icon>
                  <v-icon>mdi-bell</v-icon>
              </v-btn>
              <v-divider vertical></v-divider>
              <v-avatar class="ml-5" color="grey" size="30">
                  <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>

              <!-- user drop-down menu -->
              <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                      <v-btn color="rgba(0, 0, 0, 0)" depressed v-on="on">
                          <v-icon>mdi-menu-down</v-icon>
                      </v-btn>
                  </template>
                  <v-card>
                      <v-list>
                          <v-list-item>
                              <v-list-item-avatar color="grey">
                                  <v-icon dark>mdi-account-circle</v-icon>
                              </v-list-item-avatar>

                              <v-list-item-content>
                                  <v-list-item-title>Username</v-list-item-title>
                                  <v-list-item-subtitle
                                      >Introduction</v-list-item-subtitle
                                  >
                              </v-list-item-content>
                          </v-list-item>
                      </v-list>

                      <v-divider></v-divider>

                      <v-list>
                          <v-list-item
                              v-for="(item, index) in user_menu_items"
                              :key="index"
                              @click="click"
                              :to="item.targetPath"
                          >
                              <v-list-item-icon>
                                  <v-icon>{{ item.icon }}</v-icon>
                              </v-list-item-icon>

                              <v-list-item-title>{{
                                  item.text
                              }}</v-list-item-title>
                          </v-list-item>
                      </v-list>
                  </v-card>
              </v-menu>
          </v-app-bar>
          <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
// import ActivitySignClub from "./components/ActivitySignClub";

export default {
    name: "App",

    //   components: { ActivitySignClub },

    data: () => ({
        fab: false,
        list: [
            {
                title: "我的社团",
                icon: "mdi-account-group",
                color: "orange accent-4",
                targetPath: "/myclubs",
            },
            // {
            //     title: "搜索",
            //     icon: "mdi-account-group",
            //     color: "warning",
            //     targetPath: "/search",
            // },
            // {
            //     title: "系统管理",
            //     icon: "mdi-view-dashboard",
            //     color: "#000000",
            //     targetPath: "",
            // },
        ],

        outerList: [
            {
                title: "我的活动",
                icon: "mdi-calendar-multiselect",
                color: "light-blue accent-4",
                targetPath: "/",
            },
        ],
        innerList: [
            [
                {
                    title: "正在进行的活动",
                    color: "light-blue accent-4",
                    targetPath: "/activity-now",
                },
                {
                    title: "已经结束的活动",
                    color: "light-blue accent-4",
                    targetPath: "/activity-fin",
                },
                {
                    title: "将要进行的活动",
                    color: "light-blue accent-4",
                    targetPath: "/activity-due",
                },
            ],
        ],

        mini: true,
        user_menu_items: [
            {
                icon: "mdi-account",
                text: "资料设置",
                targetPath: "/setuserinfo",
            },
            { icon: "mdi-logout-variant", text: "退出登录", targetPath: "" },
        ],
    }),
    methods: {
      onScroll (e) {
        if (typeof window === 'undefined') return
        const top = window.pageYOffset ||   e.target.scrollTop || 0
        this.fab = top > 20
      },
      toTop () {
        this.$vuetify.goTo(0)
      }
    }
};
</script>
