import React, { Component } from 'react';
import { getIcon } from '../../services/weather-icons';

import 'weather-icons/css/weather-icons.css';
import './ForecastCard.css';

class ForecastCard extends Component {
  constructor(props) {
    super(props);

  }

  async componentDidMount() {

  }

  // TODO:
  // Average temp / feels_like
  // Average weather for icon


  render() {
    return(
      <div className="forecast-card">

      </div>
    )
  }
}

export default ForecastCard;
