import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Col, Row } from 'antd';
import LineChart from '../../widgets/LineChart';
import { LineChartProps } from '../../utils/interface';
const cpuUtilization = (props: LineChartProps) => {
    const { data, length = 400 } = props;

    return (
        <div className='utilization-cpu'>
            <div>CPU使用率</div>
            <LineChart data={data} />
        </div>
    );
}

const memoryUtilization = (props: LineChartProps) => {
    const { data, length = 400 } = props;

    return (
        <div className='utilization-memory'>
            <div>内存使用率</div>
            <LineChart data={data} />
        </div>
    );
}

const load = (props: LineChartProps) => {
    const { data, length = 400 } = props;

    return (
        <div className='utilization-load'>
            <div>Load</div>
            <LineChart data={data} />
        </div>
    );
}

export default function Utilization(props: any) {

    const { style, length = 400 } = props;
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
        // <div style={style}>
        //     <Row>
        //         <Col>
        //             {cpuUtilization({ data })}
        //         </Col>
        //     </Row>
        //     <Row>
        //         {memoryUtilization({ data })}
        //     </Row>
        //     <Row>
        //         {load({ data })}
        //     </Row>
        // </div>
        <div className='utilization-main' style={style}>
            <Row style={{height: "33%"}}>
                {cpuUtilization({ data })}
            </Row>
            <Row style={{height: "33%"}}>
                {memoryUtilization({ data })}
            </Row>
            <Row style={{height: "33%"}}>
                {load({ data })}
            </Row>
        </div>
    )
}