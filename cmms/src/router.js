import Vue from 'vue';
import Router from 'vue-router';
import ActivityList from '@/components/ActivityList';
import ActivitySignClub from '@/components/ActivitySignClub';
import ActivitySignUser from '@/components/ActivitySignUser';
import SetUserInfo from '@/components/SetUserInfo';
// import Page from '@/components/Page';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: ActivityList
    },
    {
      path: '/activitysignclub',
      component: ActivitySignClub
    },
    {
      path: '/activitysignuser',
      component: ActivitySignUser
    },
    {
      path: '/setuserinfo',
      component: SetUserInfo
    }
  ]
});
export default router;