import { connect } from 'react-redux';
import { IRootState } from '@/store';
import { getDataByType, getMetricsUniqName } from '@/utils/dashboard';
import { VALUE_TYPE } from '@/utils/promQL';
import { MetricScene } from '@/utils/interface';
import React from 'react';
import BigLineChart from '@/pages/BigScreen/widgets/BigLineChart';

const mapState = (state: IRootState) => {
  const { memoryStat, memorySizeStat, metricsFilterValues } = state.machine;
  const { memoryBaseLine } = state.setting;
  const { aliasConfig } = state.app;
  return {
    data: getDataByType({
      data: memoryStat,
      type: metricsFilterValues.instanceList,
      nameObj: getMetricsUniqName(MetricScene.MEMORY),
      aliasConfig,
    }),
    sizes: memorySizeStat,
    baseLine: memoryBaseLine,
    valueType: VALUE_TYPE.percentage,
    loading:false,
  };
};

function MemoryCard(props: any) {
  const { data } = props;

  return (
    <div className='utilization-load'>
        <div>内存使用率</div>
        <BigLineChart data={data} />
    </div>
);
};

export default connect(mapState)(MemoryCard);
