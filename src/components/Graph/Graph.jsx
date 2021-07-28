import React, { Component } from 'react';
import * as V from 'victory';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temps: this.getTemps(),
      feels: this.getFeels()
    }
  }

  getTemps() {
    let temps = []
    this.props.data.map((d, idx) => {
      temps.push({x: d.dt_txt.slice(11,16), y: d.main.temp})
    })
    return temps;
  }

  getFeels() {
    let feels = []
    this.props.data.map((d, idx) => {
      feels.push({x: d.dt_txt.slice(11,16), y: d.main.feels_like})
    })
    return feels;
  }

  render() {
    return(
      <V.VictoryChart>
        <V.VictoryGroup
          x=''
          maxDomain={{y: 30}}
          style={{
            data: { strokeWidth: 3, fillOpacity: 0.4 }
          }}
        >
          <V.VictoryArea
            interpolation="natural"
            style={{
              data: { fill: "cyan", stroke: "cyan" }
            }}
            data={this.state.temps}
          />
        <V.VictoryArea
            interpolation="natural"
            style={{
              data: { fill: "magenta", stroke: "magenta" }
            }}
            data={this.state.feels}
          />
        </V.VictoryGroup>
      </V.VictoryChart>
    );
  }
}


export default Graph;
