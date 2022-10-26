import { connect } from 'react-redux';
import { IRootState } from '@/store';
import { getDataByType, getMetricsUniqName } from '@/utils/dashboard';
import { VALUE_TYPE } from '@/utils/promQL';
import { MetricScene } from '@/utils/interface';
import React from 'react';
import BigLineChart from '@/pages/BigScreen/widgets/BigLineChart';

const mapState = (state: IRootState) => {
  const { loadStat, metricsFilterValues } = state.machine;
  const { loadBaseLine } = state.setting;
  const { aliasConfig } = state.app;
  return {
    baseLine: loadBaseLine,
    data: getDataByType({
      data: loadStat,
      type: metricsFilterValues.instanceList,
      nameObj: getMetricsUniqName(MetricScene.LOAD),
      aliasConfig,
    }),
    valueType: VALUE_TYPE.number,
    loading: false,
  };
};

function LoadCard(props: any) {
  const { data } = props;

  return (
    <div className='utilization-load'>
        <div>Load</div>
        <BigLineChart data={data} />
    </div>
);
}

export default connect(mapState)(LoadCard);
