<template>
  <v-container fluid class="pt-12 mt-6">
    <v-row justify="center" align="center">
      <v-col justify="center" align="center">
        <v-avatar color="orange" size="100">
          <span class="white--text headline">62</span>
        </v-avatar>
        <h1 class="display-1 py-3">{{ clubname }}</h1>
        <v-btn class="mx-2 mb-4" color="primary">关注</v-btn>

        <v-btn class="mx-2 mb-4" color="primary">申请</v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-card flat>
          <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="(it, idx) in clubDataType" :key="idx">{{ it }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(it, idx) in clubDataType" :key="idx">
              <v-row v-if="idx==0">
                <!-- 社团基本信息 -->
                <v-col cols="8" offset="2" class="mx-auto my-auto pa-2">
                  <!-- <v-carousel cycle hide-delimiter-background show-arrows-on-hover>
                    <v-carousel-item v-for="(slide, i) in data.clubInfo.carousel.slides" :key="i">
                      <v-sheet :color="data.clubInfo.carousel.colors[i]" height="100%">
                        <v-row class="fill-height" align="center" justify="center">
                          <div class="display-1">{{ slide }} Slide</div>
                        </v-row>
                      </v-sheet>
                    </v-carousel-item>
                  </v-carousel>-->
                </v-col>
              </v-row>
              <v-row v-if="idx==1">
                <!-- 社团动态 -->
                <v-col>
                  <v-list subheader>
                      <activity-item
                        v-for="(a, i) in data.clubActivities"
                        :key="i"
                        :club-avatar="a.clubAvatar"
                        :club-name="a.clubName"
                        :club-profile="a.clubProfile"
                        :club-target="a.clubTarget"
                        :activity-name="a.activityName"
                        :activity-time="a.activityTime"
                        :activity-location="a.activityLocation"
                        :activity-status="a.activityStatus"
                        :activity-content="a.activityContent"
                        :activity-target="a.activityTarget"
                        :show-club="False"
                      />
                    </v-list>
                </v-col>
              </v-row>
              <v-row v-if="idx==2">
                <!-- 社团通知 -->
                <v-col>
                  <v-card
                    flat
                    class="mx-auto my-auto pa-2"
                    v-for="(d, i) in data.clubNotice"
                    :key="i"
                  >
                    <v-card-title>{{ d.title }}</v-card-title>
                    <v-card-subtitle>{{ d.subtitle }}</v-card-subtitle>
                    <v-card-text class="text--primary">{{ d.message }}</v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row v-if="idx==3">
                <!-- 社团成员 -->
                <v-col>
                  <!-- <v-card>
                    <v-card-title>
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="desserts" :search="search">
                      <template v-slot:item.calories="{ item }">
                        <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip>
                      </template>
                    </v-data-table>
                  </v-card>-->
                  <v-card flat>
                    <v-card-title>admin</v-card-title>
                    <v-list subheader>
                      <user-item
                        v-for="(a, i) in data.clubMember.admin"
                        :key="i"
                        :user-avatar="a.avatar"
                        :user-name="a.name"
                        :user-profile="a.profile"
                        :user-target="a.target"
                      />
                    </v-list>
                  </v-card>
                  <v-card flat>
                    <v-card-title>member</v-card-title>
                    <v-list subheader>
                      <user-item
                        v-for="(m, i) in data.clubMember.member"
                        :key="i"
                        :user-avatar="m.avatar"
                        :user-name="m.name"
                        :user-profile="m.profile"
                        :user-target="m.target"
                      />
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserItem from "@/components/UserItem";
import ActivityItem from "@/components/ActivityItem";
export default {
  name: "ClubInfo",
  data: function() {
    return {
      tab: null,
      clubname: "ZJX Club",
      clubDataType: ["社团信息", "社团活动", "社团通知", "成员信息"],
      data: {
        clubInfo: {
          carousel: {
            colors: [
              "indigo",
              "warning",
              "pink darken-2",
              "red lighten-1",
              "deep-purple accent-4"
            ],
            slides: ["First", "Second", "Third", "Fourth", "Fifth"]
          },
          message: {
            time: "2020-7-15"
          }
        },
        clubActivities: [
          {
            clubAvatar: '',
            clubName: 'ZJX Club!',
            clubProfile: 'wuhu qifei',
            clubTarget: '',
            activityName: 'Linux install party',
            activityTime: '2020-7-17, 15:00-16:00',
            activityLocation: '西校区3B101',
            activityContent: "帮助安装Linux",
            activityTarget: '',
            activityStatus: '正在进行中'
          },
          {
            clubAvatar: '',
            clubName: 'ZJX Club!',
            clubProfile: 'wuhu qifei',
            clubTarget: '',
            activityName: 'Linux install party',
            activityTime: '2020-7-17, 15:00-16:00',
            activityLocation: '西校区3B101',
            activityContent: "帮助安装Linux",
            activityTarget: '',
            activityStatus: '已结束'
          },
        ],
        clubNotice: [
          {
            title: "zjx tql",
            subtitle: "2020-7-18",
            message: "wuhu qifei"
          },
          {
            title: "zjx tql",
            subtitle: "2020-7-18",
            message: "wuhu qifei"
          }
        ],
        clubMember: {
          admin: [
            {
              avatar: "",
              name: "ens",
              target: "",
              profile: "hello!"
            }
          ],
          member: [
            {
              avatar: "",
              name: "gyx",
              target: "",
              profile: "hello!"
            },
            {
              avatar: "",
              name: "zjx",
              target: "",
              profile: "hello!"
            }
          ]
        }
      }
    };
  },
  computed: {},
  methods: {},
  components: {
    UserItem,
    ActivityItem
  }
};
</script>