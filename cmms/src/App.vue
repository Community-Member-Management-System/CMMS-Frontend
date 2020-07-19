<template>
  <v-app>
    <!-- navigation drawer -->
    <v-navigation-drawer :mini-variant.sync="mini" app>
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
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item>
        <v-list-group
          v-for="(item, idxout) in outerList"
          :key="idxout"
          :prepend-icon="item.icon"
          :color="item.color"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(innerItem, idxin) in innerList[idxout]"
            :key="idxin"
            link
            :to="innerItem.targetPath"
          >
            <v-list-item-title>{{innerItem.title}}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <!-- app bar -->
    <v-app-bar flat dense fixed>
      <v-spacer></v-spacer>
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
                <v-list-item-subtitle>Introduction</v-list-item-subtitle>
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

              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-content class="pt-10">
      <router-view></router-view>
    </v-content>
    <!-- content -->
  </v-app>
</template>

<script>
// import ActivitySignClub from "./components/ActivitySignClub";

export default {
  name: "App",

  //   components: { ActivitySignClub },

  data: () => ({
    list: [
      {
        title: "我的社团",
        icon: "mdi-account-group",
        color: "warning",
        targetPath: "/my-club"
      },
      {
        title: "搜索",
        icon: "mdi-account-group",
        color: "warning",
        targetPath: "/search"
      },
      {
        title: "系统管理",
        icon: "mdi-view-dashboard",
        color: "#000000",
        targetPath: ""
      }
    ],

    outerList: [
      {
        title: "我的活动",
        icon: "mdi-calendar-multiselect",
        color: "#0088ff",
        targetPath: "/"
      },
      
    ],
    innerList: [
      [
        {
          title: "正在进行的活动",
          targetPath: "/"
        },
        {
          title: "已经结束的活动",
          targetPath: "/"
        },
        {
          title: "将要进行的活动",
          targetPath: "/"
        }
      ],
    ],

    mini: true,
    user_menu_items: [
      { icon: "mdi-account", text: "资料设置", targetPath: "/setuserinfo" },
      { icon: "mdi-logout-variant", text: "退出登录", targetPath: "" }
    ]
  })
};
</script>