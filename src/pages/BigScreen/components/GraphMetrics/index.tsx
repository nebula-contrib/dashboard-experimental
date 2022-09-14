import './index.less';
import BigLineChart from '../../widgets/BigLineChart';
import React, { useState, useEffect } from 'react';


function GraphMetrics() {


  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  return (
    <div className="graph-metrics-main">
      <div className="graph-metrics-title">Graph Metrics</div>
      {/* 这里column chart的height总是inherit不知道是在哪里设置的，查了很多文档没有找到*/}
      {/* 下面是个有点丑的解决办法 */}
      <div className='graph-metrics-chart-card'>
        <BigLineChart data={data}>activeSessionNums</BigLineChart>
      </div>

      <div className='graph-metrics-chart-card'>
        <BigLineChart data={data}>activeQueryNums</BigLineChart>
      </div>
      <div className='graph-metrics-chart-card'>
        <BigLineChart data={data}>slowQueryPercentage</BigLineChart>
      </div>
      <div className='graph-metrics-chart-card'>
        <BigLineChart data={data}>errorQueryPercentage</BigLineChart>
      </div>



      {/* <div className='graph-metrics-chart-card'>
        <div style={{ height: "100%" }}>
          <ColumnChart data={data}>slowQueryPercentage</ColumnChart>
        </div>
      </div>
      <div className='graph-metrics-chart-card'>
        <div style={{ height: "100%" }}>
          <ColumnChart data={data}>errorQueryPercentage</ColumnChart>
        </div>
      </div> */}
      {/* <ColumnChart data={data}>activeSessionNums</ColumnChart>
      <ColumnChart data={data}>activeQueryNums</ColumnChart>
      <ColumnChart data={data}>slowQueryPercentage</ColumnChart>
      <ColumnChart data={data}>errorQueryPercentage</ColumnChart> */}
    </div>
  )
}

export default GraphMetrics