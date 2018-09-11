import React from 'react';
import './style.css';
import WeatherInfo from '../WeatherInfo';
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class DayWeather extends React.Component {

    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.setState({})
    }

    loadEmpty(emptyArray){
        return emptyArray.map((val) => <div key={'empty' + val} className="hour-head no-data">No data</div>);
    }
    getEmptyArray(emptyIndex){
        const emptyArray = [];
        for(let i = 0; i< emptyIndex;i++){
            emptyArray.push(i);
        }
        return emptyArray;
    }

    render() {
        const { day, hours, timestamp } = this.props;
        const _hours = Object.keys(hours);
        let emptyIndex = parseInt(_hours[0],0);
        const emptyDom = this.loadEmpty(this.getEmptyArray(emptyIndex));
        emptyIndex = parseInt(_hours[_hours.length - 1],0);
        const lastEmpty = this.loadEmpty(this.getEmptyArray(8 - emptyIndex-1));
        const d = new Date(timestamp);
        const dayName = days[d.getDay()];
        return (
            <div className="DayWeather-area">
                <div className="DayWeather hours-area">
                    <div className="hour-head">
                        <span className="day">{dayName}</span>
                        <span>{day}</span>
                    </div>
                    {emptyDom}
                    {_hours.map((hour) => <div key={day +'-'+hour} className="hour-head"><WeatherInfo data={hours[hour]} /></div>)}
                    {lastEmpty}
                </div>
            </div>
        );
    }
}


export default DayWeather;