import { Button } from 'antd';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import './Maincontent.less';

export default function Maincontent(props) {
  const [lable, setLable] = useState(null);
  const [loading, setLoding] = useState(false);

  useEffect(() => {
    if (props.lable) {
      const arr = [];
      Object.keys(props.lable).map((i) => {
        arr.push(
          <tr key={nanoid()}>
            <td width="33%">{i}</td>
            <td>{props.lable[i]}</td>
          </tr>,
        );
      });
      setLable(arr);
    }
  }, [props.lable]);

  return (
    <>
      <h2 name="content" style={{ display: props.noContent ? 'none' : 'block' }}>
        {props.content}
      </h2>
      <div className="refresh">
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
      <fieldset className="cbi-section" style={{ top: props.noContent ? 30 : 0 }}>
        <span className="panel-title">{props.panelTitle}</span>
        <table width="100%" cellSpacing="10">
          <tbody>{lable}</tbody>
        </table>
      </fieldset>
    </>
  );
}
