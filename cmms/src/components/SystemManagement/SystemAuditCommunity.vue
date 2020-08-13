<template>
  <v-container>
    <h1>社团审核</h1>
    <v-row>
      <v-col>
        <v-card v-for="community in communities" :key="community.pk">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline">
                {{ community.name }}
                <v-chip :color="getColor(community.valid)" text-color="white" class="ml-3">
                  <v-avatar left>
                    <v-icon v-if="community.valid">mdi-checkbox-marked-circle</v-icon>
                    <v-icon v-else>mdi-close-circle</v-icon>
                  </v-avatar>
                  {{ community.valid ? '已通过' : '待审核' }}
                </v-chip>
              </v-card-title>

              <v-card-subtitle>
                <div>申请编号：{{ community.pk }}</div>
                <div class="mt-2">申请人：{{ community.owner }}</div>
              </v-card-subtitle>
              <v-card-text>
                <markdown-it-vue-light class="md-body" :content="community.profile" />
              </v-card-text>
            </div>

            <v-avatar color="blue" class="ma-3" size="125" tile>
              <!-- <v-img :src="item.src"></v-img> -->
              <span v-if="!community.avatar" class="white--text headline">暂无头像</span>
              <v-img v-else :src="community.avatar"></v-img>
            </v-avatar>
          </div>
          <v-card-actions>
            <div v-if="community.valid">
              <v-btn color="primary darken-2" outlined link :to='"/clubs/" + community.pk'>查看主页</v-btn>
              <v-btn class="ml-2" outlined color="red" @click="set(false, community.pk)">转为待审核</v-btn>
            </div>
            <div v-else>
              <v-btn outlined color="primary" @click="set(true, community.pk)">通过申请</v-btn>
              <v-btn class="ml-2" outlined color="red" @click="set(false, community.pk, true)">拒绝申请</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd'

export default {
  name: "CommunityInfo",
  data: function () {
    return {
      communities: []
    };
  },
  computed: {},
  methods: {
    getColor (valid) {
      if (valid) return "green"
      else return "red"
    },
    getData () {
      this.axios
          .get('/api/community/audit')
          .then(response => {
            this.communities = response.data
          })
    },
    set (valid, pk, del = false) {
      this.axios
        .patch('/api/community/audit/' + pk + '/', {
          valid: valid
        }, {
          headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
        })
        .then(response => {
          if (del) {
            this.axios
              .delete('/api/community/' + pk, {
                headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
              })
              .then(response => {
                this.getData()
              })
          } else {
            this.getData()
          }
        })
    }
  },
  mounted() {
    this.getData()
  },
  components: {
    MarkdownItVueLight
  },
};
</script>
