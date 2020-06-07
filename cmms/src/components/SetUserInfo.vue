<template>
    <v-container fluid class="py-12 my-12">
        
        <v-row justify="center" align="center">
                <v-col cols="8">
                    <v-sheet
                        color="grey lighten-3"
                        elevation="6"
                    >
                        <v-row justify="center" align="center" class="display-1 py-12">
                            设置个人信息
                        </v-row>
                        <v-row justify="center" align="start">
                            <v-col cols="6">
                                <v-file-input
                                    :rules="[v => !v || v.size < 2000000 || '头像过大']"
                                    accept="image/png, image/jpeg, image/bmp"
                                    placeholder="Pick an avatar"
                                    prepend-icon=""
                                    label="头像"
                                    loading
                                    outlined
                                    dense
                                >
                                </v-file-input>
                                <v-form v-model="valid">
                                    <v-text-field
                                        v-model="name"
                                        label="昵称"
                                        outlined
                                        :rules="[v => (v.length <= 10) || '昵称过长']"
                                        dense
                                    ></v-text-field>
                                    <v-select
                                        label="性别"
                                        v-model="gender"
                                        :items="['秘密', '男', '女']"
                                        outlined
                                        dense
                                    ></v-select>
                                    <v-text-field
                                        v-model="phone"
                                        label="手机"
                                        outlined
                                        :rules="[v => (!v || /^1(3|4|5|7|8)\d{9}$/.test(v) || '非法手机号')]"
                                        dense
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        v-model="email"
                                        label="Email"
                                        outlined
                                        :rules="[v => !v || /.+@.+\..+/.test(v) || '非法Email']"
                                        dense
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        v-model="description"
                                        label="个人简介"
                                        outlined
                                        :rules="[v => v.length <= 50 || '过长的个人简介']"
                                        dense
                                    >
                                    </v-text-field>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-sheet>
                </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "SetUserInfo",
    data: function () {
        return {
            name: "",
            gender: "",
            phone: "",
            email: "",
            description: "",
            valid: false
        }
    }, 
    methods: {

    }
}
</script>