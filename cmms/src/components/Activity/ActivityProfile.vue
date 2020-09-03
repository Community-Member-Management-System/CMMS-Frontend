<template>
  <v-card :to="detailLink" class="pa-3">
    <!-- 状态 chips -->
    <v-chip v-if="status === '未开始'" color="blue" text-color="white">
      <v-avatar left>
        <v-icon>mdi-calendar-clock</v-icon>
      </v-avatar>未开始
    </v-chip>
    <v-chip v-else-if="status === '进行中'" color="yellow darken-3" text-color="white">
      <v-avatar left>
        <v-icon>mdi-clock-outline</v-icon>
      </v-avatar>进行中
    </v-chip>
    <v-chip v-else color="green" text-color="white">
      <v-avatar left>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-avatar>已结束
    </v-chip>

    <v-card-title>
      <div class="text-truncate">{{title}}</div>
    </v-card-title>

    <v-card-subtitle>
      <div class="mt-1">开始时间：{{$moment(start_time).format("YYYY-MM-DD HH:mm:ss") }}</div>
      <div class="mt-1">结束时间：{{$moment(end_time).format("YYYY-MM-DD HH:mm:ss") }}</div>
      <div class="mt-1">地点：{{ location }}</div>
    </v-card-subtitle>

    <v-card-text>
      <div class="text-truncate">{{description}}</div>
    </v-card-text>

    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ActivityProfile",
  data: function () {
    return {};
  },
  props: {
    status: String,
    title: String,
    description: String,
    start_time: String,
    end_time: String,
    location: String,
    detailLink: [Object, String],
  },
  computed: {},
  methods: {},
};
</script>