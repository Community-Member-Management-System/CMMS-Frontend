<template>
    <v-container fluid>
        <v-row justify="center" align="center" class="py-12 my-12 font-weight-light display-2">
            {{ clubName }} {{ activityName }} 签到
        </v-row>
        <v-row justify="center" align="center" class="py-12 my-12">
            <v-col cols="3">
                <v-form v-model="valid">
                    <v-text-field 
                        v-model="digitCode" 
                        label="Input 4 digit code" 
                        type="text" 
                        outlined
                        :rules="[v => (((v.length == 4) && /\d\d\d\d/.test(v)) || 'Invalid verify code')]"
                    >
                    </v-text-field>
                    <v-btn :disabled="!valid" @click="verifyRequest" color="success">
                        verify
                    </v-btn>
                </v-form>
                
            </v-col>
            
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "ActivitySignClub",
    data: function () {
        return {
            valid: false,
            digitCode: "",
            clubName: "无名社团",
            activityName: "无名活动",
        }
    },
    methods: {
        verifyRequest: function () {

        }
    }

}
</script>