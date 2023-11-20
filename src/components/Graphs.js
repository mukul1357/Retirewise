import React from 'react'
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

export default function Graphs(props) {
    const data = [];
    for(let i=0; i<(props.keys).length; i++){
        data.push({
            label: props.keys[i],
            value: props.scheme[props.keys[i]]
        })
    }
    const dataSource = {
        chart: {
            caption: props.name,
            // subcaption: "For a net-worth of $1M",
            showvalues: "1",
            showpercentintooltip: "0",
            // numberprefix: "$",
            enablemultislicing: "1",
            numbersuffix: "%",
            theme: "candy"
        },
        data: data
    };
    return (
        <ReactFusioncharts
        type="pie3d"
        width="100%"
        height="300"
        responsive="1"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    )
}
