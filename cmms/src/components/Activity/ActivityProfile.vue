<template>
  <v-card class="pa-3">
    <!-- 状态 chips -->
    <v-chip color="green" text-color="white">
      <v-avatar left>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-avatar>
      {{ status }}
    </v-chip>

    <v-card-title v-text="title"></v-card-title>

    <v-card-subtitle>
      <div class="mt-1">时间：{{ startTime }} - {{ endTime }}</div>
      <div class="mt-1">地点：{{ location }}</div>
    </v-card-subtitle>

    <v-card-text v-text="description"></v-card-text>
    <v-card-actions>
      <v-btn color="primary darken-2" outlined link :to="detailLink">查看详情</v-btn>
      <slot name="deleteBtn"></slot>
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
    startTime: String,
    endTime: String,
    location: String,
    detailLink: String,
  },
  computed: {},
  methods: {},
};
</script>