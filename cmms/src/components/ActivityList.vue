<template>
  <v-container>
    <v-row v-if="items.length" dense>
      <v-col v-for="(item, i) in items" :key="i" cols="12">
        <ActivityItem :item="item"></ActivityItem>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ActivityItem from "./ActivityItem.vue";
export default {
  name: "ActivityList",
  components: { ActivityItem },
  data: function () {
    return {
      items: [],
    };
  },
  computed: {},
  mounted() {
    this.axios.get("/api/activity").then((response) => {
      this.items = response.data;
    });
  },
  methods: {
    getTime(time) {
      return new Date(time).toLocaleString();
    },
  },
};
</script>
