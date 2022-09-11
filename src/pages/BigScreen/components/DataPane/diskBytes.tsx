import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Col, Row } from 'antd';
import './index.less';
import LineChart from '../../widgets/LineChart';

function diskInfo() {
    return (
        <div className='disk-pane-info'>
            <strong>数据盘信息</strong>
            <p>别名: xxxxx</p>
            <p>IP: 192.168.8.60</p>
        </div>
    )
}

const diskReadBytes = (props: any) => {
    const { data, length = 400 } = props;

    return (
        <div className='disk-read-bytes'>
            <div>disk readBytes</div>
            <LineChart data={data}></LineChart>
        </div>
    )
}

const diskWriteBytes = (props: any) => {
    const { data, length = 400 } = props;

    return (
        <div className='disk-write-bytes'>
            <div>disk writeBytes</div>
            <LineChart data={data}></LineChart>
        </div>
    )
}

export default function DiskBytes(props: any) {
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
        <div className='disk-bytes-main' style={style}>
            {/* Curious why Row here not work */}
            <Row style={{height: '33%'}}>
                {diskInfo()}
            </Row>
            <Row style={{height: '33%'}}>
                {diskReadBytes({ data })}
            </Row>
            <Row style={{height: '33%'}}>
                {diskWriteBytes({ data })}
            </Row>
        </div>
    )
}