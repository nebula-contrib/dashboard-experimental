import "./index.less";
import React from 'react';
import { Col, Row } from 'antd';
import { Progress } from '@ant-design/plots';
import 'antd/dist/antd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKitMedical } from '@fortawesome/free-solid-svg-icons'

function Battery() { //props: SVGProps<SVGSVGElement>
    return (
        <div className="parent-div" style={{height: "70%"}}>
            <Row style={{ height: "100%", width: "100%" }}>
                <Col span={8} style={{ height: "100%"}}>
                    <Row style={{height:"50%", justifyContent:"center"}}>
                        <p className="battery-title">集群健康度</p>
                    </Row>
                    <Row style={{height:"50%", justifyContent:"center", display:"flex"}}>
                        <FontAwesomeIcon style={{height:"25px", color:"rgb(165, 219, 212)", margin:"0px 4px"}} icon={faKitMedical} />
                        <p className="battery-title">60%</p>
                    </Row>
                </Col>
                <Col span={16} style={{ height: "100%", display: "flex" }}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 512 512" {...props}><path fill="currentColor" d="M80 160h32v200H80zm64 0h32v200h-32zm64 0h32v200h-32z"></path><path fill="currentColor" d="M432 176v-56.41A23.825 23.825 0 0 0 408 96H39.986a23.825 23.825 0 0 0-24 23.59v280.82a23.825 23.825 0 0 0 24 23.59H408a23.825 23.825 0 0 0 24-23.59V344h64V176Zm32 136h-64v80H47.986V128H400v80h64Z"></path></svg> */}
                    <div className="sub-div light"></div>
                    <div className="sub-div light"></div>
                    <div className="sub-div light"></div>
                    <div className="sub-div light"></div>
                    <div className="sub-div light"></div>
                    <div className="sub-div light"></div>
                    <div className="sub-div"></div>
                    <div className="sub-div"></div>
                    <div className="sub-div"></div>
                    <div className="sub-div"></div>
                </Col>
            </Row>

        </div>
    )
}

function Indication() {
    return (
        <Row style={{ height: "100%" }}>
            <Col span={8} style={{ height: "100%" }}>
                <div className="indication-card">
                    <p className="node-info" style={{ margin: "0px" }}>节点数</p>
                    <p className="indication-number">4</p>
                </div>
            </Col>
            <Col span={8} style={{ height: "100%" }}>
                <div className="indication-card">
                    <p className="node-info" style={{ margin: "0px" }}>服务数</p>
                    <p className="indication-number">7</p>
                </div>
            </Col>
            <Col span={8} style={{ height: "100%" }}>
                <div className="indication-card">
                    <p className="node-info" style={{ margin: "0px" }}>异常服务</p>
                    <p className="indication-number red">0</p>
                </div>
            </Col>
        </Row>
    )
}

function progressBar() {
    return (
        <div className="progress-bar-parent">
            <div className="progress-bar-child"></div>
        </div>
    )
}

// We should decide which one to choose
const DemoProgress = () => {
    const config = {
        height: 50,
        width: 300,
        autoFit: true,
        percent: 0.536,
        barWidthRatio: 0.4,
        color: ['#F4664A', '#E8EDF3'],
    };
    return <Progress {...config} className="" />;
};

function nodeCard() {
    return (
        <div className="node-card">
            <p className="node-info name">192.168.8.60</p>
            <div className="node-info"></div>
            <Row>
                <Col span={12}>
                    <p className="node-info">别名</p>
                </Col>
                <Col span={12}>
                    <p className="node-info">******</p>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <p className="node-info">内存</p>
                </Col>
                <Col span={12}>
                    {progressBar()}
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <p className="node-info">磁盘</p>
                </Col>
                <Col span={12}>
                    {progressBar()}
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <p className="node-info">内核版本</p>
                </Col>
                <Col span={12}>
                    <p className="node-info">v3.1.0</p>
                </Col>
            </Row>

        </div>
    )
}

export default function HealthInfo() {
    return <div className="health-info-main">
        <Row style={{height: "35%"}}>
            <Col span={10}>
                {Battery()}
            </Col>
            <Col span={10} offset={4}>
                {Indication()}
            </Col>
        </Row>
        <Row style={{height: "65%"}}>
            <Col span={8}>
                {nodeCard()}
            </Col>
            <Col span={8}>
                {nodeCard()}
            </Col>
            <Col span={8}>
                {nodeCard()}
            </Col>
        </Row>
    </div>

}