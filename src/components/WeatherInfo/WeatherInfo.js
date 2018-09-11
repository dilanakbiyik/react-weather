import React from 'react';
import './style.css';

class DayWeather extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const { data } = this.props;
        return (
            <div className="WeatherInfo">
                <span className="date-small">{data.dt_txt.split(' ')[1]}</span>
                <img alt={data.weather[0].description} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
                <span className="temp">{data.main.temp} °C</span>
                <span className="wind">{data.wind.speed} m/s</span>
                <span className="pressure">{data.main.pressure}</span>
            </div>
        )
    }
}


export default DayWeather;