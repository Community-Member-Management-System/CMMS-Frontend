<template>
  <v-card flat link :to="clubTarget">
    <v-list-item>
      <v-list-item-avatar>
          <v-img :src="clubAvatar"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="clubName"></v-list-item-title>
        <v-list-item-subtitle v-text="clubProfile"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "ClubItem",
  data: function() {

  },
  props: {
    clubAvatar: String,
    clubName: String,
    clubProfile: String,
    clubTarget: String
  },
  computed: {},
  methods: {}
};
</script>