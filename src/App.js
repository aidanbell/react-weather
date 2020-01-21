import React, { Component } from 'react';
import Weather from './Components/Weather/Weather';

import { getCurrentLatLng } from './services/geolocation';
import { getCurWeather } from './services/weather-api';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: null,
      lng: null,
      units: 'metric'
    }
  }

  async componentDidMount() {
    const {lat, lng} = await getCurrentLatLng();
    const weatherData = await getCurWeather(lat, lng, this.state.units);
    this.setState({
      lat,
      lng,
      weatherData: {weatherData}
    })
  }
  render() {
    return (
      <div className="App">
        <h1>WEATHER APP</h1>
        <Weather/>
      </div>
    );
  }
}

export default App;
