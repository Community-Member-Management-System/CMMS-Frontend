<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="py-12 my-12">
      <v-col cols="6">
        <v-row>
          <v-col v-for="(i, idx) in signCode" :key="idx">
            <v-card class="my-auto">
              <v-responsive :aspect-ratio="1/1">
                <v-card-text class="py-auto font-weight-light display-4 text-center">
                  {{ i }}
                </v-card-text>
              </v-responsive>
            </v-card>
          </v-col>
          <!--                    <v-progress-linear value="15"></v-progress-linear>-->
        </v-row>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="font-weight-weight display-1">
      {{ clubName }} {{ activityName }} 签到
    </v-row>
  </v-container>
</template>

<script>
const jsotp = require('jsotp')

export default {
  name: 'ActivitySignClub',

  data: () => ({
    signCode: "1234",
    color: "#fef9f6",
    clubName: "无名社团",
    activityName: "无名活动",
    activityID: 1,
    otpKey: null,
    otpInstance: null
  }),
  methods: {},
  mounted() {
    this.axios
      .get("/api/activity/" + this.activityID + "/secret_key")
      .then((response) => {
        this.otpKey = response.data['secret_key']
        this.otpInstance = jsotp.TOTP(this.otpKey)
      })
    this.$nextTick(function () {
      window.setInterval(() => {
        this.signCode = this.otpInstance.now()
      }, 3000)
    })
  }

}
</script>
