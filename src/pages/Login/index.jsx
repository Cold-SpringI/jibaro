import { login } from '@/services/ant-design-pro/api';
import { Alert, message } from 'antd';
import { useState } from 'react';
import { history, useIntl, useModel } from 'umi';
import './index.less';
import logo from '../../../img/argon.svg'


const Login = () => {
  const [userLoginState, setUserLoginState] = useState({});
  const [loginOk, setLoginOk] = useState(true);
  const [type, setType] = useState('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    console.log(userInfo);

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values) => {
    setLoginOk(true);
    if (values.username && values.password) {
      try {
        // 登录
        const msg = await login({ ...values, type });
        if (msg.status === 'ok') {
          setLoginOk(true);
          const defaultLoginSuccessMessage = intl.formatMessage({
            id: 'pages.login.success',
            defaultMessage: '登录成功！',
          });
          // message.success(defaultLoginSuccessMessage);
          await fetchUserInfo();
          /** 此方法会跳转到 redirect 参数所在的位置 */

          if (!history) return;
          const { query } = history.location;
          const { redirect } = query;
          history.push(redirect || '/');
          return;
        }
        setLoginOk(false);

        console.log(msg); // 如果失败去设置用户错误信息
        // message.error(msg.status)
        setUserLoginState(msg);
      } catch (error) {
        setLoginOk(false);
        const defaultLoginFailureMessage = intl.formatMessage({
          id: 'pages.login.failure',
          defaultMessage: '登录失败，请重试！',
        });
        message.error(defaultLoginFailureMessage);
      }
    } else {
      setLoginOk(false);
    }
  };

  const { status, type: loginType } = userLoginState;
  return (
    <>
      <div className="loginMain">
        <div className="login-container">
          <div className="login-form">
            <a className="brand">
              <img className="icon" src={logo} />
              <span className="brand-text">OpenWrt</span>
            </a>
            <form
              className="form-login"
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                const username = e.target[0].value;
                const password = e.target[1].value;
                await handleSubmit({ username, password });
              }}
            >
              <div className="errorbox" style={{ display: loginOk ? 'none' : 'block' }}>
                无效的用户名和/或密码！请重试。
              </div>
              <div className="input-container">
                <div className="input-group user-icon">
                  <input
                    className="cbi-input-user"
                    id="cbi-input-user"
                    type="text"
                    name="luci_username"
                    defaultValue="root"
                    size="0"
                  />
                  <label className="border" htmlFor="cbi-input-user" />
                </div>
                <div className="input-group pass-icon">
                  <input
                    className="cbi-input-password"
                    id="cbi-input-password"
                    type="password"
                    name="luci_password"
                    size="0"
                  />
                  <label className="border" htmlFor="cbi-input-password" />
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  value="登录"
                  className="cbi-button cbi-button-apply"
                  size="0"
                />
              </div>
            </form>
            <footer>
              <div className="ftc">
                <a className="luci-link">Powered by LuCI Master (git-21.335.48743-5f363d9)</a> /
                <a href="https://github.com/jerrykuku/luci-theme-argon">ArgonTheme v1.7.2</a> /
                OpenWrt R22.1.1
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
