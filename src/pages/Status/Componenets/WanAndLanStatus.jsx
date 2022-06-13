import React, { useEffect } from 'react'
import { Divider, List } from 'antd';

export default (props) => {

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
            <List
                size="small"
                dataSource={props.data}
                renderItem={item => render(item)}
            />
        </>
    )
}
