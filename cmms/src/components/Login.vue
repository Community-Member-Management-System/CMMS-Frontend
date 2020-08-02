<template>
  <v-container class="fill-height">
    <v-row class="mx-auto" align="center" justify="center">
      <h1 class="text-center text-h2 col col-12 my-5">USTC | 社团</h1>
      <v-btn class="mx-3" color="primary" rounded x-large outlined link>
        <v-icon>mdi-account</v-icon>统一身份验证登录
      </v-btn>
      <v-btn class="mx-3" rounded x-large outlined link to="/home">[测试用] 直接进入</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({}),
};
</script>