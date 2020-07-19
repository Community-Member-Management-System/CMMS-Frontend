<template>
  <v-card flat>
    <v-list-item>
      <v-list-item-avatar >
          <v-img :src="userAvatar"></v-img>
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
  name: "MessageItem",
  data: function() {
      baseHTML: [
          ""
      ]
          
  },
  props: {
    msgType: String,
    userOneName: {
        type: String,
        default: ''
    },
    userTwoName: {
        type: String,
        default: ''
    },
    clubName: {
        type: String,
        default: ''
    },
    activityName: {
        type: String,
        default: ''
    },
    userOneTarget: {
        type: String,
        default: ''
    },
    userTwoTarget: {
        type: String,
        default: ''
    },
    clubTarget: {
        type: String,
        default: ''
    },
    activityTarget: {
        type: String,
        default: ''
    },
  },
  computed: {},
  methods: {}
};
</script>