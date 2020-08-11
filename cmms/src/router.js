import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login";
import Home from "@/components/Home";
// import ActivityList from "@/components/ActivityList";
import ActivitySignClub from "@/components/ActivitySignClub";
import ActivitySignUser from "@/components/ActivitySignUser";
import SetUserInfo from "@/components/SetUserInfo";
import ClubInfo from "@/components/ClubInfo";
import ActivityPage from "@/components/ActivityPage";

import CreateActivity from "@/components/Activity/CreateActivity";
import Community from "@/components/Community/Community";
import InviteUser from "@/components/Community/InviteUser";

import SystemManagement from "@/components/SystemManagement/SystemManagement";
import SystemAuditCommunity from "@/components/SystemManagement/SystemAuditCommunity";

import PersonalInfo from "@/components/PersonalInfo";
import CreateCommunity from "@/components/CreateCommunity";
import ActivityList from "@/components/ActivityList";
import ClubList from "@/components/ClubList";



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
            path: "/home",
            // meta: {needAuth: false},
            component: Home,
            children: [
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
                {
                    path: "/create-community",
                    component: CreateCommunity,
                    meta: { needAuth: false }, // debug other components without auth
                },
                {
                    path: "/community/:authType", // authType can be 'admin' or 'user'
                    component: Community,
                    props: true,
                    meta: { needAuth: false }, // debug other components without auth
                },
                {
                    path: "/create-activity",
                    component: CreateActivity,
                    meta: { needAuth: false }, // debug other components without auth
                },
                {
                    path: "/personal-info",
                    component: PersonalInfo,
                    meta: { needAuth: false }, // debug other components without auth
                },
                {
                    path: "/invite-user",
                    component: InviteUser,
                    meta: { needAuth: false }, // debug other components without auth
                },
                {
                    path: "/activity",
                    component: ActivityPage,
                    meta: { needAuth: false }, // debug other components without auth
                },
                {
                    path: "/activitysignclub",
                    component: ActivitySignClub,
                },
                {
                    path: "/activitysignuser",
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
                }
            ],
        },
    ],
});
export default router;
