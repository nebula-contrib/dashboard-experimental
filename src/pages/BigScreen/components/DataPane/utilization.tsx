import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Row } from 'antd';
import BigCPUCard from './Cards/BigCPUCard';
import BigLoadCard from './Cards/BigLoadCard';
import BigMemoryCard from './Cards/BigMemoryCard';

export default function Utilization(props: any) {
    const { style } = props;

    return (
        <div className='utilization-main' style={style}>
            <Row style={{ height: "33%" }}>
                <div className='utilization-cpu'>
                    <BigCPUCard />
                </div>
            </Row>
            <Row style={{ height: "33%" }}>
                <div className='utilization-memory'>
                    <BigMemoryCard />
                </div>
            </Row>
            <Row style={{ height: "33%" }}>
                <div className='utilization-load'>
                    <BigLoadCard />
                </div>
            </Row>
        </div>
    )
}