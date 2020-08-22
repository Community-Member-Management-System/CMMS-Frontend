<template>
  <v-container>
    <v-data-table class="elevation-1" :headers="headers" :items="items" sort-by="student_id">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>签到管理</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" class="mb-2" v-bind="attrs" v-on="on">添加成员</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">添加签到成员</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field
                        solo
                        outlined
                        flat
                        placeholder="请输入学号"
                        v-model="newItem.id"
                        label="学号"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                <v-btn color="blue darken-1" text @click="save">保存</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>-->
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "SignList",
  data: function () {
    return {
      id: "",
      headers: [
        { text: "学号", value: "student_id" },
        { text: "姓名", value: "real_name" },
        { text: "昵称", value: "nick_name" },
        { text: "手机", value: "phone" },
        { text: "Email", value: "email" },
        { text: "删除", value: "actions", sortable: false },
      ],
      users: [],
      items: [],
      dialog: false,
      newItem: {
        id: "",
      },
      defaultItem: {
        id: "",
      },
    };
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.id = this.$route.params.activity_id;
      this.axios.get("/api/activity/" + this.id).then((response) => {
        this.users = response.data.signed_in_users;
        for (let i = 0; i < this.users.length; i++) {
          this.axios.get("/api/users/" + this.users[i]).then((response) => {
            this.items.push(response.data);
          });
        }
      });
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm("确定要删除这条记录吗?") && this.items.splice(index, 1);
      // TODO: delete
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.newItem = Object.assign({}, this.defaultItem);
      });
    },
    save() {
      // TODO: add user
      this.close();
    },
  },
};
</script>
