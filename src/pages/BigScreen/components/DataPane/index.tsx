import DiskBytes from "./diskBytes";
import Utilization from "./utilization";
import React from "react";
import './index.less'

export default function DataPane() {
    return (
        <div className="data-pane-main">
            <DiskBytes style={{ height: '100%' , width: '50%'}} />
            <Utilization style={{ height: '100%' , width: '50%'}}/>
        </div>
    )
}