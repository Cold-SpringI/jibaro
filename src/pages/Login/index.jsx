
import { useState, useEffect } from 'react';
import { history, useModel } from 'umi';
import logo from '../../../img/argon.svg'
import { ubus } from '@/util/ubus';
import './index.less';
import { session } from '@/util/session';

const Login = () => {
  const [loginOk, setLoginOk] = useState(true);
  // const [haveSid, setHaveSid] = useState(true);
  const { initialState, setInitialState, getInitialState } = useModel('@@initialState');

  useEffect(async () => {
    const sid = sessionStorage.getItem('sid')
    if (sid) {
      await fetchUserInfo();
      // history.replace('/');
    }

    // console.log(initialState);
  }, [])

  const fetchUserInfo = async (currentUser) => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState(s => ({ ...s, ...currentUser }));
    }
  };
  const ubusLogin = (param) => {
    setLoginOk(true);
    // ubus.call('session', 'login', { username: param.username, password: param.password }).then(async (r) => {
    //   sessionStorage.setItem('sid', r.ubus_rpc_session);
    //   await fetchUserInfo({ currentUser: { name: r.data.username } });
    //   session.updateACLs().then(() => {
    //     history.replace('/');
    //   });
    //   return;
    // }).catch((e) => {
    //   if (e.error.code === 6) {
    //     setLoginOk(false);
    //   }
    // });
    session.login(param.username, param.password).then(valid => {
      if (valid) {
        fetchUserInfo({ currentUser: { name: param.username } });
        session.updateACLs().then(() => {
          history.replace('/');
        });
        return;
      }
    });
  }

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
                ubusLogin({ username, password })
                // handleSubmit({ username, password })
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
                    defaultValue="admin"
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
