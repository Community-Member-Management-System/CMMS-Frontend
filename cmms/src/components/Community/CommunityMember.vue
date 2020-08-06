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
          v-for="(a, i) in communityMember.admin"
          :key="i"
          :user-avatar="a.avatar"
          :user-name="a.name"
          :user-profile="a.profile"
          :user-target="a.target"
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
            @click="inviteMember"
            to="/invite-user"
          >
            <v-icon>mdi-account-multiple-plus-outline</v-icon>
          </v-btn>
        </v-list-item>
      </v-card-title>
      <v-divider></v-divider>

      <v-list subheader>
        <user-item
          v-for="(m, i) in communityMember.member"
          :key="i"
          :user-avatar="m.avatar"
          :user-name="m.name"
          :user-profile="m.profile"
          :user-target="m.target"
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
                <v-list-item @click="transferCommunity(m.id)">
                  <v-list-item-title>转让社团</v-list-item-title>
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
  props: { authType: { type: String, required: true, default: "admin" } }, //user or admin
  data: function () {
    return {
      communityMember: {
        creator: { avatar: "", name: "ens", target: "", profile: "hello!" },
        admin: [
          {
            avatar: "",
            name: "ens",
            target: "/personal-info",
            profile: "hello!",
          },
          {
            avatar: "",
            name: "cwk",
            target: "/personal-info",
            profile: "hello!",
          },
        ],
        member: [
          {
            avatar: "",
            name: "gyx",
            target: "/personal-info",
            profile: "hello!",
          },
          {
            avatar: "",
            name: "zjx",
            target: "/personal-info",
            profile: "hello!",
          },
          {
            avatar: "",
            name: "ca",
            target: "/personal-info",
            profile: "hello!",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    addAdmin() {
      //TODO:主动搜索成员并设为管理员
    },
    removeAdmin() {
      this.$confirm("其他管理员将收到通知", {
        title: "确认移除该管理员？",
      }).then((res) => {
        if (res) {
          // TODO: 请求后端
        }
      });
    },
    inviteMember() {
      // TODO: 跳转到邀请成员页面
    },
    removeMember(id) {
      this.$confirm("一旦移除将无法恢复！", {
        title: "确认移除该成员？",
      }).then((res) => {
        if (res) {
          // TODO: 请求后端
          this.$toasted.show("hhh", {
            theme: "bubble",
            position: "top-center",
            duration: 3000,
          });
        }
      });
    },
    setAdmin(id) {
      this.$confirm("其他管理员将收到通知", {
        title: "确认设为管理员？",
      }).then((res) => {
        if (res) {
          // TODO: 请求后端
        }
      });
    },
    transferCommunity(id) {
      this.$confirm("一旦转让将无法撤销", {
        title: "确认转让社团？",
      }).then((res) => {
        if (res) {
          // TODO: 请求后端
        }
      });
    },
  },
  components: {
    UserItem,
  },
};
</script>