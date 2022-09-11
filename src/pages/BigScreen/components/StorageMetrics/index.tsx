import './index.less'
import React, { useEffect, useState, useRef } from 'react';
import LineChart from '../../widgets/LineChart';
import { LineChartProps } from '../../utils/interface';

function addEdgeLantency(props: LineChartProps) {
    const { data, length = 260 } = props;

    // Have to wrap a <div> ajacent the LineChart, or it will be the same size of its ajacent div
    return <div className='storage-metrics-chart-card'>
        <LineChart data={data}></LineChart>
    </div>
}

function addVerticsLantency(props: LineChartProps) {
    const { data, length = 260 } = props;

    return <div className='storage-metrics-chart-card'>
        <LineChart data={data}></LineChart>
    </div>
}

function StorageMetrics(props: any) {
    const { style } = props;

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
        <div className="storage-metrics-main" style={style}>
            <div className="storage-metrics-title">
                StorageMetrics
            </div>
            <div className='storage-metrics-chart-card'>
                <LineChart data={data}></LineChart>
            </div>
            <div className='storage-metrics-chart-card'>
                <LineChart data={data}></LineChart>
            </div>
        </div>
    )
}
export default StorageMetrics