import React from 'react';
import BarGraph from './BarGraph';

let xLabels = ['GP', "G", "A", "P", "PIM", "+/-", "Shot%", "Blocked", "Hits"]
let title = 'Main Stats'

function CompareGraph({ width, height, data }){
  
  return (
    <div className="StatChart">
      <BarGraph width={width} height={height} data={data} xLabels={xLabels} title={title}/>
    </div>
  )
}


export default CompareGraph;