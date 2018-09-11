import React, { Component } from 'react';
import './App.css';
import Search from './components/Search'
import { forecast } from './services/open-weather-map/open-weather-map.services'

class App extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.setState({
            error: false,
            days: []
        })
    }

    componentDidMount(){
        this.checkLocation();
    }

    loadForecast(query) {
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
                this.setState({ days })
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
        return (
            <div className="App">
                <Search />
                <div className="hours-area">
                    <div className="hour-head"></div>
                    {this.loadHours()}
                </div>
            </div>
        );
    }
}

export default App;
