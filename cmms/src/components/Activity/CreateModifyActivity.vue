<template>
  <v-container>
    <v-stepper v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1" editable>活动基本信息</v-stepper-step>

      <v-stepper-content step="1">
        <v-container>
          <v-row>
            <v-col cols="7">
              <v-row>
                <v-col>
                  <v-text-field v-model="activity.title" label="活动名称 *" required id='activity-name'></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="activity.location"
                    label="活动地点 *"
                    required
                    @change="setMapCenter"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-datetime-picker label="开始时间 *" v-model="activity.start_time" id='activity-start-time'></v-datetime-picker>
                </v-col>
                <v-col cols="6">
                  <v-datetime-picker label="结束时间 *" v-model="activity.end_time" id='activity-end-time'></v-datetime-picker>
                </v-col>
              </v-row>

              <!-- <v-row>
                <v-col cols="12">
                  <v-select
                    label="允许评论范围 *"
                    v-model="activity.commentRange"
                    multiple
                    required
                    persistent-hint
                    chips
                    :items="[ '本社团签到成员','本社团所有成员', '所有签到用户','所有用户']"
                  ></v-select>
                </v-col>
              </v-row> -->

              <v-row>
                <v-col>
                  <v-row>
                    <v-col cols="4">
                      <v-switch label="平台内通知" inset input-value="true" value disabled></v-switch>
                    </v-col>
                    <v-col cols="4">
                      <v-switch label="邮件列表通知" inset v-model="isMailListNotice" id="mail-list-button"></v-switch>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="5">
              <small class="font-weight-light">右击地图标记活动地点 *</small>

              <v-card class="mt-1">
                <div style="height:330px;" id="map-container"></div>
              </v-card>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-btn fab color="primary" @click="e6 = 2" id='activity-down-button'>
              <v-icon>mdi-chevron-double-down</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2" editable>活动详细内容</v-stepper-step>

      <v-stepper-content step="2">
        <v-container>
          <v-row>
            <v-col>
              <mavon-editor
                style="min-height:550px;z-index:0"
                :boxShadow="false"
                placeholder="活动详细内容..."
                v-model="activity.description"
                id='activity-description'
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <!-- TODO -->
            <v-btn fab color="success" @click="submitActivity" id='activity-submit'>
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  name: "CreateModifyActivity",
  props: {
    communityId: { required: true, default: null },
    activityId: { required: false, default: null },
  },
  data: () => ({
    map: null,
    placeSearch: null,
    mapMarker: null,
    e6: 1,
    activity: {
      title: "Linux install party",
      start_time: new Date(),
      end_time: new Date(new Date().getTime() + 7200000),
      location: "东区一教",
      position: [117.269118, 31.839057], // 经纬度，以供导航
      description: "# 帮助同学能够XXXXXX",
      commentRange: ["本社团签到成员"],
    },
    isMailListNotice: true,
  }),
  computed: {
    isCreatingActivity() {
      if (this.activityId !== null) return false;
      else return true;
    },
    activityCoverSrc() {
      if (this.activity.activityCover)
        return window.URL.createObjectURL(this.activity.activityCover);
      return "";
    },
  },
  methods: {
    submitActivity() {
      let new_activity = Object.assign({}, this.activity);
      new_activity.start_time = new_activity.start_time.toISOString();
      new_activity.end_time = new_activity.end_time.toISOString();
      new_activity.related_community = this.communityId;
      new_activity.mail = this.isMailListNotice;
      new_activity.longitude = this.activity.position[0];
      new_activity.latitude = this.activity.position[1];
      if (this.isCreatingActivity) {
        this.axios
          .post("/api/activity/", new_activity, {
            headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
          })
          .then((response) => {
            this.$toasted.show("创建成功！", {
              theme: "bubble",
              position: "top-center",
              duration: 3000,
            });
            this.$router.push(`/activity/${response.data.id}`);
          })
          .catch((error) => {
            this.$toasted.show("创建失败。")
            console.log(error);
          });
      } else {
        if (new_activity.signed_in_users.length === 0)
          delete new_activity.signed_in_users;
        console.log(new_activity);
        this.axios
          .patch(`/api/activity/${this.activityId}`, new_activity, {
            headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
          })
          .then((response) => {
            this.$toasted.show("修改成功！", {
              theme: "bubble",
              position: "top-center",
              duration: 3000,
            });
            this.$router.push(`/activity/${response.data.id}`);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    // 用户输入详细地点，地图自动定位至附近，然后手动在地图上标记详细地点以获取经纬度，将经纬度给用户导航使用
    setMapCenter() {
      this.placeSearch.search(this.activity.location, (status, result) => {
        if (status == "complete") {
          let location = result.poiList.pois[0].location;
          this.activity.position = [location.lng, location.lat];
          this.map.setCenter(this.activity.position);
          this.mapMarker.setPosition(this.activity.position);
          this.mapMarker.setTitle(this.activity.location);
        } else alert("查询失败");
      });
    },

    // 用户右击地图标记活动地点
    setActivityPosition(e) {
      this.activity.position = [e.lnglat.getLng(), e.lnglat.getLat()];
      this.map.setCenter(this.activity.position);
      this.mapMarker.setPosition(this.activity.position);
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
  created() {
    if (!this.isCreatingActivity) {
      this.axios.get(`/api/activity/${this.activityId}`).then((response) => {
        Object.assign(this.activity, response.data);
        this.activity.start_time = new Date(this.activity.start_time);
        this.activity.end_time = new Date(this.activity.end_time);
      });
    }
  },
  // 高德地图持续为您导航 :)
  mounted() {
    // 初始化高德地图
    AMapLoader.load({
      key: "8609496b04a93409688d07601c08ae89", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.Geolocation", "AMap.ToolBar", "AMap.PlaceSearch"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: {
        // 是否加载 AMapUI，缺省不加载
        version: "1.1", // AMapUI 缺省 1.1
        plugins: [], // 需要加载的 AMapUI ui插件
      },
    })
      .then((AMap) => {
        var map = new AMap.Map("map-container", {
          zoom: 18, //级别
          center: [117.269118, 31.839057], //中心点坐标
        });
        var geolocation = new AMap.Geolocation();
        map.addControl(geolocation);
        this.map = map;
        this.placeSearch = new AMap.PlaceSearch({
          city: "0551", // 兴趣点城市
          citylimit: false, //是否强制限制在设置的城市内搜索
          //   map: map, // 展现结果的地图实例
          //   panel: "panel", // 结果列表将在此容器中进行展示。
          //   autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        this.mapMarker = new AMap.Marker({
          position: new AMap.LngLat(117.269118, 31.839057), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: "FLXG！",
        });
        map.add(this.mapMarker);

        map.clearEvents("rightclick");
        map.on("rightclick", this.setActivityPosition);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

