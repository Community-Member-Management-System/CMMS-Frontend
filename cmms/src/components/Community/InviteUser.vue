<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field @keydown.enter="getUser(userId)" outlined label="用户学号" v-model="userId">
          <template v-slot:append>
            <v-icon @click="getUser(userId)">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <user-item
          v-for="(m, i) in validUsers"
          :key="i"
          :user-avatar="m.avatar"
          :user-name="m.name"
          :user-profile="m.profile"
          :user-target="m.target"
        >
          <template v-slot:action>
            <v-icon large color="green" dark @click.stop.self.prevent="inviteUser">mdi-plus-circle</v-icon>
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
  data() {
    return {
      userId: "",
      targetUser: "",
      validUsers: [
        {
          avatar: "",
          name: "ens",
          target: "/personal-info",
          profile: "hello!",
        },
      ],
    };
  },
  props: {
    userAvatar: String,
    userName: String,
    userProfile: String,
    userTarget: String,
  },
  computed: {},
  mounted() {
    //TODO: 获取初始可邀请成员列表
  },
  methods: {
    inviteUser() {
      // TODO: 发送请求
    },
    getUser(userId) {
      // TODO:获取用户信息，更新用户列表
    },
  },
  components: { UserItem },
};
</script>