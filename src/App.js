import React, { Component } from 'react';
import './App.css';
import Search from './components/Search'
import DayWeather from './components/DayWeather'
import { forecast } from './services/open-weather-map/open-weather-map.services'

class App extends Component {
    constructor(props){
        super(props);
        this.state = { days:[], error: false, searchParam:null }
        this.searchCity = this.searchCity.bind(this);
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
                            data: {}
                        }
                    }
                    days[dateName].data[hourIndex] = hourInfo;
                });
                this.setState({ days, searchParam })
            })
            .catch((error) => this.setState({ error : true }))
    }

    loadHours(){
        const hours = [0,1,2,3,4,5,6,7];
        const result = hours.map((val) =>
            <div className="hour-head" key={'hours-head' + val}>
                <span>{this.getHourValue(val)}</span>
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

    render() {
        const { days } = this.state;
        const _days = Object.keys(days);
        return (
            <div className="App">
                <Search search={this.searchCity}/>
                <div className="hours-area">
                    <div className="hour-head"></div>
                    {this.loadHours()}
                </div>
                <div className="days-area">
                    {_days.map((day) => <DayWeather key={day} day={day} hours={days[day].data} />)}
                </div>
            </div>
        );
    }
}

export default App;
