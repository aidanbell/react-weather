import React, { Component } from 'react';

import 'weather-icons/css/weather-icons.css';
import './Weather.css';


class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeather: null,
      loaded: false
    }
  }

  componentDidMount() {
    console.log('mounted')
  }

  componentDidUpdate() {
    if (this.state.currentWeather) {
      this.setState({ loaded: true })
    }
  }

  weatherCard = (props) => {
    return(
      <div>
        <i className={this.props.icon}></i>
        <h2>{this.state.currentWeather.weather[0].main}</h2>
      </div>
    )
  }

  render() {
    console.log(this.props.currentWeather)
    return(
      <div className="current-weather">
        {this.state.loaded ?
          <this.weatherCard/>
            :
          <p>loading...</p>
          }
      </div>
    )
  }
}

export default Weather;
