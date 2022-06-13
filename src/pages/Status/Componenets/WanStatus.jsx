import React, { useEffect, useState } from 'react'
import { Col, Row, Divider, List, Spin } from 'antd';
import { useIntl } from 'umi';
import { isArray } from 'lodash';

export default (props) => {
    const intl = useIntl();
    const [data, setData] = useState(null)
    const translate = (value) => {
        return intl.formatMessage({ id: value })
    }
    useEffect(() => {
        let arr = []
        if (isArray(props.staticData) && props.staticData.length) {
            Object.keys(props.staticData[0])?.map(i => {
                arr.push({ [i]: props.staticData[0][i] })
            })
        }
        if (isArray(props.dynamicData) && props.dynamicData.length) {
            Object.keys(props.dynamicData[0])?.map(i => {
                if (i === 'status') {
                    if (props.dynamicData[0][i] === '1') {
                        arr.push({ [i]: translate('pages.status.connected') })
                    } else {
                        arr.push({ [i]: translate('pages.status.noConnected') })
                    }
                } else {
                    arr.push({ [i]: props.dynamicData[0][i] })
                }
            })
        }
        setData(arr)
    }, [props.staticData, props.dynamicData])

    const render = (item) => {
        let arr = []
        Object.keys(item).map(i => {
            arr.push(
                <List.Item>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly'
                    }}>
                        <div style={{ width: '35%' }}>{translate('pages.status.' + i)}</div>
                        <div style={{ width: '35%' }}>{item[i]}</div>
                    </div>
                </List.Item >
            )
        })
        return arr
    }
    return (
        <>
            <Spin style={{ minHeight: 155 }} spinning={false}>
                <Divider orientation="left" style={{ marginTop: 0 }}>{props.title}</Divider>
                <Row justify='space-around'>
                    <Col span={12}>
                        <div>
                            <List
                                size="small"
                                dataSource={data?.slice(0, 4)}
                                renderItem={item => render(item)}
                            />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <List
                                size="small"
                                dataSource={data?.slice(4, 8)}
                                renderItem={item => render(item)}
                            />
                        </div>
                    </Col>
                </Row>
            </Spin>
        </>
    )
}
