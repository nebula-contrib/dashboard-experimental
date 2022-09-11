import StorageMetrics from './components/StorageMetrics'
import GraphMetrics from './components/GraphMetrics'
import Qps from './components/Qps';
import HealthInfo from './components/NodePane';
import DataPane from './components/DataPane';
import 'antd/dist/antd.css';
import { Col, Row } from 'antd';
import './index.less'
import React, { useEffect, useRef, useState } from 'react';


function BigScreen() {
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  const [screenHeight, setScreenHeight] = useState<number>(0);

  const monitorScreenRef = useRef<any>(null);

  // Get MonitorScreen's height
  const getScreenHeight = () => {
    const { clientHeight } = monitorScreenRef.current || {
      clientHeight: 0,
      clientWidth: 0,
    };
    return clientHeight;
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenHeight(getScreenHeight());
      setShouldRender(true)
      console.log('screenHeight: ', screenHeight)
    }, 500)
  }, [])
  const QPS_STYLE = {
    height: '500px',
  }

  return (
    <div className='whole-screen' ref={monitorScreenRef}>
      <Row gutter = {36} className="metrics">
        <Col span={5}>
          <Qps style={{ height: '30%' }}></Qps>
          {/* <StorageMetrics style={{ height: `${screenHeight - 300}px`}}/> */}
          <StorageMetrics style={{ height: '68.6%' }} />
        </Col>

        <Col span={14}>
          <Row style={{ height: '65%' }}>
            <DataPane></DataPane>
          </Row>
          <Row style={{ height: '35%' }}>
            <HealthInfo></HealthInfo>
          </Row>
        </Col>

        <Col span={5}style={{ height: '100%' }}>
          <GraphMetrics />
        </Col>
      </Row>
    </div>
  )
}

export default BigScreen
