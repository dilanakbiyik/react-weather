import React from 'react';
import './style.css';
import WeatherInfo from '../WeatherInfo';

class DayWeather extends React.Component {

    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.setState({})
    }

    loadEmpty(emptyArray){
        return emptyArray.map((val) => <div key={'empty' + val} className="hour-head">-</div>);
    }
    getEmptyArray(emptyIndex){
        const emptyArray = [];
        for(let i = 0; i< emptyIndex;i++){
            emptyArray.push(i);
        }
        return emptyArray;
    }

    render() {
        const { day, hours } = this.props;
        const _hours = Object.keys(hours);
        let emptyIndex = parseInt(_hours[0],0);
        const emptyDom = this.loadEmpty(this.getEmptyArray(emptyIndex));
        emptyIndex = parseInt(_hours[_hours.length - 1],0);
        const lastEmpty = this.loadEmpty(this.getEmptyArray(8 - emptyIndex-1));
        return (
            <div className="DayWeather hours-area">
                <div className="hour-head">{day}</div>
                {emptyDom}
                {_hours.map((hour) => <div key={day +'-'+hour} className="hour-head"><WeatherInfo data={hours[hour]} /></div>)}
                {lastEmpty}
            </div>
        );
    }
}


export default DayWeather;