// Sub components
import StorageMetrics from './components/StorageMetrics'
import GraphMetrics from './components/GraphMetrics'
import Qps from './components/Qps';
import HealthInfo from './components/NodePane';
import DataPane from './components/DataPane';
// Layout related
import 'antd/dist/antd.css';
import { Col, Row, Spin } from 'antd';
import './index.less';
import React, { useEffect, useRef, useState } from 'react';
// Redux data
import { connect } from 'react-redux';
import { calcTimeRange } from '@/utils/dashboard';
import { SUPPORT_METRICS } from '@/utils/promQL';

const mapDispatch: any = (dispatch: any) => ({
  asyncGetCPUStateByRange: dispatch.machine.asyncGetCPUStatByRange,
  asyncGetMemoryStateByRange: dispatch.machine.asyncGetMemoryStatByRange,
  asyncGetLoadByRange: dispatch.machine.asyncGetLoadByRange,
  updateMetricsFiltervalues: dispatch.machine.updateMetricsFiltervalues,
});

const mapState = (state: any) => ({
  metricsFilterValues: state.machine.metricsFilterValues,
  loading: state.loading.effects.machine.asyncGetMetricsData,
  instanceList: state.machine.instanceList as any,
})

interface IProps
  extends ReturnType<typeof mapDispatch>,
  ReturnType<typeof mapState> {
  cluster?: any
};

let pollingTimer: any;

function BigScreen(props: IProps) {
  const { asyncGetCPUStateByRange, asyncGetMemoryStateByRange, asyncGetLoadByRange, updateMetricsFiltervalues,
    metricsFilterValues, loading, instanceList,
    cluster,
  } = props;

  //* Set the shouldRender state
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    setShouldRender(loading && metricsFilterValues.frequency === 0);
  }, [loading, metricsFilterValues.frequency]);

  // * Get MonitorScreen's height
  const monitorScreenRef = useRef<any>(null);

  // const [screenHeight, setScreenHeight] = useState<number>(0);

  // const getScreenHeight = () => {
  //   const { clientHeight } = monitorScreenRef.current || {
  //     clientHeight: 0,
  //     clientWidth: 0,
  //   };
  //   return clientHeight;
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setScreenHeight(getScreenHeight());
  //     setShouldRender(true)
  //     console.log('screenHeight: ', screenHeight)
  //   }, 500)
  // }, [])

  //* Get the redux-state data
  useEffect(() => {
    getMachineStatus();

    return () => { // Clear the pollingTimer after component unmounted
      if (pollingTimer) {
        clearTimeout(pollingTimer);
      }
    }
  }, [cluster]);

  const getMachineStatus = () => {
    const [start, end] = calcTimeRange(metricsFilterValues.timeRange);
    asyncGetCPUStateByRange({
      start,
      end,
      metric: SUPPORT_METRICS.cpu[0].metric,
      clusterID: cluster?.id
    });
    asyncGetMemoryStateByRange({
      start,
      end,
      metric: SUPPORT_METRICS.memory[0].metric,
      clusterID: cluster?.id
    });
    asyncGetLoadByRange({
      start,
      end,
      metric: SUPPORT_METRICS.load[0].metric,
      clusterID: cluster?.id
    });
  };

  // //* Set the polling status
  useEffect(() => {
    if (pollingTimer) {
      clearTimeout(pollingTimer);
    }
    pollingMachineStatus();
  }, [metricsFilterValues.timeRange, metricsFilterValues.frequency]);

  const pollingMachineStatus = () => { // It's a little trick, doesn't it?
    getMachineStatus();
    if (metricsFilterValues.frequency > 0) {
      pollingTimer = setTimeout(() => {
        pollingMachineStatus();
      }, metricsFilterValues.frequency);
    }
  };

  return (
    <Spin spinning={shouldRender}>
      <div className='whole-screen' ref={monitorScreenRef}>
        <Row gutter={36} className="metrics">
          <Col span={5}>
            <Qps style={{ height: '30%' }}></Qps>
            {/* <StorageMetrics style={{ height: `${screenHeight - 300}px`}}/> */}
            <StorageMetrics style={{ height: '68.6%' }} />
          </Col>

          <Col span={14}>
            <Row style={{ height: '65%' }}>
              <DataPane 
              instanceList={instanceList}
              />
            </Row>
            <Row style={{ height: '35%' }}>
              <HealthInfo></HealthInfo>
            </Row>
          </Col>

          <Col span={5} style={{ height: '100%' }}>
            <GraphMetrics />
          </Col>
        </Row>
      </div>
    </Spin>
  )
}

export default connect(mapState, mapDispatch)(BigScreen);
