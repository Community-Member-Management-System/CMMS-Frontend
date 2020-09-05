<template>
  <v-container>
    <v-tabs background-color="#00000000" fixed-tabs v-model="tab">
      <v-tab>活动详情</v-tab>
      <v-tab>活动地图</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="mt-8" style="background-color:#00000000">
      <v-tab-item>
        <v-row>
          <v-col>
            <!-- 活动信息 -->
            <v-card class="mb-5 pa-8">
              <v-row>
                <v-col cols="10">
                  <div class="text-h4">
                    {{ activity.title }}
                    <v-btn
                      v-if="activity.status === '进行中' && isAdmin"
                      class="success mx-2"
                      rounded
                      depressed
                      link
                      :to="'/sign-community/' + activity.id"
                    >获取签到码</v-btn>
                    <v-btn
                      v-if="activity.status === '进行中'"
                      class="success mx-2"
                      rounded
                      depressed
                      link
                      :to="'/sign-user/' + activity.id"
                    >成员签到</v-btn>
                    <v-btn
                      v-if="isAdmin"
                      class="primary mx-2"
                      rounded
                      depressed
                      link
                      :to="'/activity/sign/' + activity.id"
                    >签到管理</v-btn>
                  </div>
                </v-col>
                <v-col cols="2">
                  <v-chip v-if="activity.status === '未开始'" color="blue" text-color="white">
                    <v-avatar left>
                      <v-icon>mdi-calendar-clock</v-icon>
                    </v-avatar>未开始
                  </v-chip>
                  <v-chip
                    v-if="activity.status === '进行中'"
                    color="yellow darken-3"
                    text-color="white"
                  >
                    <v-avatar left>
                      <v-icon>mdi-clock-outline</v-icon>
                    </v-avatar>进行中
                  </v-chip>
                  <v-chip v-if="activity.status === '已结束'" color="green" text-color="white">
                    <v-avatar left>
                      <v-icon>mdi-checkbox-marked-circle</v-icon>
                    </v-avatar>已结束
                  </v-chip>
                </v-col>
              </v-row>
              <v-card-text class="px-0 py-1">创建于：{{ getTime(activity.created_date) }}</v-card-text>
              <v-card-text
                class="px-0 py-1"
              >活动时间：{{ getTime(activity.start_time) }} - {{ getTime(activity.end_time) }}</v-card-text>
              <v-card-text class="px-0 py-1">
                <!-- <v-icon>mid-map-marker</v-icon> -->
                活动地点：{{ activity.location }}
              </v-card-text>
              <v-divider class="my-5"></v-divider>
              <markdown-it-vue-light class="md-body" :content="activity.description" />
            </v-card>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item eager>
        <v-row>
          <v-col>
            <v-card>
              <v-responsive :aspect-ratio="7/3" id="map-container"></v-responsive>
            </v-card>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import MarkdownItVueLight from "markdown-it-vue/dist/markdown-it-vue-light.umd";
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  name: "ActivityPage",
  data: () => ({
    tab: 0,
    isLoadMap: false,
    message: "",
    community_id: 0,
    admins: [],
    activity: {
      id: "",
      location: "",
      title: "",
      description: "",
      start_time: "",
      end_time: "",
      created_date: "",
      status: "",
    },
  }),
  computed: {
    isAdmin() {
      if (
        this.$store.getters.user &&
        this.admins.indexOf(parseInt(this.$store.getters.user.id)) > -1
      )
        return true;
      else return false;
    },
  },

  mounted() {
    this.activity.id = this.$route.params.activity_id;
    this.getActivity();
  },
  methods: {
    getAdmins() {
      this.axios.get("/api/community/" + this.community_id).then((response) => {
        this.admins = response.data.admins;
      });
    },
    getActivity() {
      this.axios.get("/api/activity/" + this.activity.id).then((response) => {
        this.activity.location = response.data.location;
        this.activity.title = response.data.title;
        this.activity.description = response.data.description;
        this.activity.start_time = response.data.start_time;
        this.activity.end_time = response.data.end_time;
        this.activity.created_date = response.data.created_date;
        this.activity.status = response.data.status;
        this.activity.longitude = response.data.longitude;
        this.activity.latitude = response.data.latitude;
        this.community_id = response.data.related_community.id;

        this.getAdmins();

        AMapLoader.load({
          key: "8609496b04a93409688d07601c08ae89", // 申请好的Web端开发者Key，首次调用 load 时必填
          version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          plugins: ["AMap.Geolocation", "AMap.ToolBar"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
          AMapUI: {
            // 是否加载 AMapUI，缺省不加载
            version: "1.1", // AMapUI 缺省 1.1
            plugins: [], // 需要加载的 AMapUI ui插件
          },
        })
          .then((AMap) => {
            var map = new AMap.Map("map-container", {
              zoom: 18, //级别
              center: [this.activity.longitude, this.activity.latitude], //中心点坐标
            });
            var geolocation = new AMap.Geolocation();
            map.addControl(geolocation);
            this.map = map;
            this.mapMarker = new AMap.Marker({
              position: new AMap.LngLat(
                this.activity.longitude,
                this.activity.latitude
              ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: "活动地点",
            });
            map.add(this.mapMarker);
            this.isLoadMap = true;
          })
          .catch((e) => {
            console.log(e);
          });
      });
    },
    getTime(time) {
      // return new Date(time).toLocaleString();
      return this.$moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  components: {
    MarkdownItVueLight,
  },
};
</script>
