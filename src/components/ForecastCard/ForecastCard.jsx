import React, { Component } from 'react';
import { getIcon } from '../../services/weather-icons';
import Graph from '../Graph/Graph.jsx'

import 'weather-icons/css/weather-icons.css';
import './ForecastCard.css';

class CardFront extends Component {
  render() {
    return(
      <div className="front">
        <h2>{this.props.date}</h2>
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
        time = 'night'
      } else {
        time = 'day'
      }
      return (
        <div className="report-card">
          <p>{h.dt_txt.slice(11,16)}</p>
          <p>{Math.round(h.main.temp * 10) /10} °{this.props.units === 'metric' ? 'C' : 'F'}</p>
          <p>({Math.round(h.main.feels_like * 10) /10} °{this.props.units === 'metric' ? 'C' : 'F'})</p>
          <i className={getIcon(h.weather[0].id, time)}></i>
        </div>
      )
    })

    return(
      <div className='back'>
        <div className='back-days'>
          {reports}
        </div>
        <div className="graph">
          <Graph data={this.props.data}/>
        </div>
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
    const icon = await getIcon(this.props.data[0].weather[0].id, 'day')
    const avgs = this.getAvgTemp();
    this.setState({
      avgs: avgs,
      icon: icon
    })

  }

  componentDidUpdate() {
    this.getAvgTemp();
    this.getDateString();
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
    })
    avgs.temp = Math.round((avgs.temp / 7) * 10) / 10;                  // This is also sloppy
    avgs.feels_like = Math.round((avgs.feels_like / 7) * 10) / 10;
    avgs.humidity = Math.round((avgs.humidity / 7) * 10) / 10;
    avgs.pressure = Math.round((avgs.pressure / 7) * 10) / 10;
    return avgs;
  }

  getDateString = () => {
    if (this.state.date) return;
    let date = new Date(0);
    date.setUTCSeconds(this.props.data[0].dt)
    date = date.toString().slice(0,10);
    this.setState({
      date: date
    })
  }


  render() {
    return(
      <div onMouseEnter={this.flip} onMouseLeave={this.flip} className={"card-container" + (this.state.flipped ? " flipped" : "")}>
        <CardFront avgs={this.state.avgs} icon={this.state.icon} units={this.props.units} date={this.state.date}/>
        <CardBack data={this.props.data} units={this.props.units}/>
      </div>
    )
  }
}

export default ForecastCard;
