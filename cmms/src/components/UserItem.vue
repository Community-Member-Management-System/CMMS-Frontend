<template>
  <v-card class="pa-5" flat link :to="userTarget">
    <v-list-item>
      <v-list-item-avatar>
        <!-- <v-img :src="userAvatar"></v-img> -->
        <v-avatar color="primary"></v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="userName"></v-list-item-title>
        <v-list-item-subtitle v-text="userProfile"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "UserItem",
  data() {
    return {};
  },
  props: {
    userAvatar: String,
    userName: String,
    userProfile: String,
    userTarget: String,
  },
  computed: {},
  methods: {},
};
</script>