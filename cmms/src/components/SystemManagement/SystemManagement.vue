<template>
  <v-container>
    <v-row class="mb-10">
      <v-col>
        <v-card flat>
          <v-tabs fixed-tabs v-model="tab">
            <v-tab v-for="(item, idx) in SystemManagementMsgType" :key="idx">{{ item }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(item, idx) in SystemManagementMsgType" :key="idx">
              <!-- 尚未处理的申请 -->
              <v-row class="background" v-if="idx==0">
                <v-col>
                  <system-application-item
                    v-for="(it, id) in items1"
                    :key="id"
                    :title="it.title"
                    :time="it.time"
                    :status="it.status"
                    class="my-3"
                  ></system-application-item>
                  <v-pagination v-model="curPage1" :length="length1" class='mt-4' :total-visible="7"></v-pagination>
                </v-col>
              </v-row>
              <v-row class="background" v-if="idx==1">
                <v-col>
                  <system-application-item
                    v-for="(it, id) in items2"
                    :key="id"
                    :title="it.title"
                    :time="it.time"
                    :status="it.status"
                    class="my-3"
                  ></system-application-item>
                  <v-pagination v-model="curPage2" :length="length2" class='mt-4' :total-visible="7"></v-pagination>
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
import SystemApplicationItem from "@/components/SystemApplicationItem";
export default {
  name: "SystemManagement",
  data: function () {
    return {
      tab: 0,
      curPage1: 1,
      curPage2: 1,
      itemPerPage: 5,
      SystemManagementMsgType: ["待处理的申请", "已处理的申请"],
      total1: 100,
      total2: 47,
      items1: [
        {
          title: "创建新社团",
          time: "2020-8-1",
          status: "申请通过",
        },
        {
          title: "更改社团名称",
          time: "2020-8-1",
          status: "申请通过",
        },
      ],
      items2: [
        {
          title: "创建新社团",
          time: "2020-8-1",
          status: "申请通过",
        },
        {
          title: "更改社团名称",
          time: "2020-8-1",
          status: "申请通过",
        },
      ],
      receivedData: null,
    };
  },
  computed: {
    length1: function () {
      return Math.ceil(this.total1 / this.itemPerPage);
    },
    length2: function () {
      return Math.ceil(this.total2 / this.itemPerPage);
    },
  },
  //   watch: {
  //     curPage1: {
  //       function(newVal, oldVal) {},
  //     },
  //     curPage2: {
  //       function(newVal, oldVal) {},
  //     },
  //   },
  methods: {
    // getMsgItems: function (msgType, page) {
    //   url = "";
    //   this.$axios
    //     .post(url, {
    //       // TODO:
    //       // 发送申请类型（1为未处理，2为已处理）和按照时间排序的第i个第j个 [i, j)
    //       // 接受: 所有的item (array), 总共的item个数
    //     })
    //     .then((response) => {
    //       this.receivedData = response.data;
    //     })
    //     .catch(function (error) {
    //       alert(error);
    //     });
    // },
  },
  components: {
    SystemApplicationItem,
  },
};
</script>