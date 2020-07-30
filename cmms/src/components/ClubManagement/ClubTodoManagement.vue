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
                  <v-menu
                    ref="menu"
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="newTodo.date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="newTodo.date"
                        label="日期"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="newTodo.date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="dateMenu = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(newTodo.date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <!-- <v-col cols="6">
                  <v-textarea v-model="newTodo.detail" outlined label="详细信息"></v-textarea>
                </v-col>-->
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
          <v-card-title>待完成 {{todos.length}} 项</v-card-title>
          <v-card-text>
            <v-list subheader two-line flat>
              <v-list-item-group>
                <v-list-item v-for="(todo, i)  in todos" :key="i">
                  <v-list-item-action>
                    <v-btn fab x-small outlined color="blue" @click="completeTodo(todo.id)"></v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{todo.title}}</v-list-item-title>
                    <v-list-item-subtitle>{{todo.detail}}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-icon>mdi-calendar</v-icon>
                  <div>{{todo.date}}</div>
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
          <v-card-title>已完成 {{completedTodos.length}} 项</v-card-title>
          <v-card-text>
            <v-list subheader two-line flat>
              <v-list-item-group>
                <v-list-item v-for="(todo, i)  in completedTodos" :key="i">
                  <v-list-item-action>
                    <v-btn fab x-small outlined color="red" @click="removeTodo(todo.id)">
                      <v-icon color="red">mdi-close</v-icon>
                    </v-btn>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>
                      <div class="text-decoration-line-through">{{todo.title}}</div>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="text-decoration-line-through">{{todo.detail}}</div>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-icon>mdi-calendar</v-icon>
                  <div>{{todo.date}}</div>
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
  data() {
    return {
      dateMenu: false,
      newTodoDialog: false,
      isDark: true,
      show: true,
      newTodo: { title: "", detail: "", date: "", time: "" },
      todo: [],
      todos: [
        {
          id: 2,
          title: "写vue前端",
          detail: "必须在开学前完成",
          date: "2020-08-21",
          time: "",
        },
      ],
      completedTodos: [
        {
          id: 1,
          title: "写django后端",
          detail: "必须在开学前完成",
          date: "2020-07-21",
          time: "",
        },
      ],
    };
  },
  methods: {
    addTodo() {
      this.todos.unshift(Object.assign({}, this.newTodo));
      this.newTodoDialog = false;
    },
    removeTodo(id) {
      for (var i = 0; i < this.completedTodos.length; i++) {
        if (this.completedTodos[i].id == id) {
          var item = this.completedTodos[i];
          break;
        }
      }
      this.completedTodos.splice(i, 1);
    },
    completeTodo(id) {
      // TODO:完成事项
      for (var i = 0; i < this.todos.length; i++) {
        if (this.todos[i].id == id) {
          var item = this.todos[i];
          break;
        }
      }
      this.todos.splice(i, 1);
      this.completedTodos.unshift(item);
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>