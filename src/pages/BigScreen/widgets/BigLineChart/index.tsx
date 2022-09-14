import { Line } from '@ant-design/plots';
import './index.less';
import React from 'react';

const BigLineChart = (props: any) => {
  const { data, length = 150 } = props

  const WIDTH = length;
  const HEIGHT = length;
  const config = {
    data,
    width: WIDTH,
    height: HEIGHT,
    // autoFit: true,
    padding: 20,
    xField: 'time',
    yField: 'value',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    theme: {
      styleSheet: {
        backgroundColor: '#0D4E73',
        brandColor: '#8EC7E9'
      }
    }
  };

  return (
    <div className='line-radius-chart'>
        <Line {...config} />
    </div>);
};

export default BigLineChart