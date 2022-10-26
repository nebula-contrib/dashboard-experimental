import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Col, Row } from 'antd';
import './index.less';
import BigLineChart from '../../widgets/BigLineChart';

interface IProps {
    style?: any;
    instanceList?: any;
}

export default function DiskBytes(props: IProps) {
    const { style, instanceList } = props;

    const showList = instanceList.map(elem => elem.split(':')[0]);

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
            <Row style={{ height: '33%' }}>
                <div className='disk-pane-info'>
                    <strong>数据盘信息</strong>
                    <p>IP: {showList}</p>
                </div>
            </Row>
            <Row style={{ height: '33%' }}>
                <div className='disk-read-bytes'>
                    <div>disk readBytes</div>
                    <BigLineChart data={data}></BigLineChart>
                </div>
            </Row>
            <Row style={{ height: '33%' }}>
                <div className='disk-write-bytes'>
                    <div>disk writeBytes</div>
                    <BigLineChart data={data}></BigLineChart>
                </div>
            </Row>
        </div>
    )
}