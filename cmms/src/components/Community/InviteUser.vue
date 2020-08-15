 <!-- 废弃，被集成到成员管理页面了 -->
<template>
  <v-container>
    <!-- <v-row>
      <v-col cols="1">
        <v-avatar>
          <v-icon dark v-if="!community.avatar">mdi-account-circle</v-icon>
          <v-img v-else :src="community.avatar"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="6">
        <v-text-field @keydown.enter="getUser(userId)" outlined label="用户学号" v-model="userId">
          <template v-slot:append>
            <v-icon @click="getUser(userId)">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-divider></v-divider>-->
    <v-row>
      <v-col>
        <user-item
          v-for="(m, i) in non_members"
          :key="i"
          :user-avatar="m.avatar"
          :user-name="m.nick_name"
          :user-profile="m.profile"
          :user-target="`/user/${m.id}`"
        >
          <template v-slot:action>
            <v-icon
              large
              color="green"
              dark
              @click.stop.self.prevent="inviteUser(m.id)"
            >mdi-plus-circle</v-icon>
          </template>
        </user-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserItem from "@/components/UserItem";
export default {
  name: "InviteUser",
  props: {
    communityId: { required: true },
  },
  data() {
    return {
      community: {},
      non_members: [],
      userId: "",
      targetUser: "",
    };
  },
  computed: {},
  created() {
    this.axios.get(`/api/community/${this.communityId}`).then((response) => {
      this.community = response.data;
    });
    this.getNonMembers();
  },
  methods: {
    getNonMembers() {
      this.axios
        .get(`/api/community/${this.communityId}/invite`)
        .then((response) => {
          this.non_members = response.data.non_members;
        });
    },

    inviteUser(userId) {
      this.axios
        .post(
          `/api/community/${this.communityId}/invite/${userId}`,
          {},
          {
            headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
          }
        )
        .then((response) => {
          this.$toasted.show("邀请成功！");
        });
    },
    getUser(userId) {
      // TODO:获取用户信息，更新用户列表
    },
  },
  components: { UserItem },
};
</script>