import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Editor from '@/pages/Editor';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor,
    },
    {
      path: '/editor/:name',
      name: 'editfile',
      component: Editor,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
