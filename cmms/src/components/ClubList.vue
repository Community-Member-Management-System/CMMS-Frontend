<template>
  <v-container>
    <v-row dense>
      <v-col v-for="(item, i) in items" :key="i" cols="12">
        <v-card class='mb-5 pa-5'>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="item.name"></v-card-title>
              <v-card-text>
                <markdown-it-vue-light class="md-body" :content="item.profile" />
              </v-card-text>
            </div>

            <v-avatar color="blue" class="ma-3" size="125" tile>
              <!-- <v-img :src="item.src"></v-img> -->
              <span v-if="!item.avatar" class="white--text headline">暂无头像</span>
              <v-img v-else :src="item.avatar"></v-img>
            </v-avatar>
          </div>
          <v-card-actions>
            <v-btn color="primary darken-2" outlined link :to='"/clubs/" + item.id'>查看主页</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd'

export default {
  name: "MyClubs",
  data: function() {
    return {
      items: [

      ]
    };
  },
  computed: {},
  methods: {},
  components: {
    MarkdownItVueLight
  },
  mounted() {
    this.axios
      .get('/api/community')
      .then(response => {
        this.items = response.data
      })
  }
};
</script>
