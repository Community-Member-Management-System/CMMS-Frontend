<template>
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
</template>

<script>
export default {
  name: "App",
  data: () => ({
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