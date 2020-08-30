<template>
  <v-card class="mb-5 pa-5">
    <v-row>
      <v-col cols="10">
        <v-card-title class="headline" v-text="item.title"></v-card-title>
        <v-card-subtitle
          class="py-0"
          v-text="'时间: ' + getTime(item.start_time) + ' - ' + getTime(item.end_time)"
        ></v-card-subtitle>
        <v-card-subtitle class="py-0">地点: {{item.location }}</v-card-subtitle>
      </v-col>
      <v-col cols="2">
        <v-chip v-if="item.status === '未开始'" color="blue" text-color="white">
          <v-avatar left>
            <v-icon>mdi-calendar-clock</v-icon>
          </v-avatar>未开始
        </v-chip>
        <v-chip v-if="item.status === '进行中'" color="yellow darken-3" text-color="white">
          <v-avatar left>
            <v-icon>mdi-clock-outline</v-icon>
          </v-avatar>进行中
        </v-chip>
        <v-chip v-if="item.status === '已结束'" color="green" text-color="white">
          <v-avatar left>
            <v-icon>mdi-checkbox-marked-circle</v-icon>
          </v-avatar>已结束
        </v-chip>
      </v-col>
    </v-row>
    <v-card-text v-text="item.description"></v-card-text>
    <v-card-actions>
      <v-btn color="primary darken-2" outlined link :to="'/activity/' + item.id">查看详情</v-btn>
      <v-btn
        color="primary darken-2"
        outlined
        link
        :to="'/community/' + item.related_community.id"
      >社团主页</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ActivityItem",
  data: () => ({}),
  props: {
    item: Object,
  },
  methods: {
    getTime(time) {
      return new Date(time).toLocaleString();
    },
  },
};
</script>