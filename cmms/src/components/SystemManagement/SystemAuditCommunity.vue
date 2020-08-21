<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="pt-6">
            <v-badge :content="invalidCommunities.length">待审核</v-badge>
          </v-card-title>
          <div v-for="community in invalidCommunities" :key="community.pk">
            <v-divider></v-divider>
            <v-card flat :to="`/community/${community.pk}`" class="pa-5 pt-0">
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
                    <div class="mt-2">申请编号：{{ community.pk }}</div>
                    <div class="mt-1">申请人：{{ community.owner }}</div>
                  </v-card-subtitle>
                  <v-card-text>
                    <markdown-it-vue-light class="md-body" :content="community.profile" />
                  </v-card-text>
                </div>

                <v-avatar color="blue" class="ma-4" size="125" tile>
                  <!-- <v-img :src="item.src"></v-img> -->
                  <span v-if="!community.avatar" class="white--text headline">暂无头像</span>
                  <v-img v-else :src="community.avatar"></v-img>
                </v-avatar>
              </div>
              <v-card-actions>
                <div>
                  <v-btn
                    outlined
                    color="primary"
                    @click.stop.native.prevent="set(true, community.pk)"
                  >通过申请</v-btn>
                  <v-btn
                    class="ml-2"
                    outlined
                    color="red"
                    @click.stop.native.prevent="set(false, community.pk, true)"
                  >拒绝申请</v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="pt-6">
            <v-badge :content="validCommunities.length">已审核</v-badge>
          </v-card-title>
          <div v-for="community in validCommunities" :key="community.pk">
            <v-divider></v-divider>
            <v-card flat :to="`/community/${community.pk}`" class="pa-5 pt-0">
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
                    <div class="mt-2">申请编号：{{ community.pk }}</div>
                    <div class="mt-1">申请人：{{ community.owner }}</div>
                  </v-card-subtitle>
                  <v-card-text>
                    <markdown-it-vue-light class="md-body" :content="community.profile" />
                  </v-card-text>
                </div>

                <v-avatar color="blue" class="ma-4" size="125" tile>
                  <!-- <v-img :src="item.src"></v-img> -->
                  <span v-if="!community.avatar" class="white--text headline">暂无头像</span>
                  <v-img v-else :src="community.avatar"></v-img>
                </v-avatar>
              </div>
              <v-card-actions>
                <v-btn
                  outlined
                  color="red"
                  @click.stop.native.prevent="set(false, community.pk)"
                >转为待审核</v-btn>
                <v-btn
                  outlined
                  color="red"
                  @click.stop.native.prevent="set(false, community.pk, true)"
                >直接解散</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MarkdownItVueLight from "markdown-it-vue/dist/markdown-it-vue-light.umd";

export default {
  name: "CommunityInfo",
  data: function () {
    return {
      communities: [],
    };
  },
  computed: {
    validCommunities() {
      let communities = [];
      for (let community of this.communities) {
        if (community.valid) communities.push(community);
      }
      return communities;
    },
    invalidCommunities() {
      let communities = [];
      for (let community of this.communities) {
        if (!community.valid) communities.push(community);
      }
      return communities;
    },
  },
  methods: {
    getColor(valid) {
      if (valid) return "green";
      else return "red";
    },
    getData() {
      this.axios.get("/api/community/audit").then((response) => {
        this.communities = response.data;
      });
    },
    set(valid, pk, del = false) {
      this.axios
        .patch(
          "/api/community/audit/" + pk + "/",
          {
            valid: valid,
          },
          {
            headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
          }
        )
        .then((response) => {
          if (del) {
            this.axios
              .delete("/api/community/" + pk, {
                headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
              })
              .then((response) => {
                this.getData();
              });
          } else {
            this.getData();
          }
        });
    },
  },
  activated() {
    this.getData();
  },
  components: {
    MarkdownItVueLight,
  },
};
</script>
