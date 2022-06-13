import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import request from 'umi-request';
import { useEffect } from 'react';
import TabLog from './Componenets/TabLog';
import { useIntl } from 'umi';
import './style/syslog.less'

export default () => {

    const [loading, setLoading] = useState(false)
    const [selectKey, setSelectKey] = useState('system')
    const [log, setLog] = useState('')
    const [noData, setNoData] = useState(false)
    const intl = useIntl();

    const translate = (value) => {
        return intl.formatMessage({ id: value })
    }
    const fetchData = (type) => {
        // setLoading(true)
        // setNoData(false)
        request.post('/cgi-bin/system.log', {
            data: type
        }).then(r => {
            if (r.log && r.log.length > 0) {
                setLog(r.log.join('\n'))
            } else {
                setLog('')
                setNoData(true)
            }
            setLoading(false)
        }).catch(e => {
            console.log(e);
            setLoading(false)
            setNoData(true)
        })
    }
    useEffect(() => {
        fetchData(selectKey)
    }, [])
    return (
        <div
            style={{
                background: '#F5F7FA',
            }}
        >
            <PageContainer
                header={{
                    breadcrumb: {},
                }}
                onTabChange={(activeKey) => {
                    setLoading(true)
                    setNoData(false)
                    setSelectKey(activeKey)
                    fetchData(activeKey)
                }}
                tabList={[
                    {
                        tab: translate('pages.status.System'),
                        key: 'system',
                    },
                    {
                        tab: 'IPSEC',
                        key: 'ipsec',
                    },
                    {
                        tab: translate('pages.status.Firewall'),
                        key: 'firewall',
                    },
                    {
                        tab: 'DHCP',
                        key: 'dhcp',
                    },
                    {
                        tab: translate('pages.status.Dial'),
                        key: 'ppp',
                    },
                ]}
                extra={[
                    <Button key="1" type="primary" onClick={() => {
                        fetchData(selectKey)
                    }}>
                        {translate('pages.status.refresh')}
                    </Button>,
                ]}
            >
                < TabLog log={log} loading={loading} noData={noData} />
            </PageContainer >
        </div >
    )
}
