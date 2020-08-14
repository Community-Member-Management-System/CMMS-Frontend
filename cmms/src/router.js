import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login";
import Base from "@/components/Base";
import Home from "@/components/Home";

import ActivitySignClub from "@/components/Sign/ActivitySignClub";
import ActivitySignUser from "@/components/Sign/ActivitySignUser";

import SetUserInfo from "@/components/SetUserInfo";
import ClubInfo from "@/components/ClubInfo";
import ActivityPage from "@/components/Activity/ActivityPage";

import CreateActivity from "@/components/Activity/CreateActivity";
import Community from "@/components/Community/Community";
import InviteUser from "@/components/Community/InviteUser";

import SystemManagement from "@/components/SystemManagement/SystemManagement";
import SystemAuditCommunity from "@/components/SystemManagement/SystemAuditCommunity";

import UserPage from "@/components/User/UserPage";
import CreateModifyCommunity from "@/components/Community/CreateModifyCommunity";
import ActivityList from "@/components/ActivityList";
import ClubList from "@/components/ClubList";
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
                    path: "/clubs",
                    component: ClubList,
                },
                {
                    path: "/clubs/:club_id",
                    component: ClubInfo,
                },
                {
                    path: "/system-management",
                    component: SystemManagement,
                    meta: { needAuth: false }, // debug other components without auth
                },
                {
                    path: "/system-audit-community",
                    component: SystemAuditCommunity,
                    meta: { needAuth: false }, // debug other components without auth
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
                    component: CreateActivity,
                    props: true
                },
                {
                    path: "/user/:userId",
                    component: UserPage,
                    props: true
                },
                {
                    path: "/invite-user",
                    component: InviteUser,
                    meta: { needAuth: false }, // debug other components without auth
                },
                {
                    path: "/activity/:activity_id",
                    component: ActivityPage,
                    meta: { needAuth: false }, // debug other components without auth
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
                    path: "/activities",
                    component: ActivityList,
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
