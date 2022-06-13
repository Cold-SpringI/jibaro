import React from 'react'
import { Col, Row, Divider, List } from 'antd';

export default (props) => {
    const receivedData = [
        { '收到包数': '91497' },
        { '收到错误包数': '0' },
        { '收到被丢弃包数': '0' },
        { '收到字节数': '12904381' }
    ];

    const sendData = [
        { '发送包数': '81787' },
        { '发送错误包数': '0' },
        { '发送被丢弃包数': '0' },
        { '发送字节数': '22153495' },
    ];

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
                        <div style={{ width: '30%' }}>{i}</div>
                        <div style={{ width: '30%' }}>{item[i]}</div>
                    </div>
                </List.Item >
            )
        })
        return arr
    }
    return (
        <>
            <Divider orientation="left" style={{ marginTop: 0 }}>{props.title}</Divider>
            <Row justify='space-around'>
                <Col span={12}>
                    <div>
                        <List
                            size="small"
                            dataSource={props.data}
                            renderItem={item => render(item)}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div>
                        <List
                            size="small"
                            dataSource={sendData}
                            renderItem={item => render(item)}
                        />
                    </div>

                </Col>
            </Row>
        </>
    )
}
