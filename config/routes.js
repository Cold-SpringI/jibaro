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
    path: '/status',
    name: 'status',
    routes: [
      {
        path: 'sys',
        name: 'sys',
        component: './Status/sys'
      },
      {
        path: 'syslog',
        name: 'syslog',
        component: './Status/syslog'
      },
      {
        path: 'networkInterface',
        name: 'networkInterface',
        component: './Status/networkInterface'
      },
      {
        path: 'vpn',
        name: 'vpn',
        component: './Welcome'
      },
      {
        path: 'connectstatus',
        name: 'connectstatus',
        component: './Welcome'
      },
      {
        path: 'cellularInterface',
        name: 'cellularInterface',
        component: './Welcome'
      },
      {
        path: 'bgp',
        name: 'bgp',
        component: './Welcome'
      },
    ],
  },
  {
    path: '/network',
    name: 'network',
    routes: [
      {
        path: 'eth',
        name: 'eth',
        component: './Welcome'
      },
      {
        path: 'multiwan',
        name: 'multiwan',
        component: './Welcome'
      },
      {
        path: 'cellular',
        name: 'cellular',
        component: './Welcome'
      },
      {
        path: 'loopback',
        name: 'loopback',
        component: './Welcome'
      },
      {
        path: 'static',
        name: 'static',
        component: './Welcome'
      },
      {
        path: 'bgp',
        name: 'bgp',
        component: './Welcome'
      },
      {
        path: 'wifi',
        name: 'wifi',
        component: './Welcome'
      },
      {
        path: 'netdetc',
        name: 'netdetc',
        component: './Welcome'
      },

    ],
  },
  {
    path: '/logout',
    icon: 'LogoutOutlined',
    name: 'logout',
    component: './Logout',
  },
  {
    path: '/',
    redirect: '/status/sys',
  },
  {
    component: './404',
  },
];
