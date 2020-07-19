<template>
  <v-container>
    <v-row>
      <v-col class="md-11">
        <v-navigation-drawer :mini-variant.sync="mini">
          <v-list-item>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-list-item-title>USTC | 社团</v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>

          <v-list shaped dense>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="item in navDrawerItems"
                :key="item.title"
                :color="item.color"
                link
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col class="md-1">
          asda
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MainPage",
  props: {},
  data: () => ({
    mini: false,
    navDrawerItems: [
      {
        title: "活动",
        icon: "mdi-calendar-multiselect",
        color: "#0088ff"
      },
      {
        title: "签到",
        icon: "mdi-pencil",
        color: "success"
      },
      {
        title: "社团",
        icon: "mdi-account-group",
        color: "warning"
      },
      {
        title: "系统管理",
        icon: "mdi-view-dashboard",
        color: "#000000"
      }
    ]
  }),
  components: {}
};
</script>