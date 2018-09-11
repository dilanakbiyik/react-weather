import React, { Component } from 'react';
import './App.css';
import Search from './components/Search'
import DayWeather from './components/DayWeather'
import { forecast } from './services/open-weather-map/open-weather-map.services'
import { MdMyLocation } from 'react-icons/md'
class App extends Component {
    constructor(props){
        super(props);
        this.state = { days:[], error: false, searchParam:null, city: null };
        this.searchCity = this.searchCity.bind(this);
        this.loadCityInfo = this.loadCityInfo.bind(this);
        this.checkLocation = this.checkLocation.bind(this);
    }

    componentDidMount(){
        if(!this.state.searchParam){
            this.checkLocation();
        }
    }

    searchCity(city){
        this.loadForecast({
            q: city,
            city
        });
    }

    loadForecast(query, searchParam) {
        forecast(query)
            .then((result) => {
                let days = {};
                result.list.forEach((hourInfo) => {
                    const dateInfos = hourInfo.dt_txt.split(' ');
                    const hourInfos = dateInfos[1].split(':');
                    const hourIndex = parseInt(hourInfos[0],0)/3;
                    const dateName = dateInfos[0];
                    if(days[dateName]){

                    }else{
                        days[dateName] = {
                            data: {},
                            timestamp: hourInfo.dt_txt
                        }
                    }
                    days[dateName].data[hourIndex] = hourInfo;
                });
                this.setState({ days, searchParam,city: result.city })
            })
            .catch((error) => this.setState({ error : true }))
    }

    loadHours(){
        const hours = [0,1,2,3,4,5,6,7];
        const result = hours.map((val) =>
            <div className="hours-initial hour-head" key={'hours-head' + val}>
                <span className="hour">{this.getHourValue(val)}</span>
            </div>
        );
        return result;
    }

    getHourValue(i){
        if((i*3) < 10){
            return `0${i*3}.00`;
        }else{
            return `${i*3}.00`;
        }
    }

    checkLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                const location = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };
                this.loadForecast(location);
            }, (error) => console.log(error) );
        }
    }

    loadCityInfo(){
        const {city} = this.state;
        if(city){
            return (
                <div className="city-info-area">
                    <div className="city-info">
                        <MdMyLocation size={25} onClick={this.checkLocation} />
                        <span>{city.name}</span>
                    </div>
                </div>
            )
        }
    }

    render() {
        const { days } = this.state;
        const _days = Object.keys(days);
        return (
            <div className="App">
                <Search search={this.searchCity}/>
                {this.loadCityInfo()}
                <div className="hours-area">
                    <div className="hour-head"></div>
                    {this.loadHours()}
                </div>
                <div className="days-area">
                    {_days.map((day) => <DayWeather key={day} day={day} hours={days[day].data} timestamp={days[day].timestamp} />)}
                </div>
            </div>
        );
    }
}

export default App;
