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
    name: 'Event page',
    path: '/event/:id',
    props: { default: true },
    components: require('@/components/EventPage')
  },
  {
    name: 'Edit event',
    path: '/edit',
    components: require('@/components/EditEvent')
  },
  {
    name: 'Calendar',
    path: '/calendar',
    // components: require('@/components/EditEvent')
  },
  {
    name: '404',
    path: '*',
    // components: require('')
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