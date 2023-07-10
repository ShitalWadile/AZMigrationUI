import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { AppD3 } from '../Model/AppD3';



@Component({
  selector: 'app-d3app',
  templateUrl: './d3app.component.html',
  styleUrls: ['./d3app.component.css']
})
export class D3AppComponent implements OnInit, AfterViewInit {
  @ViewChild('sankeyContainer')
  private sankeyContainer!: ElementRef;

  

  applicationData: AppD3[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<AppD3[]>('http://localhost:5078/api/ApplicationD3').subscribe(data => {
      this.applicationData = data;
      this.renderSankey();
    });
  }

  ngAfterViewInit() {
    this.renderSankey();
  }

  // private renderSankey() {
  //   // Check if the necessary data is available
  //   if (!this.applicationData || this.applicationData.length === 0) {
  //     return;
  //   }

  //   // Prepare the Sankey data
  //   const nodes = this.applicationData.map(d => ({ name: d.Application_Name }));
  //   const links = this.applicationData.map(d => ({
  //     source: nodes.findIndex(n => n.name === d.Application_Name),
  //     target: nodes.findIndex(n => n.name === d.Serverinfo),
  //     value: d.Portinfo.length
  //   }));



  // private renderSankey() {
  //   // Check if the necessary data is available
  //   if (!this.applicationData || this.applicationData.length === 0) {
  //     return;
  //   }
    
  //   // Prepare the Sankey data
  //   const nodes = this.applicationData.map(d => ({ name: d.applicationName }));
    
  //   const links = this.applicationData.map(d => {
  //     const sourceIndex = nodes.findIndex(n => n.name === d.applicationName);
  //     let targetIndex = nodes.findIndex(n => n.name === d.serverName);
    
  //     // If targetIndex is -1 (missing target), set it to a valid target index
  //     if (targetIndex === -1) {
  //       targetIndex = nodes.length;
  //       nodes.push({ name: d.serverName });
  //     }
    
  //     return {
  //       source: sourceIndex !== -1 ? sourceIndex : -1,
  //       target: targetIndex,
  //       value: d.portInfo && d.portInfo.length ? d.portInfo.length : 0
  //     };
  //   });

  private renderSankey() {
    // Check if the necessary data is available
    if (!this.applicationData || this.applicationData.length === 0) {
      return;
    }
  
    // Prepare the Sankey data
    const nodesMap = new Map<string, number>(); // Map to track node names and their indices
    const nodes: any[] = [];
    const links: any[] = [];
  
    this.applicationData.forEach(d => {
      const sourceName = d.applicationName;
      const targetName = d.serverName;
      const portName = d.portInfo;
  
      // Add source node if it doesn't exist
      if (!nodesMap.has(sourceName)) {
        nodesMap.set(sourceName, nodes.length);
        nodes.push({ name: sourceName });
      }
  
      // Add target node if it doesn't exist
      if (!nodesMap.has(targetName)) {
        nodesMap.set(targetName, nodes.length);
        nodes.push({ name: targetName });
      }
  
      // Add port node if it doesn't exist
      if (!nodesMap.has(portName)) {
        nodesMap.set(portName, nodes.length);
        nodes.push({ name: portName });
      }
  
      // Create links
      links.push({
        source: nodesMap.get(sourceName),
        target: nodesMap.get(targetName),
        value: 1 // Modify this based on your requirements
      });
  
      links.push({
        source: nodesMap.get(targetName),
        target: nodesMap.get(portName),
        value: 1 // Modify this based on your requirements
      });
    });
  
    // Set the dimensions of the Sankey diagram
    const container = this.sankeyContainer.nativeElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
  
    // Set the margin and padding values
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const padding = { top: 20, right: 20, bottom: 20, left: 20 };
  
    // Calculate the inner width and height
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
  
    // Calculate the available width and height for the Sankey diagram
    const availableWidth = innerWidth - padding.left - padding.right;
    const availableHeight = innerHeight - padding.top - padding.bottom;
  
    // Compute the Sankey layout
    const sankeyDiagram = sankey<any, any>()
      .nodeWidth(40)
      .nodePadding(20)
      .size([availableWidth, availableHeight]);
  
    const sankeyData = {
      nodes: nodes,
      links: links
    };
  
    sankeyDiagram(sankeyData);
  
    // Create the SVG container
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left + padding.left},${margin.top + padding.top})`);
  
    // Create the link elements
    const link = svg.append('g')
      .selectAll('.link')
      .data(sankeyData.links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', sankeyLinkHorizontal())
      .style('stroke-width', 1) // Modify this value to adjust the link thickness
      .style('fill', 'none')
      .style('stroke', '#000')
      .style('opacity', 0.5); // Modify this value to adjust the link opacity
  
    // Create the node elements
    const node = svg.append('g')
      .selectAll('.node')
      .data(sankeyData.nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.x0},${d.y0})`)
      .style('fill', '#000')
      .style('opacity', 0.8);
  
    // Create the node rectangles
    node.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('height', (d: any) => d.y1 - d.y0)
      .attr('width', sankeyDiagram.nodeWidth())
      .style('shape-rendering', 'crispEdges')
      .style('stroke', '#555')
      .style('stroke-width', 0.5);
  
    // Create the node labels
    node.append('text')
      .attr('x', -6)
      .attr('y', (d: any) => (d.y1 - d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .text((d: any) => d.name)
      .style('font-size', '20px')
      .style('text-transform', 'uppercase')
      .filter((d: any) => d.x0 < availableWidth / 2)
      .attr('x', 6 + sankeyDiagram.nodeWidth())
      .attr('text-anchor', 'start');
  }
}  
