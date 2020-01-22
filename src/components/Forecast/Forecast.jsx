import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import ForecastCard from '../ForecastCard/ForecastCard';

import 'weather-icons/css/weather-icons.css';
import './Forecast.css';

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indivHrs: null,
      days: null
    }
  }

  // Write:
  // Array/Object destructuring
  // Date Parsing formula
  //

  componentDidMount() {
  }

  componentDidUpdate() {
    if (!this.state.indivHrs) {
      let indivHrs = [];
      this.props.forecast.list.map(f => {
        indivHrs.push(f);
      });
      this.setState({
        indivHrs: indivHrs
      });
      console.log('just set hours');
    }
    if (!this.state.days && this.state.indivHrs) {
      this.splitDays(this.state.indivHrs);
    }
  }

  splitDays = (hrs) => {
    let forecast = [];
    let day = [];
    let prev = null;
    hrs.map(i => {
      if (prev === null) { prev = i.dt_txt.slice(8,10) }
      if (i.dt_txt.slice(8,10) === prev) {
        day.push(i);
      } else {
        forecast.push(day);
        day = [];
        prev = i.dt_txt.slice(8,10);
      }
    })
    this.setState({
      days: forecast
    })
  }

  render() {
    return(
      <div className="forecast">
        {this.state.days ?
          this.state.days.map((d, index) => {
            return(<ForecastCard data={d} units={this.props.units}/> )
          })
          :
          <h1>loading</h1>
        }
      </div>
    )
  }
}

export default Forecast;
