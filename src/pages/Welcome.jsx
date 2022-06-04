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

  const getSiblings = (elem) => {
    let sibArr = [];
    let allChilds = elem.parentNode.children;

    allChilds.forEach((i, v) => {
      if (i.nodeType == 1 && i != elem) {
        sibArr.push(i);
      }
    });

    return sibArr;
  };

  const getMenu = () => {
    const firstMenu = [];
    Object.keys(menu).map((i) => {
      firstMenu.push(
        <li className="slide" key={nanoid()}>
          <a className="menu" data-title={i} key={nanoid()}>
            {i}
          </a>
          {Object.keys(menu[i]).map((j) => {
            return (
              <ul className="slide-menu" style={{ display: 'block' }} key={nanoid()}>
                <li
                  onClick={(e) => {
                    Object.keys(nav.current.childNodes).map((q) => {
                      //nav.current.childNodes[q].firstChild

                      nav.current.childNodes[q].firstChild.setAttribute('class', 'menu');
                      // console.log(...nav.current.childNodes[q].childNodes);
                      const allElement = [...nav.current.childNodes[q].childNodes];
                      console.log(allElement);
                      // for (let i in allElement) {
                      //   // console.log(allElement[i].getAttribute('class'));
                      //   if (allElement[i].getAttribute('class') === 'slide-menu active') {
                      //     allElement[i].setAttribute('class', 'slide-menu')
                      //   } else if (allElement[i].getAttribute('class') === 'menu active') {
                      //     allElement[i].setAttribute('class', 'menu')
                      //   }
                      // }

                      // e.target.className = 'noActive'
                      Object.keys(nav.current.childNodes[q].childNodes).map((h) => {
                        // nav.current.childNodes[q].childNodes[h].firstChild.setAttribute('class', '')
                        if (
                          nav.current.childNodes[q].childNodes[h].innerText === e.target.innerText
                        ) {
                          // nav.current.childNodes[q].childNodes[h].firstChild.setAttribute('class', '')

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
            {/* <li className="slide">
              <a className="menu active" data-title="Status" >状态</a>
              <ul className="slide-menu active" style={{ display: 'block' }}>
                <li className="active">
                  <a data-title="总览" href="/cgi-bin/luci/admin/status/overview">总览</a>
                </li>

              </ul>
            </li>
            <li className="slide">
              <a className="menu active" data-title="System" >系统</a>
              <ul className="slide-menu active">
                <li>
                  <a data-title="系统" href="/cgi-bin/luci/admin/system/system">系统</a>
                </li>

                <li>
                  <a data-title="计划任务" href="/cgi-bin/luci/admin/system/crontab">计划任务</a>
                </li>
                <li>
                  <a data-title="挂载点" href="/cgi-bin/luci/admin/system/fstab">挂载点</a>
                </li>
                <li>
                  <a data-title="LED 配置" href="/cgi-bin/luci/admin/system/leds">LED 配置</a>
                </li>
                <li>
                  <a data-title="备份/升级" href="/cgi-bin/luci/admin/system/flashops">备份/升级</a>
                </li>
                <li>
                  <a data-title="定时重启" href="/cgi-bin/luci/admin/system/autoreboot">定时重启</a>
                </li>
                <li>
                  <a data-title="文件传输" href="/cgi-bin/luci/admin/system/filetransfer">文件传输</a>
                </li>
                <li>
                  <a data-title="Argon 主题设置" href="/cgi-bin/luci/admin/system/argon-config">Argon 主题设置</a>
                </li>
                <li>
                  <a data-title="重启" href="/cgi-bin/luci/admin/system/reboot">重启</a>
                </li>
              </ul>
            </li>
            <li className="slide">
              <a className="menu" data-title="Services" >服务</a>
              <ul className="slide-menu">
                <li>
                  <a data-title="Hello World" href="/cgi-bin/luci/admin/services/vssr">Hello World</a>
                </li>
                <li>
                  <a data-title="ShadowSocksR Plus+" href="/cgi-bin/luci/admin/services/shadowsocksr">ShadowSocksR Plus+</a>
                </li>
              </ul>
            </li>
            <li className="slide">
              <a className="menu" data-title="Network" >网络</a>
              <ul className="slide-menu">
                <li>
                  <a data-title="接口" href="/cgi-bin/luci/admin/network/network">接口</a>
                </li>
                <li>
                  <a data-title="无线" href="/cgi-bin/luci/admin/network/wireless">无线</a>
                </li>
                <li>
                  <a data-title="DHCP/DNS" href="/cgi-bin/luci/admin/network/dhcp">DHCP/DNS</a>
                </li>
                <li>
                  <a data-title="主机名" href="/cgi-bin/luci/admin/network/hosts">主机名</a>
                </li>
                <li>
                  <a data-title="IP/MAC绑定" href="/cgi-bin/luci/admin/network/arpbind">IP/MAC绑定</a>
                </li>
                <li>
                  <a data-title="静态路由" href="/cgi-bin/luci/admin/network/routes">静态路由</a>
                </li>
                <li>
                  <a data-title="网络诊断" href="/cgi-bin/luci/admin/network/diagnostics">网络诊断</a>
                </li>
                <li>
                  <a data-title="防火墙" href="/cgi-bin/luci/admin/network/firewall">防火墙</a>
                </li>
              </ul>
            </li>
            <li className="slide">
              <a className="menu" data-title="Bandwidth_Monitor" >带宽监控</a>
              <ul className="slide-menu">
                <li>
                  <a data-title="显示" href="/cgi-bin/luci/admin/nlbw/display">显示</a>
                </li>
                <li>
                  <a data-title="配置" href="/cgi-bin/luci/admin/nlbw/config">配置</a>
                </li>
                <li>
                  <a data-title="备份" href="/cgi-bin/luci/admin/nlbw/backup">备份</a>
                </li>
              </ul>
            </li>
            <li className="slide">
              <a className="menu exit" data-title="Logout" href="/cgi-bin/luci/admin/logout">退出</a>
            </li> */}
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
                title={'System'}
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
