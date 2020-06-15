import React from 'react';

class SavedWeatherItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display : "block"
        }
        this.deleteSavedInfo = this.deleteSavedInfo.bind(this);
    }
    deleteSavedInfo(){
        this.setState({
            display : "none"
        }, () => {
            const id = this.props.id;
            const localStorageWeather = JSON.parse(localStorage.getItem("weatherInfo"));
            let newArray = [];
            localStorageWeather.map((item) => {
                let itemId = item.weatherInfoId;
                let itemIndex = localStorageWeather.indexOf(item);
                if( itemId === id ){
                    localStorageWeather.splice(itemIndex, 1);
                }   else{
                    newArray.push(item);
                }
            });
            localStorage.setItem("weatherInfo", JSON.stringify(newArray));
        });
    }
    render(){
        return(
            <div className="saved-weather__item" style={{display : this.state.display}}>
                <div className="saved-weather__item-row">
                    <div className="saved-weather__item-row-left saved-city">
                        {this.props.city}
                        <br />
                        {this.props.country}
                    </div>
                    <div className="saved-weather__item-row-right saved-temperature">
                        {this.props.temperature} <sup>&deg; C</sup>
                        <p className="saved-weather__description">{this.props.description}</p>
                    </div>
                </div>
                <div className="saved-weather__item-row saved-weather__item-row-bottom">
                    <div className="saved-weather__item-row-left saved-time">
                        {this.props.date}, {this.props.time}
                    </div>
                    <div className="saved-weather__item-row-right saved-pressure">
                        <p>Wind speed: {this.props.wind} km/h</p>
                        <p>Pressure: {this.props.pressure} hPa</p>
                    </div>
                </div>
                <button className="deleteWeatherItem" 
                    title="Delete"
                    onClick={this.deleteSavedInfo}></button>
            </div>
        );
    }
}

export default SavedWeatherItem;