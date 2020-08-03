import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login";
import Home from "@/components/Home";
// import ActivityList from "@/components/ActivityList";
import ActivitySignClub from "@/components/ActivitySignClub";
import ActivitySignUser from "@/components/ActivitySignUser";
import SetUserInfo from "@/components/SetUserInfo";
import MyClubs from "@/components/MyClubs";
import ClubInfo from "@/components/ClubInfo";
import ActivityPage from "@/components/ActivityPage";

import CreateActivity from "@/components/Activity/CreateActivity";
import Community from "@/components/Community/Community";


// import Page from '@/components/Page';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            component: Login,
        },
        {
            path: "/home",
            component: Home,
            children: [
                {
                    path: "myclubs",
                    component: MyClubs,
                },
                {
                    path: "clubs",
                    component: ClubInfo,
                },
                {
                    path: "community",
                    component: Community
                },
                {
                    path: "create-activity",
                    component: CreateActivity,
                },
                {
                    path: "activity",
                    component: ActivityPage,
                },
                {
                    path: "activitysignclub",
                    component: ActivitySignClub,
                },
                {
                    path: "activitysignuser",
                    component: ActivitySignUser,
                },
                {
                    path: "setuserinfo",
                    component: SetUserInfo,
                },
            ],
        },
    ],
});
export default router;
