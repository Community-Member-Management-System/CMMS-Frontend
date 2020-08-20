import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login";
import Base from "@/components/Base";
import Home from "@/components/Home";
import CommunityList from "@/components/CommunityList";
import ActivityList from "@/components/ActivityList";

import ActivitySignClub from "@/components/Sign/ActivitySignClub";
import ActivitySignUser from "@/components/Sign/ActivitySignUser";

import SetUserInfo from "@/components/SetUserInfo";
import ActivityPage from "@/components/Activity/ActivityPage";

import CreateModifyActivity from "@/components/Activity/CreateModifyActivity";
import Community from "@/components/Community/Community";

import SystemManagement from "@/components/SystemManagement/SystemManagement";
import SystemAuditCommunity from "@/components/SystemManagement/SystemAuditCommunity";

import UserPage from "@/components/User/UserPage";
import CreateModifyCommunity from "@/components/Community/CreateModifyCommunity";
import SearchList from "@/components/SearchList";



// import Page from '@/components/Page';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            name: "Login",
            component: Login,
        },
        {
            path: "/base",
            component: Base,
            children: [
                {
                    path: "/home",
                    component: Home
                },
                {
                    path: "/community",
                    component: CommunityList,
                },
                {
                    path: "/activity",
                    component: ActivityList,
                },
                {
                    path: "/system",
                    component: SystemManagement,
                },
                {
                    path: "/system/audit/community",
                    component: SystemAuditCommunity,
                },
                //创建社团和修改社团合并到一起了
                {
                    path: "/community/create",
                    component: CreateModifyCommunity,
                },
                {
                    path: "/community/:communityId/modify",
                    component: CreateModifyCommunity,
                    props: true
                },
                {
                    path: "/community/:communityId",
                    component: Community,
                },
                {
                    path: "/activity/create/:communityId",
                    component: CreateModifyActivity,
                    props: true
                },
                {
                    path: "/activity/modify/:communityId/:activityId",
                    component: CreateModifyActivity,
                    props: true
                },
                {
                    path: "/user/:userId",
                    component: UserPage,
                    props: true
                },
                {
                    name: "ActivityPage",
                    path: "/activity/:activity_id",
                    component: ActivityPage,
                },
                {
                    path: "/sign-community/:activity_id",
                    component: ActivitySignClub,
                },
                {
                    path: "/sign-user/:activity_id",
                    component: ActivitySignUser,
                },
                {
                    path: "/setuserinfo",
                    component: SetUserInfo,
                    name: 'SetUserInfo'
                },
                {
                    path: "/search",
                    component: SearchList,
                    props: (route) => ({ query: route.query.q })
                }
            ],
        },
    ],
});
export default router;
