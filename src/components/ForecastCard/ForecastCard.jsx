import React, { Component } from 'react';
import { getIcon } from '../../services/weather-icons';

import 'weather-icons/css/weather-icons.css';
import './ForecastCard.css';

class CardFront extends Component {
  render() {
    return(
      <div className="front">
        <i className={this.props.icon}></i>
        <h3>{this.props.avgs && this.props.avgs.temp} °{this.props.units === 'metric' ? 'C' : 'F'}</h3>
      </div>
    )
  }
}

class CardBack extends Component {
  render() {

    let reports = this.props.data.map(h => {
      let time = parseInt(h.dt_txt.slice(11,13));
      if (time < 6 || time > 19) {
        time = 'day'
      } else {
        time = 'night'
      }
      return (
        <div className="report-card">
          <p>{h.main.temp} °{this.props.units === 'metric' ? 'C' : 'F'}</p>
          <p>({h.main.feels_like} °{this.props.units === 'metric' ? 'C' : 'F'})</p>
          <i className={getIcon(h.weather[0].id, time)}></i>
        </div>
      )
    })

    return(
      <div className='back'>
        {reports}
      </div>
    )
  }
}

class ForecastCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avgs: null,
      icon: null,
      text: this.props.data[0].dt_txt,
      flipped: false
    }
    this.flip = this.flip.bind(this);
  }

  flip = () => {
    this.setState({ flipped: !this.state.flipped });
  }

  async componentDidMount() {
    const icon = await getIcon(this.props.data[3].weather[0].id, 'day')
    const avgs = this.getAvgTemp();
    this.setState({
      avgs: avgs,
      icon: icon
    })

  }

  componentDidUpdate() {
    this.getAvgTemp();
  }

  // TODO:
  // Average temp / feels_like
  // Average weather for icon

  getAvgTemp = () => {
    if (this.state.avgs) return;
    let avgs = {
      temp: 0,
      feels_like: 0,
      humidity: 0,
      pressure: 0
    };
    this.props.data.map(t => {
      avgs.temp += t.main.temp;                 // This is so sloppy
      avgs.feels_like += t.main.feels_like;
      avgs.humidity += t.main.humidity;
      avgs.pressure += t.main.pressure;
      console.log(avgs)
    })
    avgs.temp = Math.round((avgs.temp / 7) * 10) / 10;                  // This is also sloppy
    avgs.feels_like = Math.round((avgs.feels_like / 7) * 10) / 10;
    avgs.humidity = Math.round((avgs.humidity / 7) * 10) / 10;
    avgs.pressure = Math.round((avgs.pressure / 7) * 10) / 10;
    return avgs;
  }


  render() {
    return(
      <div onMouseEnter={this.flip} onMouseLeave={this.flip} className={"card-container" + (this.state.flipped ? " flipped" : "")}>
        <CardFront avgs={this.state.avgs} icon={this.state.icon} units={this.props.units}/>
        <CardBack data={this.props.data}/>
      </div>
    )
  }
}

export default ForecastCard;
