<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-list-item>
              <v-badge :content="joinReqs.length">入社请求</v-badge>
            </v-list-item>
          </v-card-title>
          <v-divider></v-divider>
          <v-list subheader>
            <user-item
              v-for="(req, i) in joinReqs"
              :key="i"
              :user-avatar="req.avatar"
              :user-name="req.real_name || req.nick_name"
              :user-profile="req.profile"
              :user-target="`/user/${req.id}`"
            >
              <template v-slot:action>
                <v-btn
                  outlined
                  color="primary"
                  @click.stop.self.prevent="auditJoinReq('allow', req.id)"
                >通过</v-btn>
                <v-btn
                  class="ml-2"
                  outlined
                  color="red"
                  @click.stop.self.prevent="auditJoinReq('deny', req.id)"
                >拒绝</v-btn>
              </template>
            </user-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserItem from "@/components/UserItem";
export default {
  props: {
    authLevel: { type: Number, required: true, default: 3 },
    community: { required: true, default: {} },
  },
  data() {
    return {
      joinReqs: [],
    };
  },

  activated() {
    this.getJoinReqs();
  },

  methods: {
    getJoinReqs() {
      this.axios
        .get(`/api/community/${this.community.id}/audit`)
        .then((response) => {
          this.joinReqs = response.data.invalid_members;
        });
    },
    auditJoinReq(action, userId) {
      this.axios
        .post(
          `/api/community/${this.community.id}/audit/${userId}/${action}`,
          {},
          {
            headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
          }
        )
        .then((response) => {
          this.$emit("modifyCommunity"); // 更新社团信息
          this.getJoinReqs();
          this.$toasted.show("操作成功！");
        });
    },
  },
  components: {
    UserItem,
  },
};
</script>