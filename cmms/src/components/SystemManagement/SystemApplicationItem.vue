<template>
  <v-card class="px-3">
    <v-row>
      <v-col class="my-auto" cols=2>
        <!-- 状态 chips -->
        <v-chip color="green" text-color="white">
          <v-avatar left>
            <v-icon>mdi-checkbox-marked-circle</v-icon>
          </v-avatar>
          {{ status }}
        </v-chip>
      </v-col>
      <v-col class="my-auto" cols=3>
        <v-card-title v-text="title"></v-card-title>
        <v-card-subtitle>时间：{{ time }}</v-card-subtitle>
      </v-col>
      <v-col class="my-auto" offset=5 cols=2>
        <v-card-actions>
          <v-btn color="primary darken-2" outlined link :to="activityTarget">查看详情</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "SystemApplicationItem",
  data: function () {
    return {};
  },
  props: {
    title: String,
    status: String,
    time: String,
  },
  computed: {},
  methods: {},
};
</script>