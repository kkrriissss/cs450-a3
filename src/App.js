import React, { Component } from 'react';
import * as d3 from 'd3';
import './App.css';
import ScatterPlot from './components/child1';
import BarChart from './components/child2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [] 
    };
  }

  componentDidMount() {
    d3.csv(process.env.PUBLIC_URL + '/data/tips.csv')
      .then((csvData) => {
        const parsedData = csvData.map((d) => ({
          total_bill: parseFloat(d.total_bill),
          tip: parseFloat(d.tip),
          day: d.day
        }));
        
        console.log("Parsed Data:", parsedData);
        
        this.setState({ data: parsedData });
      })
      .catch((error) => {
        console.error("Error loading the CSV file:", error);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Kriss Sitapara Assignment 3</h1>
        <div className="plot-container" style={{ marginBottom: '50px' }}>
          <ScatterPlot data={this.state.data} />
        </div>
        <div className="plot-container" style={{ marginTop: '50px' }}>
          <BarChart data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;