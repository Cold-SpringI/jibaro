import RightContent from '@/components/RightContent';
import { PageLoading, SettingDrawer } from '@ant-design/pro-layout';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
import Logo from '../img/argon.svg'

const loginPath = '/login';
// const loginPath = '/';

/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export function getInitialState() {
  const fetchUserInfo = () => {

    const sid = sessionStorage.getItem('sid')
    if (sid) {
      return { access: "admin", name: "admin" }
    } else {
      history.push(loginPath);
      return undefined;
    }
  }; // 如果不是登录页面，执行

  if (history.location.pathname !== loginPath) {
    const currentUser = fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState, setInitialState }) => {
  let oncollapsed = false
  return {
    // iconfontUrl:'',
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: (logo, title) => (
      <div id="customize_menu_header" >
        <img className="icon" src={Logo} style={{ display: oncollapsed ? 'block' : 'none' }} />
        <div>{title}</div>
      </div>
    ),
    onCollapse: (collapsed) => {
      oncollapsed = collapsed
    },
    // fixedHeader: true,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
