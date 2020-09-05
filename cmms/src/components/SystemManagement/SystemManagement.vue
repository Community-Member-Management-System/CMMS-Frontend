<template>
  <v-container>
    <v-row class="mb-10">
      <v-col>
        <v-tabs v-model="tab" background-color="#00000000" fixed-tabs>
          <v-tab v-for="(it, idx) in systemTabs" :key="idx">{{ it.tabName }}</v-tab>
        </v-tabs>

        <v-row class="background">
          <v-col>
            <v-scroll-x-transition>
              <keep-alive>
                <component :is="systemTabs[tab].tabComponent"></component>
              </keep-alive>
            </v-scroll-x-transition>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SystemAuditCommunity from "@/components/SystemManagement/SystemAuditCommunity";
import SystemAuditActivity from "@/components/SystemManagement/SystemAuditActivity";
import SystemAuditUser from "@/components/SystemManagement/SystemAuditUser";
export default {
  name: "Community",
  data: function () {
    return {
      tab: 0,
      systemTabs: [
        { tabName: "社团管理", tabComponent: "SystemAuditCommunity" },
        { tabName: "活动管理", tabComponent: "SystemAuditActivity" },
        // { tabName: "用户管理", tabComponent: "SystemAuditUser" },
      ],
    };
  },
  computed: {},
  methods: {
    deleteCommunity(communityId) {
      this.axios
        .delete(`/api/community/${communityId}`, {
          headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
        })
        .then((response) => {
          this.$router.push("/home");
          this.$toasted.show("删除成功！");
        });
    },
  },
  components: { SystemAuditCommunity, SystemAuditActivity, SystemAuditUser },
};
</script>