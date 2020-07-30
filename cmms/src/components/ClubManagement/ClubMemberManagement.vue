 <template>
  <v-container>
    <!-- <v-row justify="center">
      <v-dialog v-model="confirmDialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">{{confirmDialogTitle}}</v-card-title>
          <v-card-text>{{confirmDialogText}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="confirmDialog = false;confirmDialogResult=true"
            >确认</v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="confirmDialog = false;confirmDialogResult=false"
            >取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>-->
    <v-snackbar v-model="snackbarState" top :color="snackbarColor" dark>
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbarState = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-card class="mb-5 pa-5">
      <v-card-title>
        <span>管理员</span>
        <v-icon class="ml-5" color="info" large @click="addAdmin">mdi-account-plus-outline</v-icon>
      </v-card-title>
      <v-list subheader>
        <user-item
          v-for="(a, i) in clubMember.admin"
          :key="i"
          :user-avatar="a.avatar"
          :user-name="a.name"
          :user-profile="a.profile"
          :user-target="a.target"
        >
          <template v-slot:action>
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-icon large color="primary" dark v-bind="attrs" v-on="on">mdi-dots-horizontal</v-icon>
              </template>
              <v-list>
                <v-list-item @click="removeAdmin(a.id)">
                  <v-list-item-title>取消管理员</v-list-item-title>
                </v-list-item>
                <v-list-item @click="transferClub(a.id)">
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
        <span>成员</span>
        <v-icon
          class="ml-10"
          color="info"
          large
          @click="inviteMember"
        >mdi-account-multiple-plus-outline</v-icon>
      </v-card-title>
      <v-list subheader>
        <user-item
          v-for="(m, i) in clubMember.member"
          :key="i"
          :user-avatar="m.avatar"
          :user-name="m.name"
          :user-profile="m.profile"
          :user-target="m.target"
        >
          <template v-slot:action>
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-icon large color="primary" dark v-bind="attrs" v-on="on">mdi-dots-horizontal</v-icon>
              </template>
              <v-list>
                <v-list-item @click="removeMember(m.id)">
                  <v-list-item-title>移除成员</v-list-item-title>
                </v-list-item>
                <v-list-item @click="setAdmin(m.id)">
                  <v-list-item-title>设为管理员</v-list-item-title>
                </v-list-item>
                <v-list-item @click="transferClub(m.id)">
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
  name: "ClubMemberManagement",
  data: function () {
    return {
      //   confirmDialog: false,
      //   confirmDialogTitle: "",
      //   confirmDialogText: "",
      //   confirmDialogResult: false,
      snackbarState: false,
      snackbarText: "",
      snackbarColor: "",
      clubMember: {
        creator: { avatar: "", name: "ens", target: "", profile: "hello!" },
        admin: [
          {
            avatar: "",
            name: "ens",
            target: "",
            profile: "hello!",
          },
        ],
        member: [
          {
            avatar: "",
            name: "gyx",
            target: "",
            profile: "hello!",
          },
          {
            avatar: "",
            name: "zjx",
            target: "",
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
          this.popupSnackbar("success", "移除成功");
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
    transferClub(id) {
      this.$confirm("一旦转让将无法撤销", {
        title: "确认转让社团？",
      }).then((res) => {
        if (res) {
          // TODO: 请求后端
        }
      });
    },
    popupSnackbar(type, message) {
      this.snackbarColor = type;
      this.snackbarText = message;
      this.snackbarState = true;
    },
  },
  components: {
    UserItem,
  },
};
</script>