<template>
  <v-container>
    <v-card class="ma-5 pa-5" v-for="(d, i) in communityNotice" :key="i">
      <v-card-title>{{ d.title }}</v-card-title>
      <v-card-subtitle>{{ d.subtitle }}</v-card-subtitle>
      <v-card-text>{{ d.message }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      communityNotice: [
        {
          title: "zjx tql",
          subtitle: "2020-7-18",
          message: "wuhu qifei",
        },
        {
          title: "zjx tql",
          subtitle: "2020-7-18",
          message: "芜湖，起飞",
        },
      ],
    };
  },
};
</script>