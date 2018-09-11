import React from 'react';
import './style.css';

class DayWeather extends React.Component {

    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.setState({})
    }

    loadEmpty(emptyArray){
        return emptyArray.map(() => <div className="hour-head">-</div>);
    }

    render() {
        const { day, hours } = this.props;
        const _hours = Object.keys(hours);
        let emptyIndex = parseInt(_hours[0],0);
        let emptyArray = [];
        for(let i = 0; i< emptyIndex;i++){
            emptyArray.push(i);
        }
        const emptyDom = this.loadEmpty(emptyArray);
        emptyIndex = parseInt(_hours[_hours.length - 1],0);
        emptyArray = [];
        for(let i = 0; i< 8 - emptyIndex-1;i++){
            emptyArray.push(i);
        }
        const lastEmpty = this.loadEmpty(emptyArray);
        return (
            <div className="DayWeather hours-area">
                <div className="hour-head">{day}</div>
                {emptyDom}
                {_hours.map((hour) => <div key={day +'-'+hour} className="hour-head">{hour}</div>)}
                {lastEmpty}
            </div>
        );
    }
}


export default DayWeather;