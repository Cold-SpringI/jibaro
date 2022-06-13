import React, { useState, useEffect } from 'react'
import Maincontent from './Componenets/Maincontent';
import { useIntl } from 'umi';
import { ubus } from '@/util/ubus';
import moment from 'moment';

export default () => {
    const intl = useIntl();
    const [systemArr, setSysArr] = useState(null)
    const [haveStaticData, setHaveStaticData] = useState(null)
    const [cpuUse, setCpuUse] = useState(null)
    const [memUse, setMemUse] = useState(null)

    const getDynamic = () => {
        let staticData
        if (!haveStaticData) {
            ubus.call("system.info", "static_get").then(rs => {
                staticData = [
                    {
                        name: intl.formatMessage({ id: 'pages.status.DeviceModel' }),
                        value: rs.static.pmodel || '-'
                    },
                    {
                        name: intl.formatMessage({ id: 'pages.status.SN' }),
                        value: rs.static.sn || '-'
                    },
                    {
                        name: intl.formatMessage({ id: 'pages.status.HardwareVersion' }),
                        value: rs.static.hwversion || '-'
                    },
                    {
                        name: intl.formatMessage({ id: 'pages.status.FirmwareVersion' }),
                        value: rs.static.firmware || '-'
                    },
                    {
                        name: intl.formatMessage({ id: 'pages.status.CompileTime' }),
                        value: rs.static.build || '-'
                    },
                    {
                        name: intl.formatMessage({ id: 'pages.status.GpsSupport' }),
                        value: rs.static.gps === '1' ? intl.formatMessage({ id: 'pages.status.Yes' }) : intl.formatMessage({ id: 'pages.status.No' })
                    }
                ]
            })
        } else {
            staticData = haveStaticData
        }
        ubus.call("system.info", "dynamic_get").then(rs => {

            const time = moment.duration(rs.dynamic.run_time, 'seconds');
            const days = time.days() + 'd ';
            const hours = time.hours() + 'h ';
            const minutes = time.minutes() + 'm ';
            const seconds = time.seconds() + 's';
            // console.dir(time.days());
            // console.dir(time.months());
            // console.dir(time.years());
            let run_time = days ? days + hours + minutes + seconds : hours + minutes + seconds
            let dynamic = [
                {
                    name: intl.formatMessage({ id: 'pages.status.runTime' }),
                    value: run_time || '-'
                },
                {
                    name: intl.formatMessage({ id: 'pages.status.SystemTime' }),
                    value: rs.dynamic.system_time || '-'
                },
                {
                    sat: rs.dynamic.sat || '-',
                    sig: rs.dynamic.sig || '-',
                    name: intl.formatMessage({ id: 'pages.status.Location' }),
                    value: rs.dynamic.gps === '1' ? (rs.dynamic.lat && rs.dynamic.lon) ? (rs.dynamic.lon + ',' + rs.dynamic.lat) : '-' : intl.formatMessage({ id: 'pages.status.NotLocated' })
                }
            ]
            setCpuUse(rs.dynamic.cpu_use / 100)
            setMemUse(rs.dynamic.mem_use / 100)
            setHaveStaticData(staticData)
            setSysArr([...staticData, ...dynamic])
        })
    }
    useEffect(() => {
        const timer = setInterval(() => {
            getDynamic()
        }, 3000)
        return () => {
            clearInterval(timer)
        }
    }, [haveStaticData])

    useEffect(() => {
        getDynamic()
    }, [])
    return (
        <>
            <Maincontent
                cpuUse={cpuUse === 0 ? 0.01 : cpuUse}
                memUse={memUse === 0 ? 0.01 : memUse}
                content={intl.formatMessage({ id: 'pages.status.SystemInformation' })}
                lable={systemArr}
            />
        </>
    )
}
