import React from 'react';
import { MdSearch, MdMyLocation } from 'react-icons/md';
import './style.css';

class Search extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props){
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
    }
    componentWillMount(){
        this.setState({
            search: ''
        })
    }

    onSubmitForm(){
        alert("here");
    }

    onChangeSearch(event){
        this.setState({
            search: event.target.value
        })
    }

    render() {
        return (
            <div className="Search">
                <div className="search-area">
                    <MdSearch size={25} onClick={this.onSubmitForm} />
                    <form onSubmit={this.onSubmitForm}>
                        <input onChange={this.onChangeSearch} type="text" placeholder={'Search for location'} />
                    </form>
                </div>
            </div>
        );
    }
}


export default Search;