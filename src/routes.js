import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [
  {
    name: 'Home',
    path: '/',
    components: require('@/components/Home')
  },
  {
    name: 'EventPage',
    path: '/event/:id',
    // props: { default: true },
    components: require('@/components/EventPage')
  },
  {
    name: 'EditEvent',
    path: '/edit',
    components: require('@/components/EditEvent')
  },
  {
    name: 'Calendar',
    path: '/calendar',
    props: { 
      default: { short: false },
    },
    components: require('@/components/Calendar')
  },
  {
    name: '404',
    path: '*',
    components: require('@/components/404')
  }
];

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  console.log(to)
  next();
})

export default router;