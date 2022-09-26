import DiskBytes from "./diskBytes";
import Utilization from "./utilization";
import React from "react";
import './index.less'

interface IProps {
    instanceList?: any;
}
export default function DataPane(props: IProps) {
    const { instanceList } = props;
    return (
        <div className="data-pane-main">
            <DiskBytes
                instanceList={instanceList}
                style={{ height: '100%', width: '50%' }} />
            <Utilization style={{ height: '100%', width: '50%' }} />
        </div>
    )
}