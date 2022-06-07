export default [
  {
    path: '/login',
    layout: false,
    component: './Login',
  },
  {
    path: '/welcome',
    component: './Welcome',
  },

  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
