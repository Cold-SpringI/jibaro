
import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import request from 'umi-request';
import uci from '@/util/uci';
import { useIntl } from 'umi';
import WanAndLanStatus from './Componenets/WanAndLanStatus';
import WanAndLanFlow from './Componenets/WanAndLanFlow';
import { ubus } from '@/util/ubus';

export default () => {
    const intl = useIntl();
    const [wanData, setWanData] = useState([])
    const [lanData, setLanData] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetchStatic();
    }, [count])

    useEffect(() => {
        // Object.keys(item).forEach(key => {
        //     // this.lan[index]['status'][key] = item[key];
        //     this.$set(this.lan[index]['status'], key, item[key]);
        // })
        fetchStatic();
    }, [lanData])

    const fetchStatic = () => {
        ubus.call('network.info', 'static_get').then(r => {
            const { lan = [], wan = [] } = r.static;

            let lanArr = []
            lan.forEach((item, index) => {
                if (lanData.length <= index) {
                    lanArr.push({
                        status: {
                            ip: '-',
                            mask: '-',
                            mac: '-',
                            mtu: '-',
                        },
                        flow: {}
                    });
                }
                Object.keys(item).forEach(key => {
                    uci.set(lanArr[index]['status'], key, item[key]);
                })
            });
            setLanData([
                { 'IP地址': lan[0].ip },
                { '子网掩码': lan[0].mask },
                { '物理地址': lan[0].mac },
                { '最大传输单元': lan[0].mtu }
            ])

            let wanArr = []
            wan.forEach((item, index) => {
                if (wanData.length <= index) {
                    wanData.push({
                        status: {
                            proto: '-',
                            mac: '-',
                            mtu: '-'
                        },
                        flow: {}
                    });
                }
                Object.keys(item).forEach(key => {
                    uci.set(wanArr[index]['status'], key, item[key]);
                });
            });
            setWanData([
                { '连接模式': wan[0].proto },
                { '物理地址': wan[0].mac },
                { '最大传输单元': wan[0].mtu },
            ])
        }).catch(e => {
            console.log(e);
        });
    }

    const translate = (value) => {
        return intl.formatMessage({ id: value })
    }
    useEffect(() => {
        fetchStatic();
    }, [])
    return (
        <PageContainer
            header={{
                breadcrumb: {},
            }}
            extra={[
                <Button key="1" type="primary" onClick={() => {

                }}>
                    {translate('pages.status.refresh')}
                </Button>,
            ]}
        >
            <ProCard direction="column" ghost gutter={[0, 20]}>
                <ProCard title="LAN" direction="row" gutter={[20, 8]}>
                    <ProCard colSpan={8} bordered direction="column">
                        <WanAndLanStatus title="状态" data={lanData} />
                    </ProCard>
                    <ProCard colSpan={16} bordered direction="column">
                        <WanAndLanFlow title="流量信息" />
                    </ProCard>
                </ProCard>
                <ProCard title="WAN" direction="row" gutter={[20, 8]}>
                    <ProCard colSpan={12} bordered direction="column">
                        <WanAndLanFlow title="状态" data={wanData} />
                    </ProCard>
                    <ProCard colSpan={12} bordered direction="column">
                        <WanAndLanFlow title="流量信息" />
                    </ProCard>
                </ProCard>
            </ProCard>
        </PageContainer >
    )
}
