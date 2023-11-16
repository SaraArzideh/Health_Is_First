import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      // Set up scales and axes
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 400 - margin.left - margin.right;
      const height = 200 - margin.top - margin.bottom;

      // Scale for X-axis
      const x = d3.scaleTime()
        .domain(d3.extent(data, d => new Date(d.date)))
        .range([0, width]);

      // Scale for Y-axis
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.weight)])
        .range([height, 0]);

      // Line generator
      const line = d3.line()
        .x(d => x(new Date(d.date)))
        .y(d => y(d.weight));

      // Append SVG object to the container
      const svg = d3.select(d3Container.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Add X-axis
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add Y-axis
      svg.append('g')
        .call(d3.axisLeft(y));

      // Add the line path
      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line);
    }
  }, [data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};

export default LineChart;
