<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>活动简介</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-row justify="center">
                    <v-img color="primary" height="300" :aspect-ratio="16/9"></v-img>
                  </v-row>
                  <v-row justify="center" class="mt-3">
                    <v-btn outlined rounded color="primary">上传图片</v-btn>
                    <input
                      ref="uploader"
                      class="d-none"
                      type="file"
                      accept="image/png, image/jpeg, image/bmp"
                    />
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row>
                    <v-col>
                      <v-text-field v-model="activity.activityName" label="活动名称 *" required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="activity.activityLocation" label="活动地点 *" required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-datetime-picker
                        label="Select Datetime"
                        v-model="activity.activityStartTime"
                      ></v-datetime-picker>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>活动内容</v-card-title>
          <v-card-text>
            <mavon-editor
              style="min-height:400px;z-index:0"
              :boxShadow="false"
              placeholder="活动详细内容..."
              v-model="activity.activityContent"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CreatActivity",
  data: () => ({
    activity: {
      activityName: "Linux install party",
      activityStartTime: null,
      activityEndTime: "2020-7-17, 16:00",
      activityLocation: "西校区3B101",
      activityStatus: "正在进行中",
      activityContent: "",
    },
  }),
  computed: {},
  methods: {},
  components: {},
};
</script>

