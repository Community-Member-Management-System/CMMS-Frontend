<template>
  <v-container>
    <!-- 新建TODO表单 -->
    <v-row justify="center">
      <v-dialog v-model="newTodoDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">新建待办事项</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="newTodo.title" label="标题*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="newTodo.detail" outlined label="详细信息"></v-textarea>
                </v-col>
                <v-col cols="6">
                  <v-datetime-picker label="时间 *" v-model="newTodo.time"></v-datetime-picker>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="newTodoDialog = false">关闭</v-btn>
            <v-btn color="blue darken-1" text @click="addTodo">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-list-item>
              <v-badge :content="uncompletedTodoIndices.length">待完成</v-badge>
            </v-list-item>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list subheader two-line flat>
              <v-list-item-group>
                <v-list-item v-for="(todoIndex, i)  in uncompletedTodoIndices" :key="i">
                  <v-list-item-action>
                    <v-btn fab x-small outlined color="blue" @click="setTodoStatus(todoIndex,true)"></v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{allTodos[todoIndex].title}}</v-list-item-title>
                    <v-list-item-subtitle>{{allTodos[todoIndex].detail}}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-chip>
                    <v-icon>mdi-calendar</v-icon>
                    <div
                      class="ml-2"
                    >{{$moment(allTodos[todoIndex].time).format("YYYY-MM-DD HH:mm:ss")}}</div>
                  </v-chip>
                  <v-list-item-action>
                    <v-btn fab x-small outlined color="red" @click="removeTodo(todoIndex)">
                      <v-icon color="red">mdi-close</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-list-item>
              <v-badge :content="completedTodoIndices.length">已完成</v-badge>
            </v-list-item>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list subheader two-line flat>
              <v-list-item-group>
                <v-list-item v-for="(todoIndex, i)  in completedTodoIndices" :key="i">
                  <v-list-item-action>
                    <v-btn
                      fab
                      x-small
                      outlined
                      color="green"
                      @click="setTodoStatus(todoIndex,false)"
                    >
                      <v-icon color="green">mdi-check</v-icon>
                    </v-btn>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>
                      <div class="text-decoration-line-through">{{allTodos[todoIndex].title}}</div>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="text-decoration-line-through">{{allTodos[todoIndex].detail}}</div>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-chip>
                    <v-icon>mdi-calendar</v-icon>
                    <div
                      class="ml-2"
                    >{{$moment(allTodos[todoIndex].time).format("YYYY-MM-DD HH:mm:ss")}}</div>
                  </v-chip>
                  <v-list-item-action>
                    <v-btn fab x-small outlined color="red" @click="removeTodo(todoIndex)">
                      <v-icon color="red">mdi-close</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn
        elevation="5"
        bottom
        fixed
        class="mx-2"
        fab
        dark
        color="green"
        @click="newTodoDialog = true;"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    community: { required: true, default: null },
  },
  data() {
    return {
      newTodoDialog: false,
      isDark: true,
      show: true,
      newTodo: {
        title: "完成测试",
        detail: "必须完成前后端的测试",
        time: new Date(),
        // index: 是在后端存储的todo在数组中的下标，可看作todo的id
      },
      checklist: [], // f服务器返回的JSON字符串，需要反序列化为Object
    };
  },
  computed: {
    allTodos() {
      let len_todos = this.checklist.length;
      let todos = new Array(len_todos);
      for (var i = 0; i < len_todos; i++) {
        try {
          todos[i] = JSON.parse(this.checklist[i][0]);
        } catch (e) {
          console.log(e);
          todos[i] = {
            title: "错误格式的事项",
            detail: "请删除该事项",
            time: new Date(),
          };
        }
        todos[i].done = this.checklist[i][1];
        todos[i].index = i;
      }
      return todos;
    },
    completedTodoIndices() {
      let indices = [];
      for (let todo of this.allTodos) {
        if (todo.done) indices.push(todo.index);
      }
      return indices;
    },
    uncompletedTodoIndices() {
      let indices = [];
      for (let todo of this.allTodos) {
        if (!todo.done) indices.push(todo.index);
      }
      return indices;
    },
  },
  methods: {
    init() {
      this.axios
        .get(`/api/community/${this.community.id}/checklist`)
        .then((response) => {
          this.checklist = response.data.checklist;
        });
    },

    addTodo() {
      // this.uncompletedTodoIndices.unshift(Object.assign({}, this.newTodo));
      let newTodoStr = JSON.stringify(this.newTodo);
      this.axios
        .post(
          `/api/community/${this.community.id}/checklist/create`,
          { contents: newTodoStr },
          {
            headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
          }
        )
        .then((response) => {
          this.checklist = response.data.checklist;
          this.$toasted.show("添加成功！");
        });
      this.newTodoDialog = false;
    },

    removeTodo(todoIndex) {
      // for (var i = 0; i < this.completedTodoIndices.length; i++) {
      //   if (this.completedTodoIndices[i].id == id) {
      //     var item = this.completedTodoIndices[i];
      //     break;
      //   }
      // }
      // this.completedTodoIndices.splice(i, 1);
      this.axios
        .post(
          `/api/community/${this.community.id}/checklist/remove`,
          { index: todoIndex },
          {
            headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
          }
        )
        .then((response) => {
          this.checklist = response.data.checklist;
          this.$toasted.show("删除成功！");
        });
    },

    setTodoStatus(todoIndex, todoDone) {
      this.axios
        .post(
          `/api/community/${this.community.id}/checklist/set`,
          { index: todoIndex, done: todoDone },
          {
            headers: { "X-CSRFToken": this.$cookies.get("csrftoken") },
          }
        )
        .then((response) => {
          this.checklist = response.data.checklist;
          this.$toasted.show(todoDone ? "任务完成！" : "取消成功！");
        });
    },
  },
  activated() {
    this.init();
  },
};
</script>