import React from 'react'
import { Empty } from 'antd';
import ProCard from '@ant-design/pro-card';

export default (props) => {

    return (
        <ProCard loading={props.loading}>
            <div id="content_syslog">
                {
                    props.log
                    &&
                    <textarea readOnly="readonly" wrap="off" rows={parseInt(props.log?.match(/[\n]/g)?.length + 1).toString()} id="syslog" defaultValue={props.log} />
                }
                {
                    props.noData && <ProCard> <Empty /> </ProCard>
                }
            </div>
        </ProCard>
    )
}
