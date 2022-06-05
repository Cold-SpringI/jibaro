import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import Maincontent from './components/maincontent';
import './Welcome.less';

const Welcome = () => {
  const [menuElement, setMentElement] = useState(null);
  const nav = useRef();

  const systemArr = {
    主机名: 'OpenWrt',
    主机型号: 'Xiaomi Mi Router CR660x',
    架构: 'MediaTek MT7621 ver:1 eco:3 x 4',
    固件版本: 'OpenWrt  R22.1.1 / LuCI Master (git-21.335.48743-5f363d9)',
  };

  const menu = {
    Status: {
      总览: '总览',
    },
    System: {
      系统: '系统',
      计划任务: '计划任务',
      挂载点: '挂载点',
    },
    Services: {
      'Hello World': 'Hello World',
      ShadowSocksR: 'ShadowSocksR',
    },
    Network: {
      接口: '接口',
      无线: '无线',
    },
    Bandwidth_Monitor: {
      接口: '接口1',
      无线: '无线1',
    },
    Logout: {
      退出: '退出',
    },
  };

  const getMenu = () => {
    const firstMenu = [];
    Object.keys(menu).map((i) => {
      firstMenu.push(
        <li className="slide" key={nanoid()}>
          <a
            className="menu"
            data-title={i}
            key={nanoid()}
            onClick={(e) => {
              //展开一级菜单
              if (e.target.className === 'menu') {
                e.target.className = 'menu active';
                Object.keys(e.target.parentNode.childNodes).map((i) => {
                  if (e.target.parentNode.childNodes[i].nodeName === 'UL') {
                    //展开二级菜单
                    e.target.parentNode.childNodes[i].setAttribute(
                      'style',
                      'display:block;transition: height 2s;',
                    );
                  }
                });
              } else {
                e.target.className = 'menu';
                Object.keys(e.target.parentNode.childNodes).map((i) => {
                  if (e.target.parentNode.childNodes[i].nodeName === 'UL') {
                    //收缩二级菜单
                    e.target.parentNode.childNodes[i].setAttribute('style', 'display:none');
                  }
                });
              }
            }}
          >
            {i}
          </a>
          {Object.keys(menu[i]).map((j) => {
            return (
              <ul className="slide-menu" style={{ display: 'none' }} key={nanoid()}>
                <li
                  onClick={(e) => {
                    Object.keys(nav.current.childNodes).map((q) => {
                      //清除全部一级菜单的active类名
                      nav.current.childNodes[q].firstChild.setAttribute('class', 'menu');

                      const allElement = [...nav.current.childNodes[q].childNodes];
                      for (let i = 1; i < allElement.length; i++) {
                        //清除全部二级菜单的active类名
                        allElement[i].firstChild.setAttribute('class', 'noActive');
                      }

                      Object.keys(nav.current.childNodes[q].childNodes).map((h) => {
                        if (
                          nav.current.childNodes[q].childNodes[h].innerText === e.target.innerText
                        ) {
                          //一级菜单
                          nav.current.childNodes[q].childNodes[
                            h
                          ].parentNode.firstChild.setAttribute('class', 'menu active');
                          //二级菜单
                          nav.current.childNodes[q].childNodes[h].firstChild.setAttribute(
                            'class',
                            'active',
                          );
                        }
                      });
                    });
                  }}
                >
                  <a data-title={menu[i][j]} key={nanoid()}>
                    {menu[i][j]}
                  </a>
                </li>
              </ul>
            );
          })}
        </li>,
      );
    });
    setMentElement(firstMenu);
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <div className="main">
        <div className="main-left">
          <div className="sidenav-header d-flex align-items-center">
            <a className="brand">OpenWrt</a>
          </div>
          <ul className="nav" ref={nav}>
            {menuElement}
          </ul>
        </div>
        <div className="main-right">
          <header className="bg-primary">
            <div className="fill">
              <div className="container" />
            </div>
          </header>
          <div id="maincontent">
            <div className="container">
              <Maincontent
                content={'System'}
                panelTitle={'System'}
                lable={systemArr}
                tips={'系统相关信息'}
              />
              <Maincontent panelTitle={'System1'} lable={systemArr} noContent />
              <Maincontent panelTitle={'System2'} lable={systemArr} noContent />
              <Maincontent panelTitle={'DHCP分配'} lable={systemArr} noContent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
