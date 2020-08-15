 <template>
  <v-container>
    <v-card class="mb-5 pa-5">
      <v-card-title>
        <v-list-item>
          <v-list-item-content>
            <span>管理员</span>
          </v-list-item-content>
          <v-btn absolute right fab dark small color="green" @click="addAdmin">
            <v-icon>mdi-account-plus-outline</v-icon>
          </v-btn>
        </v-list-item>
      </v-card-title>

      <v-divider></v-divider>

      <v-list subheader>
        <user-item
          v-for="(a, i) in admins"
          :key="i"
          :user-avatar="a.avatar"
          :user-name="a.nick_name"
          :user-profile="a.profile"
          :user-target="`/user/${a.id}`"
        >
          <template v-slot:action>
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  large
                  color="grey"
                  dark
                  v-bind="attrs"
                  @click.stop.self.prevent="on.click"
                >mdi-pencil-circle</v-icon>
              </template>
              <v-list>
                <v-list-item @click="removeAdmin(a.id)">
                  <v-list-item-title>取消管理员</v-list-item-title>
                </v-list-item>
                <v-list-item @click="transferCommunity(a.id)">
                  <v-list-item-title>转让社团</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </user-item>
      </v-list>
    </v-card>
    <v-card class="mb-5 pa-5">
      <v-card-title>
        <v-list-item>
          <v-list-item-content>
            <span>社团成员</span>
          </v-list-item-content>
          <v-btn
            absolute
            right
            fab
            dark
            small
            color="green"
            :to="`/community/${community.id}/invite`"
          >
            <v-icon>mdi-account-multiple-plus-outline</v-icon>
          </v-btn>
        </v-list-item>
      </v-card-title>
      <v-divider></v-divider>

      <v-list subheader>
        <user-item
          v-for="(m, i) in onlyMembers"
          :key="i"
          :user-avatar="m.avatar"
          :user-name="m.nick_name"
          :user-profile="m.profile"
          :user-target="`/user/${m.id}`"
        >
          <template v-slot:action>
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  large
                  color="grey"
                  dark
                  v-bind="attrs"
                  @click.stop.self.prevent="on.click"
                >mdi-pencil-circle</v-icon>
              </template>
              <v-list>
                <v-list-item @click="removeMember(m.id)">
                  <v-list-item-title>移除成员</v-list-item-title>
                </v-list-item>
                <v-list-item @click="setAdmin(m.id)">
                  <v-list-item-title>设为管理员</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </user-item>
      </v-list>
    </v-card>
  </v-container>
</template>
<script>
import UserItem from "@/components/UserItem";
export default {
  name: "CommunityMemberManagement",
  props: {
    authType: { type: String, required: true, default: "admin" },
    community: { required: true, default: {} },
  }, //user or admin
  data: function () {
    return {};
  },
  computed: {
    admins() {
      let admins = [];
      for (let member of this.community.members) {
        if (this.community.admins.indexOf(member.id) > -1) {
          admins.push(member);
        }
      }
      return admins;
    },
    onlyMembers() {
      // 仅是成员，非管理员
      let onlyMembers = [];
      for (let member of this.community.members) {
        if (this.community.admins.indexOf(member.id) <= -1) {
          onlyMembers.push(member);
        }
      }
      return onlyMembers;
    },
  },
  methods: {
    addAdmin() {
      //TODO:主动搜索成员并设为管理员
    },

    removeAdmin(userId) {
      this.$confirm("其他管理员将收到通知", {
        title: "确认移除该管理员？",
      }).then((res) => {
        if (res) {
          this.axios
            .post(
              `/api/community/${this.community.id}/members/${userId}/admin/unset`,
              {},
              {
                headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
              }
            )
            .then((response) => {
              this.$emit("modifyCommunity"); // 更新社团信息
            });
        }
      });
    },

    // inviteMember() {
    //   // TODO: 跳转到邀请成员页面
    // },

    removeMember(userId) {
      this.$confirm("一旦移除将无法恢复！", {
        title: "确认移除该成员？",
      }).then((res) => {
        if (res) {
          this.axios
            .delete(`/api/community/${this.community.id}/members/${userId}`, {
              headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
            })
            .then((response) => {
              this.$emit("modifyCommunity"); // 更新社团信息
            });
        }
      });
    },

    setAdmin(userId) {
      this.$confirm("其他管理员将收到通知", {
        title: "确认设为管理员？",
      }).then((res) => {
        if (res) {
          this.axios
            .post(
              `/api/community/${this.community.id}/members/${userId}/admin/set`,
              {},
              {
                headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
              }
            )
            .then((response) => {
              this.$emit("modifyCommunity"); // 更新社团信息
            });
        }
      });
    },

    transferCommunity(userId) {
      this.$confirm("一旦转让将无法撤销", {
        title: "确认转让社团？",
      }).then((res) => {
        if (res) {
          this.axios
            .patch(
              `/api/community/${this.community.id}/transfer`,
              { owner: userId },
              {
                headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
              }
            )
            .then((response) => {
              this.$emit("modifyCommunity"); // 更新社团信息
            });
        }
      });
    },
  },
  components: {
    UserItem,
  },
};
</script>