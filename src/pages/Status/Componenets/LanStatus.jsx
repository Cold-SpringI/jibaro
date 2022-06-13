import React, { useEffect } from 'react'
import { Divider, List } from 'antd';
import { useIntl } from 'umi';


export default (props) => {
    const intl = useIntl();
    const translate = (value) => {
        return intl.formatMessage({ id: value })
    }
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
                        <div style={{ width: '30%' }}>{translate('pages.status.' + i)}</div>
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
