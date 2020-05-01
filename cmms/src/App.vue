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

      <v-list shaped dense>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item v-for="item in nav_drawer_items" :key="item.title" :color="item.color" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
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
            <v-list-item v-for="(item, index) in user_menu_items" :key="index" @click="click">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <!-- content -->
    <v-content class="pt-10">
      <v-container class="fill-height" grey lighten-5 fluid>
        <v-row align="start" justify="center">
          <v-col cols="6">
            <v-row v-for="msg in messages" :key="msg.title">
              <v-card class="mx-auto mb-5 pa-2">
                <v-card-title class="headline">{{ msg.title }}</v-card-title>
                <v-card-subtitle>Subtitle</v-card-subtitle>
                <v-card-text>{{ msg.content }}</v-card-text>
                <v-card-actions>
                  <v-list-item>
                    <v-list-item-avatar size="30" color="grey darken-3"></v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ msg.username }}</v-list-item-title>
                    </v-list-item-content>

                    <v-row align="center" justify="end">
                      <v-btn icon color="red">
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <span class="subheading mr-2">{{ msg.likes }}</span>
                      <span class="mr-1"></span>
                      <v-btn icon color="grey">
                        <v-icon>mdi-comment</v-icon>
                      </v-btn>
                      <span class="subheading">{{ msg.comments }}</span>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-col>
          <v-col cols="3">
            <v-card class="mx-auto mb-5 pb-10">
              <v-card-title class="headline">{{ community.title }}</v-card-title>
              <v-card-subtitle>{{ community.subtitle }}</v-card-subtitle>
              <v-card-text>{{ community.description }}</v-card-text>
              <v-btn absolute fab bottom right color="blue lighten-2">
                <v-icon color="white">mdi-plus</v-icon>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {},

  data: () => ({
    nav_drawer_items: [
      {
        title: "我的活动",
        icon: "mdi-calendar-multiselect",
        color: "#0088ff"
      },
      {
        title: "活动签到",
        icon: "mdi-pencil",
        color: "success"
      },
      {
        title: "我的社团",
        icon: "mdi-account-group",
        color: "warning"
      },
      {
        title: "系统管理",
        icon: "mdi-view-dashboard",
        color: "#000000"
      }
    ],
    mini: false,
    user_menu_items: [
      { icon: "mdi-account", text: "资料设置" },
      { icon: "mdi-logout-variant", text: "退出登录" }
    ],
    community: {
      title: "社团名称",
      subtitle: "社团类型",
      description:
        "社团介绍社团介绍社团介绍社团介绍社团介绍社团介绍社团介绍社团介绍"
    },
    messages: [
      {
        title: "活动名称",
        subtitle: "副标题",
        content:
          "活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容",
        username: "发布者",
        likes: 100,
        comments: 0
      },
      {
        title: "活动名称",
        subtitle: "副标题",
        content:
          "活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容",
        username: "发布者",
        likes: 100,
        comments: 0
      },
      {
        title: "活动名称",
        subtitle: "副标题",
        content:
          "活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容",
        username: "发布者",
        likes: 100,
        comments: 0
      },
      {
        title: "活动名称",
        subtitle: "副标题",
        content:
          "活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容",
        username: "发布者",
        likes: 100,
        comments: 0
      },
      {
        title: "活动名称",
        subtitle: "副标题",
        content:
          "活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容",
        username: "发布者",
        likes: 100,
        comments: 0
      }
    ]
  })
};
</script>
