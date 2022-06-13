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
        if (isArray(props.data) && props.data.length) {
            let arr = []
            Object.keys(props.data[0])?.map(i => {
                arr.push({ [i]: props.data[0][i] })
            })
            setData(arr)
        }
    }, [props.data])

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
                                dataSource={props.wan ? data?.slice(5, 9) : data?.slice(0, 4)}
                                renderItem={item => render(item)}
                            />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <List
                                size="small"
                                dataSource={props.wan ? data?.slice(9) : data?.slice(4)}
                                renderItem={item => render(item)}
                            />
                        </div>
                    </Col>
                </Row>
            </Spin>
        </>
    )
}
