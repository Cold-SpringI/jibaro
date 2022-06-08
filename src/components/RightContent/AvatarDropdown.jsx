import { outLogin } from '@/services/ant-design-pro/api';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { stringify } from 'querystring';
import { useCallback } from 'react';
import { history, useModel } from 'umi';
import styles from './index.less';

/**
 * 退出登录
 */
const loginOut = async () => {
  await outLogin();
  history.replace({
    pathname: '/login'
  });
};

const AvatarDropdown = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;

      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }

      history.push(`/account/${key}`);
    },
    [setInitialState],
  );
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );
  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;
  if (!currentUser || !currentUser.name) {
    return loading;
  }
  return (
    <div>
      <span className={`${styles.action} ${styles.account}`}>
        {/* <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" /> */}
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>
    </div>
  );
};

export default AvatarDropdown;
