import React, { Component } from 'react';
import Loading from '../Loading/Loading';

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

  }

  weatherCard = () => {

  }

  render() {
    let d = new Date(0)
    if (this.props.currentWeather) {
      d.setUTCSeconds(this.props.currentWeather.dt)
      console.log(d)
    }
    return(
      <div className="display">
        <div className="current-weather">
          <div className="left">
            <i className={this.props.icon}></i>
            {this.props.currentWeather &&
              <h2>{this.props.currentWeather.weather[0].description}</h2>
            }
          </div>
          {this.props.currentWeather &&
            <div className="right">
              <h1>{this.props.currentWeather.main.temp}</h1>
              <h2>Feels Like {this.props.currentWeather.main.feels_like}</h2>
              <p>
                {this.d}
                </p>
            </div>
          }
        </div>
    </div>
    )
  }
}

export default Weather;
