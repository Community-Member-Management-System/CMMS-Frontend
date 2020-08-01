<template>
  <v-container>
    <v-stepper v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1" editable>活动基本信息</v-stepper-step>

      <v-stepper-content step="1">
        <v-container>
          <v-row>
            <v-col cols="8">
              <v-row>
                <v-col>
                  <v-text-field v-model="activity.activityName" label="活动名称 *" required></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="activity.activityLocation" label="活动地点 *" required></v-text-field>
                </v-col>
              </v-row>
              <v-row></v-row>
              <v-row>
                <v-col cols="3">
                  <v-datetime-picker label="开始时间 *" v-model="activity.activityStartTime"></v-datetime-picker>
                </v-col>
                <v-col cols="3">
                  <v-datetime-picker label="结束时间 *" v-model="activity.activityEndTime"></v-datetime-picker>
                </v-col>
                <v-col cols="6">
                  <v-select
                    label="允许评论范围 *"
                    v-model="activity.commentRange"
                    multiple
                    required
                    hint="本社团签到成员之外的用户"
                    persistent-hint
                    :items="[ '本社团成员', '所有签到用户','所有用户']"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea outlined label="活动简介"></v-textarea>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-card-title>校区地图</v-card-title>
              <v-card>
                <v-img color="primary" :aspect-ratio="16/9"></v-img>
              </v-card>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-btn fab color="primary" @click="e6 = 2">
              <v-icon>mdi-chevron-double-down</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2" editable>活动封面</v-stepper-step>

      <v-stepper-content step="2">
        <v-container>
          <v-row justify="center">
            <v-col cols="7">
              <v-card>
                <input
                  id="imgInput"
                  ref="imgInput"
                  v-show="false"
                  v-if="!isSelectedImg"
                  type="file"
                  accept="image/*"
                  @input="onImgSelected"
                />
                <v-img :src="activityCoverSrc" :aspect-ratio="16/9">
                  <v-row
                    v-show="activityCoverSrc=='' "
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn height="60px" width="60px" icon v-bind="attrs" v-on="on">
                          <v-icon
                            size="60px"
                            @click.stop="$refs.imgInput.click();"
                          >mdi-cloud-upload-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>点击上传图片</span>
                    </v-tooltip>
                  </v-row>
                  <v-btn
                    absolute
                    x-small
                    style="top:8px;right:8px;"
                    fab
                    color="red"
                    v-show="isSelectedImg"
                    @click="removeImg"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
          <!-- <v-row justify="center">
            <v-col cols="7">
              <v-file-input
                ref="vFileInput"
                v-model="activity.activityCover"
                prepend-icon="mdi-camera"
                show-size
                accept="image/*"
                label="封面图片"
                @click.clear="removeImg"
              ></v-file-input>
            </v-col>
          </v-row>-->
          <!-- <v-row justify="center">
            
          </v-row>-->
          <v-row justify="center">
            <v-btn fab color="primary" @click="e6 = 3">
              <v-icon>mdi-chevron-double-down</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3" editable>活动详细内容</v-stepper-step>

      <v-stepper-content step="3">
        <v-container>
          <v-row>
            <v-col>
              <mavon-editor
                style="min-height:550px;z-index:0"
                :boxShadow="false"
                placeholder="活动详细内容..."
                v-model="activity.activityContent"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <!-- TODO -->
            <v-btn fab color="primary" @click="submitActivity">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  name: "CreatActivity",
  data: () => ({
    isSelectedImg: false,
    e6: 2,
    activity: {
      activityName: "Linux install party",
      activityStartTime: null,
      activityEndTime: null,
      activityLocation: "西校区3B101",
      activityStatus: "正在进行中",
      activityContent: "",
      activityProfile: "",
      activityCover: null, //活动封面
      commentRange: ["社团签到成员"],
    },
  }),
  computed: {
    activityCoverSrc() {
      if (this.activity.activityCover)
        return window.URL.createObjectURL(this.activity.activityCover);
      return "";
    },
  },
  methods: {
    submitActivity() {},
    onImgSelected(e) {
      this.activity.activityCover = e.target.files[0];
      this.isSelectedImg = true;
      // TODO: 上传图片
    },
    removeImg() {
      //   this.$refs.imgInput.value = "";
      this.isSelectedImg = false;
      this.activity.activityCover = null;
    },
  },
  components: {},
  watch: {
    "activity.commentRange"(newVal, oldVal) {
      if (newVal.indexOf("所有用户") > -1 && newVal.length > 1) {
        if (oldVal.indexOf("所有用户") > -1)
          this.activity.commentRange.splice(oldVal.indexOf("所有用户"), 1);
        else this.activity.commentRange = ["所有用户"];
      }
    },
  },
};
</script>

