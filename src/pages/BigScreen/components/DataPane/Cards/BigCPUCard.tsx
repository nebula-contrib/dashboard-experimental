import { connect } from 'react-redux';
import { IRootState } from '@/store';
import React from 'react';
import BigLineChart from '@/pages/BigScreen/widgets/BigLineChart';
import { getDataByType, getMetricsUniqName } from '@/utils/dashboard';
import { VALUE_TYPE } from '@/utils/promQL';
import { MetricScene } from '@/utils/interface';

const mapState = (state: IRootState) => {
  const { cpuStat, metricsFilterValues } = state.machine;
  const { cpuBaseLine } = state.setting;
  const { aliasConfig } = state.app;

  return {
    baseLine: cpuBaseLine,
    data: getDataByType({
      data: cpuStat,
      type: metricsFilterValues.instanceList,
      nameObj: getMetricsUniqName(MetricScene.CPU),
      aliasConfig,
    }),
    valueType: VALUE_TYPE.percentage,
    loading: false,
  };
};

function CpuCard(props: any) {
  const { data } = props;

  return (
    <div className='utilization-load'>
        <div>CPU</div>
        <BigLineChart data={data} />
    </div>
);
}
export default connect(mapState)(CpuCard);
