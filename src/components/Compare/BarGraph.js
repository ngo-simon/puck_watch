import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

let subgroup = ["p1", "p2"]

var margin = {top: 10, right: 30, bottom: 20, left: 50}

function BarGraph({ width, height, data, xLabels, title }){
  const ref2 = useRef();

  useEffect(() => {
    const svg = d3.select(ref2.current)
    svg
      .attr("width", width)
      .attr("height", height)
  }, [width, height, xLabels, title]);

  useEffect(() => {
    const svg = d3.select(ref2.current)
    svg.selectAll('*').remove()
      draw()
  })

  const draw = () => {
    // https://www.d3-graph-gallery.com/graph/barplot_grouped_basicWide.html
    // https://www.tutorialsteacher.com/d3js/animated-bar-chart-d3 
  
    const svg = d3.select(ref2.current)
    svg
      .selectAll("rect")
      .remove()
      
    var g = svg.append("g")
               .attr("transform", `translate(${margin.left},${margin.top})`)

    var w = width - margin.left - margin.right
    var h = height - margin.top - margin.bottom

    // axis
    var x = d3.scaleBand()
      .domain(xLabels)
      .range([0, w])
      .padding([0.2])

    let y_limit = title==='Main Stats' ? 90 : 50
    y_limit = title==='Percentage Graph' ? 100 : y_limit
    let y_min = title==='Percentage Graph' ? 50 : 0
    var y = d3.scaleLinear()
      .domain([y_min, y_limit])
      .range([ h, 0 ])

    g.append("g")
      .attr("transform", "translate(0," + h + ")")
      .call(d3.axisBottom(x).tickSize(0))

    
    g.append("g")
      .call(d3.axisLeft(y))

    const onMouseOver = (d, i) => {

      g.append('text')
      .attr('class', 'tool')
      .attr('x', xSubgroup(i.key) + x(i.header))
      .attr('y', y(i.value))
      .text(i.value)
    }
    const onMouseOut = (d, i) => {
      d3.selectAll('.tool')
      .remove()
    }
    // subgroup position
    var xSubgroup = d3.scaleBand()
      .domain(subgroup)
      .range([0, x.bandwidth()])
      .padding([0.05])
    
    // colors
    var color = d3.scaleOrdinal()
      .domain(subgroup)
      .range(['blue', 'red'])

    // bars

    var selection = g.append("g").selectAll("g")

    selection
      .attr("height", (d) => 0)
      .attr("y", (d) => 0)
    
    g.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function(d) { return "translate(" + x(d.header) + ",0)"; })
      .selectAll("rect")
      .data(function(d) { return subgroup.map(function(key) { return {key: key, value: d[key], header: d.header} }); })
      .enter()
      .append("rect")
      .on("mouseover", onMouseOver)
      .on("mouseout", onMouseOut)
      .attr("x", d => xSubgroup(d.key))
      .attr("y", d => y(d.value))
      .attr("width", xSubgroup.bandwidth())
      .attr("height", d => h - y(d.value))
      .attr("fill", d => color(d.key))

    selection
      .exit()
      .attr("y", (d) => h)
      .attr("height", 0)
      .remove()
    
  }


  return (
    <div className="PPchart">
      <h2>{title}</h2>
      <svg ref={ref2}>
      </svg>
    </div>
      
  )

}

export default BarGraph;