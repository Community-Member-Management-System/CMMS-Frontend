<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col justify="center" align="center">
        <v-avatar color="orange" size="100">
          <v-icon dark v-if="!user.avatar">mdi-account-circle</v-icon>
          <v-img v-else :src="user.avatar"></v-img>
        </v-avatar>
        <h1 class="display-1 py-3">
          {{ user.nick_name }}
        </h1>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-card flat>
          <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="(it, idx) in userDataType" :key="idx"> {{ it }} </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(it, idx) in userDataType" :key="idx">
              <v-card flat class="mx-auto my-auto pa-2" v-for="(d, i) in classifiedData[it]" :key="i">
                <v-card-subtitle> {{ d.time }}</v-card-subtitle>
                <v-card-text class="text--primary">{{ d.message }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: function () {
    return {
      tab: null,
      userDataType: [
        "你的信息",
        "你的社团",
      ],
      userData: [
        {
          type: "个人信息",
          message: "gyx成为了系统管理员",
          time: "2020-1-11"
        },
        {
          type: "参加社团",
          message: "gyx 在 活动 2333 中评论 zjx TQL",
          time: "1926-8-17"
        },
      ]
    }
  },
  computed: {
    classifiedData: function () {
        let result = {}
        for (let i=0; i <  this.userDataType.length; ++i) {
            let tmp = []
            for (let j = 0; j < this.userData.length; ++j) {
                if (this.userData[j].type === this.userDataType[i]) {
                    tmp.push(this.userData[j])
                }
            }
            result[this.userDataType[i]] = tmp
        }
        return result
    },
    user () {
      return this.$store.getters.user;
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>
