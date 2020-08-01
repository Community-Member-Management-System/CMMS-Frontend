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
                  <v-text-field
                    v-model="activity.activityLocation"
                    label="活动地点 *"
                    required
                    @change="setMapCenter"
                  ></v-text-field>
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
                <div style="height:285px;" id="map-container"></div>
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
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  name: "CreatActivity",
  data: () => ({
    map: null,
    placeSearch: null,
    mapMarker: null,
    isSelectedImg: false,
    e6: 1,
    activity: {
      activityName: "Linux install party",
      activityStartTime: null,
      activityEndTime: null,
      activityLocation: "东区一教",
      activityPosition: [117.269118, 31.839057],
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

    // 用户输入详细地点，地图自动定位至附近，然后手动在地图上标记详细地点以获取经纬度，将经纬度给用户导航使用
    setMapCenter() {
      this.placeSearch.search(
        this.activity.activityLocation,
        (status, result) => {
          if (status == "complete") {
            let location = result.poiList.pois[0].location;
            this.activity.activityPosition = [location.lng, location.lat];
            this.map.setCenter(this.activity.activityPosition);
            this.mapMarker.setPosition(this.activity.activityPosition);
          } else alert("查询失败");
        }
      );
    },

    setActivityPosition(e) {
      this.activity.activityPosition = [e.lnglat.getLng(), e.lnglat.getLat()];
      this.map.setCenter(this.activity.activityPosition);
      this.mapMarker.setPosition(this.activity.activityPosition);
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

