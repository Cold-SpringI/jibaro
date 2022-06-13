
import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import uci from '@/util/uci';
import { useIntl } from 'umi';
import Flow from './Componenets/Flow';
import LanStatus from './Componenets/LanStatus';
import { ubus } from '@/util/ubus';
import WanStatus from './Componenets/WanStatus';

export default () => {
    const intl = useIntl();
    const [wanData, setWanData] = useState([])
    const [wanLength, setWanLength] = useState(0)
    const [lanDynamicData, setLanDynamicData] = useState([])
    const [wanDynamicData, setWanDynamicData] = useState([])
    const [lanStaticData, setLanStaticData] = useState([])
    const [wanStaticData, setWanStaticData] = useState([])
    const [lanLength, setLanLength] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetchStatic();
    }, [count, lanDynamicData])

    useEffect(() => {
        fetchStatic();
        const timer = setInterval(() => {
            fetchDynamic()
        }, 3000);
        return () => {
            clearInterval(timer)
        }
    }, [])

    const fetchDynamic = () => {
        ubus.call('network.info', 'dynamic_get').then(rs => {
            const { lan = [], wan = [] } = rs.dynamic;
            if (lanLength !== lan.length || wanLength !== wan.length) {
                setCount(count + 1)
            }
            setLanLength(lan.length)
            setWanLength(wan.length)
            Reflect.deleteProperty(lan[0], 'interface')
            Reflect.deleteProperty(wan[0], 'interface')
            setLanDynamicData(lan)
            setWanDynamicData(wan)
        });
    }

    const fetchStatic = () => {
        ubus.call('network.info', 'static_get').then(r => {
            const { lan = [], wan = [] } = r.static;
            Reflect.deleteProperty(lan[0], 'interface')
            Reflect.deleteProperty(wan[0], 'interface')
            setLanStaticData(lan)
            setWanStaticData(wan)
        }).catch(e => {
            console.log(e);
        });
    }

    const translate = (value) => {
        return intl.formatMessage({ id: value })
    }

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
                    <ProCard colSpan={12} bordered direction="column">
                        <LanStatus title={translate('pages.status.status')} data={lanStaticData} />
                    </ProCard>
                    <ProCard colSpan={12} bordered direction="column">
                        <Flow title={translate('pages.status.flowInfo')} data={lanDynamicData} />
                    </ProCard>
                </ProCard>
                <ProCard title="WAN" direction="row" gutter={[20, 8]}>
                    <ProCard colSpan={12} bordered direction="column">
                        {/* <WanAndLanFlow title="状态" data={wanData} /> */}
                        <WanStatus title={translate('pages.status.status')} staticData={wanStaticData} dynamicData={wanDynamicData} />
                    </ProCard>
                    <ProCard colSpan={12} bordered direction="column">
                        <Flow title={translate('pages.status.flowInfo')} data={wanDynamicData} wan={true} />
                    </ProCard>
                </ProCard>
            </ProCard>
        </PageContainer >
    )
}
