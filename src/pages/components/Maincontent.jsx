import { Button } from 'antd';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { Progress } from '@ant-design/plots';
import { useIntl } from 'umi';
import { Gauge } from '@ant-design/plots';
import { ProCard } from '@ant-design/pro-components';
import './Maincontent.less';

export default function Maincontent(props) {
  const intl = useIntl();
  const [lable, setLable] = useState(null);
  const [loading, setLoding] = useState(false);

  const config = {
    height: 135,
    percent: 0.15,
    type: 'meter',
    innerRadius: 0.75,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ['#30BF78', '#FAAD14', '#F4664A'],
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    statistic: {
      content: {
        style: {
          fontSize: '16px',
          lineHeight: '16px',
        },
      },
    },
  };

  useEffect(() => {
    if (props.lable) {
      const arr = [];
      props.lable.map(i => {
        arr.push(
          <tr key={nanoid()}>
            <td width="33%">{i.name}</td>
            <td>{i.value}</td>
          </tr>,
        );
      })
      setLable(arr);
    }
  }, [props.lable]);

  return (
    <>
      <h2 name="content" style={{ display: props.noContent ? 'none' : 'block', marginTop: 0 }}>
        {props.content}
      </h2>
      <div className="refresh" style={{ display: props.refresh ? 'block' : 'none' }}>
        <Button
          type="primary"
          loading={loading}
          onClick={() => {
            setLoding(true);
            setTimeout(() => {
              setLoding(false);
            }, 2000);
          }}
        >
          刷新
        </Button>
      </div>
      <div className="cbi-map-descr">{props.tips}</div>
      <div className='cpuAndMem'>
        <div className='cpu'>
          <ProCard title={intl.formatMessage({ id: 'pages.status.CpuUsage' })} >
            <Gauge {...config} percent={props.cpuUse} />
          </ProCard>
        </div>
        <div className='mem'>
          <ProCard title={intl.formatMessage({ id: 'pages.status.MemoryUsage' })}  >
            <Gauge {...config} percent={props.memUse} />
          </ProCard>
        </div>
      </div>
      <fieldset className="cbi-section" style={{ top: props.noContent ? 30 : 0 }}>
        <span className="panel-title" style={{ display: props.panelTitle ? 'block' : 'none' }}>{props.panelTitle}</span>
        <table width="100%" cellSpacing="10">
          <tbody>{lable}</tbody>
        </table>
      </fieldset>
    </>
  );
}
