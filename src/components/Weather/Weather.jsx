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

  }

  componentDidUpdate() {

  }

  weatherCard = () => {

  }

  render() {
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
              <h1>{this.props.currentWeather.main.temp} °{this.props.units === 'metric' ? 'C' : 'F'}</h1>
              <h2>Feels Like {this.props.currentWeather.main.feels_like} °{this.props.units === 'metric' ? 'C' : 'F'}</h2>

            </div>
          }
        </div>
    </div>
    )
  }
}

export default Weather;
