import React from 'react';
import './RenderInfoStyles.css';
import bookmarkSvg from '../Images/Bookmarks/bookmark.svg';
import bookmarkFilledSvg from '../Images/Bookmarks/bookmark-filled.svg';

class RenderWeather extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            weatherInfoId : this.props.city + this.props.time,
            saved : false,
            modalActive : false
        }
        this.saveWeatherInfo = this.saveWeatherInfo.bind(this);
    }
    saveWeatherInfo(event){
        event.stopPropagation();
        let btn = event.currentTarget;
        
        if( this.state.saved === false ){
            this.setState({
                saved : true
            }, () => {
                btn.innerHTML = `<img src=${bookmarkFilledSvg} alt="saved" />`;

                let savedWeatherInfo = [];
                if ( localStorage.getItem("weatherInfo") ){
                    savedWeatherInfo = JSON.parse(localStorage.getItem("weatherInfo"));
                }
                let city = this.props.city;
                let country = this.props.country;
                let temp = this.props.temperature;
                let pressure = this.props.pressure;
                let windSpeed = this.props.wind;
                let description = this.props.description;
                let date = this.props.date;
                let time = this.props.time;
                let weatherInfoId = this.state.weatherInfoId;
                savedWeatherInfo.unshift({
                    "City" : city,
                    "Country" : country,
                    "Temperature" : temp,
                    "Pressure" : pressure,
                    "WindSpeed" : windSpeed,
                    "Description" : description,
                    "Date" : date,
                    "Time" : time,
                    "weatherInfoId" : weatherInfoId
                });
                localStorage.setItem("weatherInfo", JSON.stringify(savedWeatherInfo));
            });
        } else if( this.state.saved === true ){
            this.setState({
                saved : false
            }, () => {
                btn.innerHTML = `<img src=${bookmarkSvg} alt="save" />`;

                let savedWeatherInfo = JSON.parse(localStorage.getItem("weatherInfo"));
                savedWeatherInfo.map((el) => {
                    let weatherInfoId = el.weatherInfoId;
                    let weatherInfoIndex = savedWeatherInfo.indexOf(el);
                    if( weatherInfoId === this.state.weatherInfoId ){
                        savedWeatherInfo.splice(weatherInfoIndex, 1);
                    }
                });
                localStorage.setItem("weatherInfo", JSON.stringify(savedWeatherInfo));
            });
        }
    }
    render(){
            return(
                <div className="weather-info__item-wrapper">
                    <div className="weather-info__item">
                        <div className="row top-row">
                            <div className="left-side">
                                <p className="city">{this.props.city}</p>
                            </div>
                            <div className="right-side">
                                <p className="temperature">{this.props.temperature} <sup className="grade">&deg; C</sup></p>
                            </div>
                        </div>
                        <div className="row middle-row">
                            <div className="left-side">
                                <p className="country">{this.props.country}</p>
                                <p className="description">{this.props.description}</p>
                                <p className="wind-speed">{this.props.wind} km/h, {this.props.pressure} hPa</p>
                            </div>
                            <div className="right-side">
                                <img src={this.props.icon} alt="icon" className="image" />
                            </div>
                        </div>
                        <div className="row bottom-row">
                            <div className="left-side">
                                <p className="time">
                                    <span className="field-name">Time: </span>{this.props.time}
                                </p>
                                <p className="date">
                                <span className="field-name">Date: </span>{this.props.date}
                                </p>
                                <p className="localtime">
                                    <span className="field-name">Local Time: </span>{this.props.localTime}
                                </p>
                            </div>
                            <div className="right-side">
                                <button className="weather-info__item-save"
                                  onClick={this.saveWeatherInfo} title="Save/Unsave">
                                    <img src={bookmarkSvg} alt="save"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}

export default RenderWeather;