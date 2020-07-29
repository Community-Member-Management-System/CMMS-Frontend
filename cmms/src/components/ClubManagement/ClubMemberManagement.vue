 <template>
  <v-container>
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
        />
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
        />
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
    addAdmin() {},
    inviteMember() {
      console.log("111");
    },
  },
  components: {
    UserItem,
  },
};
</script>