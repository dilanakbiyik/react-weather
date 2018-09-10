import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.setState({
            location: null
        })
    }

    componentDidMount(){
        this.checkLocation();
    }

    checkLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    location: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
            }, (error) => console.log(error) );
        }
    }

    render() {
        return (
            <div className="App">
                {JSON.stringify(this.state.location)}
            </div>
        );
    }
}

export default App;
