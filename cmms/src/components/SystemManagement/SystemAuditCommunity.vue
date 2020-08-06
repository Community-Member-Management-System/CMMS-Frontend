<template>
  <v-container>
    <v-row>
      <v-col justify="center" align="center">
        <div>
          <v-avatar size="120" color="primary"></v-avatar>
        </div>

        <div class="mt-5">
          <v-btn outlined color="primary">通过申请</v-btn>
          <v-btn class="ml-2" outlined color="red">拒绝申请</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            {{community.name}}
            <v-col align="end">
              <v-chip color="green" text-color="white">
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
                {{ community.valid ?'已通过':'待审核' }}
              </v-chip>
            </v-col>
          </v-card-title>

          <v-card-subtitle>
            <div>申请编号：{{community.pk}}</div>
            <div class="mt-2">申请人：{{community.owner}}</div>
          </v-card-subtitle>
          <v-card-text>
            <div class="mt-1">{{community.profile}}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CommunityInfo",
  data: function () {
    return {
      community: {
        pk: "1234567",
        members: "string",
        join_status: "string",
        name: "USTC LUG",
        profile:
          "简介简介简介简介简介简介简介简介简介简介简介\n简介简介简介简介简介简介简介简介简介简介简",
        avatar: "string",
        valid: false,
        creator: 0,
        owner: 0,
        admins: [0],
      },
    };
  },
  computed: {},
  methods: {},
};
</script>