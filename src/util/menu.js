import { ubus } from './ubus'
import axios from 'axios'
import i18n from '@/i18n'

const menu = {}

function parseMenus(raw) {
  let menus = {};

  Object.keys(raw).forEach(m => {
    const paths = m.split('/');
    if (paths.length === 1)
      menus[paths[0]] = raw[m];
  });

  Object.keys(raw).forEach(m => {
    const [menu, submenu] = m.split('/');
    if (submenu && menus[menu]) {
      if (!menus[menu].children)
        menus[menu].children = {};
      menus[menu].children[submenu] = raw[m];
    }
  });

  menus = Object.keys(menus).map(k => {
    return { path: '/' + k, ...menus[k] };
  });

  menus.forEach(m => {
    if (!m.children)
      return;

    m.children = Object.keys(m.children).map(k => {
      return { path: `${m.path}/${k}`, ...m.children[k] };
    });

    m.children.sort((a, b) => a.index - b.index);
  });

  menus.sort((a, b) => a.index - b.index);

  return menus.filter(m => m.children);
}

function buildRoute(menu) {
  if (menu.i18n) {
    const msgs = menu.i18n;
    for (const locale in msgs)
      i18n.mergeLocaleMessage(locale, msgs[locale]);
  }

  return {
    path: menu.path,
    component: resolve => {
      if (menu.plugin) {
        axios.get(`/views/${menu.view}.js`).then(r => {
          resolve(eval(r.data));
        });
      } else {
        return import(`@/views/${menu.view}`);
      }
    },
    meta: {
      title: menu.title,
      i18nfile: menu.i18nfile
    },
    beforeEnter: (to, from, next) => {
      if (!to.meta.i18nfile) {
        next();
        return;
      }

      to.meta.i18nfile = false;

      axios.get(`/i18n${to.path}.json`).then(r => {
        const msgs = r.data;
        for (const locale in msgs)
          i18n.mergeLocaleMessage(locale, msgs[locale]);
        next();
      }).catch(() => {
        next();
      });
    }
  };
}

function buildRoutes(menus) {
  const routes = [];

  menus.forEach(menu => {
    const route = {
      path: '/',
      component: () => import('@/components/layout'),
      meta: {
        title: menu.title
      },
      children: []
    };

    if (menu.view) {
      route.redirect = menu.path;
      route.children.push(buildRoute(menu));
    } else if (menu.children) {
      menu.children.forEach(sm => {
        route.children.push(buildRoute(sm));
      });
    }

    routes.push(route);
  });

  return routes;
}

const menuFilter = (function () {

  //总函数数量
  let totalNum = 8;
  //已经运行的函数数量
  let num = 0;

  let runCb = (menus, cb) => {

    ++num;
    if (num === totalNum) {
      num = 0;
      const routes = buildRoutes(menus);
      cb(menus, routes)
    }
  };

  let checkMenuList = (menus, checkValue, checkUrl, menuList) => {
    if (checkValue) {
      if (checkValue === 'all') {
        menus = menus.filter(item => item.path !== checkUrl)
        return menus
      } else {
        let checkMenuUrl = menus.find(menu => menu.path == checkUrl);
        if (Array.isArray(checkMenuUrl.children)) {
          checkMenuUrl.children = checkMenuUrl.children.filter(item => {
            return !checkValue.includes(item.path)
          })
        }
      }
    }
    return menus
  }

  return async function filter(menus, cb) {
    try {
      let wifi = await ubus.call('uci', 'get', { config: 'wireless' });
      let filter1 = Object.keys(wifi.values).map(key => wifi.values[key]).filter(it => {
        return it['.type'] === 'wifi-device';
      });
      if (filter1.length === 0) {
        let network = menus.find(menu => menu.path == '/network');
        if (Array.isArray(network.children)) {
          network.children.splice(network.children.findIndex(net => net.path == '/network/wifi'), 1);
        }
      }
      runCb(menus, cb);

    } catch (err) {
      runCb(menus, cb);
      console.log(err)
    }

    try {
      let wifi1 = await ubus.call('uci', 'get', { config: 'capacity' });
      if (wifi1.values && wifi1.values.capacity && wifi1.values.capacity.wifi === '0') {
        let network = menus.find(menu => menu.path == '/network');
        if (Array.isArray(network.children)) {
          network.children.splice(network.children.findIndex(net => net.path == '/network/wifi'), 1);
        }
      }
      runCb(menus, cb);
    } catch (err) {
      runCb(menus, cb);
      console.log(err)
    }

    try {
      let cellular = await ubus.call('cellular.info', 'count');
      if (Number(cellular.modemnum) == 0) {
        let network = menus.find(menu => menu.path == '/network');
        if (Array.isArray(network.children)) {
          network.children.splice(network.children.findIndex(net => net.path == '/network/cellular'), 1);
        }
      }
      runCb(menus, cb);

    } catch (err) {
      runCb(menus, cb);
      console.log(err)
    }

    try {
      let iot = await ubus.call('iot.info', 'count');
      if (iot.dtu === '0') {
        let status = menus.find(menu => menu.path == '/status');
        if (Array.isArray(status.children)) {
          status.children.splice(status.children.findIndex(net => net.path == '/status/iotInterface'), 1);
        }
      }
      runCb(menus, cb);

    } catch (err) {
      runCb(menus, cb);
      console.log(err)
    }

    try {
      let capacity = await ubus.call('uci', 'get', { config: 'capacity' });
      if (capacity.values.capacity.dtu === '0') {
        let network = menus.find(menu => menu.path == '/network');
        if (Array.isArray(network.children)) {
          network.children.splice(network.children.findIndex(net => net.path == '/network/dtu'), 1);
        }
      }
      runCb(menus, cb);
    } catch (err) {
      runCb(menus, cb);
      console.log(err)
    }

    try {
      let multiwan = await ubus.call('app.info', 'check', { name: 'multiwan' });
      if (multiwan.enable !== true) {
        let network = menus.find(menu => menu.path == '/network');
        if (Array.isArray(network.children)) {
          network.children.splice(network.children.findIndex(net => net.path == '/network/multiwan'), 1);
        }
      }
      runCb(menus, cb);

    } catch (err) {
      runCb(menus, cb);
      console.log(err)
    }

    try {
      let vpnbridge = await ubus.call('app.info', 'check', { name: 'vpnbridge' });
      if (vpnbridge.enable !== true) {
        let network = menus.find(menu => menu.path == '/vpn');
        if (Array.isArray(network.children)) {
          network.children.splice(network.children.findIndex(net => net.path == '/vpn/vpnbridge'), 1);
        }
      }
      runCb(menus, cb);

    } catch (err) {
      runCb(menus, cb);
      console.log(err)
    }

    try {
      let checkMenus = await ubus.call('uci', 'get', { config: 'webui_block_list' })
      if (checkMenus.values && checkMenus.values.weblist) {
        let menuList = checkMenus.values.weblist
        let menus1 = checkMenuList(menus, menuList.status, '/status', menuList)
        let menus2 = checkMenuList(menus1, menuList.network, '/network', menuList)
        let menus3 = checkMenuList(menus2, menuList.security, '/security', menuList)
        let menus4 = checkMenuList(menus3, menuList.vpn, '/vpn', menuList)
        let menus5 = checkMenuList(menus4, menuList.qos, '/qos', menuList)
        let menus6 = checkMenuList(menus5, menuList.sysfunctl, '/sysfunctl', menuList)
        let menus7 = checkMenuList(menus6, menuList.video, '/video', menuList)
        runCb(menus7, cb);
      }

    } catch (err) {
      runCb(menus, cb);
      console.log(err)
    }

  }

})()

menu.load = function (cb) {
  ubus.call('oui.ui', 'menu').then(r => {
    const menus = parseMenus(r.menu);
    menuFilter(menus, cb);
  });
}

export default menu;
