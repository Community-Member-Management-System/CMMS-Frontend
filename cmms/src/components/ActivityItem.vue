<template>
  <v-card class="pa-3">
    <!-- <v-card  v-if="showClub" flat link :to="clubTarget">
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="clubAvatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="clubName"></v-list-item-title>
          <v-list-item-subtitle v-text="clubProfile"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>-->

    <!-- 状态 chips -->
    <v-chip color="green" text-color="white">
      <v-avatar left>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-avatar>
      {{ activityStatus }}
    </v-chip>

    <v-card-title v-text="activityName"></v-card-title>
    <v-card-subtitle>时间：{{ activityTime }} 地点：{{ activityLocation }}</v-card-subtitle>
    <v-card-text v-text="activityContent"></v-card-text>
    <v-card-actions>
      <v-btn color="primary darken-2" outlined link :to="activityTarget">查看详情</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ActivityItem",
  data: function () {
    return {};
  },
  props: {
    clubAvatar: String,
    clubName: String,
    clubProfile: String,
    clubTarget: String,
    activityName: String,
    activityTime: String,
    activityLocation: String,
    activityTarget: String,
    activityContent: String,
    activityStatus: String,
    showClub: Boolean,
  },
  computed: {},
  methods: {},
};
</script>