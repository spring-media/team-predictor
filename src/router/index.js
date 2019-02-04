import Vue from 'vue';
import Router from 'vue-router';
import TheMainContent from '@/components/Main/TheMainContent';

// Vue.use(Router);

export default new Router({
  routes: [
    {
      path: 'http://localhost:8080/name/:id/choices/:choice',
      name: 'HelloWorld',
      component: TheMainContent,
    },
  ],
  updated() {
  },
});
