<template>
  <v-container>
    <v-row dense>
      <v-col v-for="(item, i) in items" :key="i" cols="12">
        <v-card class='mb-5 pa-5'>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="item.title"></v-card-title>
              <v-card-text v-text="item.intro"></v-card-text>
            </div>

            <!-- TODO: 社团头像 -->
            <v-avatar color="blue" class="ma-3" size="125" tile>
              <!-- <v-img :src="item.src"></v-img> -->
              <span class="white--text headline">社团头像</span>
            </v-avatar>
          </div>
          <v-card-actions>
            <v-btn color="primary darken-2" outlined link to='/clubs'>查看主页</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MyClubs",
  data: function() {
    return {
      items: [
        {
          title: "社团名称1",
          // src: "",
          intro: "社团简介"
        },
        {
          title: "社团名称2",
          // src: "",
          intro: "社团简介"
        },
        {
          title: "社团名称3",
          // src: "",
          intro: "社团简介"
        }
      ]
    };
  },
  computed: {},
  methods: {},
  components: {}
};
</script>