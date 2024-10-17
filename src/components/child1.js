import React, { Component } from 'react';
import * as d3 from 'd3';

class ScatterPlot extends Component {
  componentDidMount() {
    this.drawPlot();
  }

  componentDidUpdate() {
    this.drawPlot();
  }

  drawPlot() {
    const data = this.props.data;
    
    if (data.length === 0) return;

    const margin = { top: 40, right: 30, bottom: 50, left: 60 };
    const width = 700 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    d3.select(this.refs.canvas).select('svg').remove();

    const svg = d3
      .select(this.refs.canvas)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.total_bill)])
      .range([0, width]);

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
      .text('Total Bill');

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.tip)])
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
      .text('Tips');

    svg
      .append('g')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.total_bill))
      .attr('cy', (d) => y(d.tip))
      .attr('r', 3)
      .style('fill', '#69b3a2');

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text('Total Bills vs Tips');
  }

  render() {
    return <div ref="canvas"></div>;
  }
}

export default ScatterPlot;
