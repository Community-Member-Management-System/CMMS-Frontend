import Vue from "vue";
import Router from "vue-router";
// import ActivityList from "@/components/ActivityList";
import ActivitySignClub from "@/components/ActivitySignClub";
import ActivitySignUser from "@/components/ActivitySignUser";
import SetUserInfo from "@/components/SetUserInfo";
import MyClubs from "@/components/MyClubs";
import ClubInfo from "@/components/ClubInfo";
import ClubManagement from "@/components/ClubManagement/ClubManagement";
import CreateActivity from "@/components/ClubManagement/CreateActivity";
import ActivityPage from "@/components/ActivityPage";

// import Page from '@/components/Page';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            component: MyClubs,
        },
        {
            path: "/myclubs",
            component: MyClubs,
        },
        {
            path: "/clubs",
            component: ClubInfo,
        },
        {
            path: "/manage-club",
            component: ClubManagement,
        },
        {
            path: "/create-activity",
            component: CreateActivity,
        },
        {
            path: "/activity",
            component: ActivityPage,
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
        },
    ],
});
export default router;
