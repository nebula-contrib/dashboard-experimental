import "./index.less";
import React, { useState, useEffect } from 'react';
import LineChart from '../../widgets/LineChart';

export default function Qps(props: any) {
    // Can't set the width, or it won't be the column width.
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
        <div className="qps-main" style={style}>
            <div className='qps-title'>QPS</div>
            <div className='qps-chart'><LineChart data={data}/></div>
        </div>
    )
} 