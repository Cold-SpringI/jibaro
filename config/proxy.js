/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/ubus': {
      // 要代理的地址
      target: 'http://192.168.10.1/',
      changeOrigin: true,
    },
    '/cgi-bin': {
      target: 'http://192.168.10.1/',
      changeOrigin: true,

    },
  }
};
