import React, { Component } from 'react';
import * as d3 from 'd3';

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    const data = this.props.data; 
    const aggregatedData = d3.rollups(
      data,
      v => d3.mean(v, d => d.tip),
      d => d.day
    ).map(([day, avgTip]) => ({ day, avgTip }));

    const margin = { top: 40, right: 30, bottom: 50, left: 60 },
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
      
    d3.select(this.refs.canvas).select('svg').remove();

    const svg = d3
      .select(this.refs.canvas)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(aggregatedData.map(d => d.day))
      .range([0, width])
      .padding(0.2);
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom / 2 + 10)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('Day');

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(aggregatedData, d => d.avgTip)])
      .range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 15)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('Average Tip');

    svg
      .selectAll('bar')
      .data(aggregatedData)
      .enter()
      .append('rect')
      .attr('x', d => x(d.day))
      .attr('y', d => y(d.avgTip))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.avgTip))
      .attr('fill', '#69b3a2');

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text('Average Tip by Day');
  }

  render() {
    return <div ref="canvas"></div>;
  }
}

export default BarChart;
