import React from 'react';
import SavedWeatherItem from './SavedWeatherItem';
import './SavedWeatherStyles.css';

class SavedWeatherInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            active : false,
            height : "0px",
            overflow : "hidden"
        }
    }
    render(){
        let savedWeatherInfo = this.props.savedWeatherInfo;
        let savedWeatherItems = [];
        if( savedWeatherInfo !== null ){
            savedWeatherItems = savedWeatherInfo.map((item) =>
                <SavedWeatherItem 
                    key={item.weatherInfoId}
                    id={item.weatherInfoId}
                    city={item.City}
                    country={item.Country}
                    time={item.Time}
                    date={item.Date}
                    temperature={item.Temperature}
                    pressure={item.Pressure}
                    wind={item.WindSpeed}
                    description={item.Description}
                />
            );
        }
        return(
            <div className="saved-weather__wrapper">
                <div className="saved-weather__title">
                    <div className="saved-weather__title-left">
                        <svg className="bi bi-bookmarks-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M2 4a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3V4z" clipRule="evenodd"></path>
                            <path d="M14 14l-1-.6V2a1 1 0 00-1-1H4.268A2 2 0 016 0h6a2 2 0 012 2v12z"></path>
                        </svg>
                        <p>Saved Weather Info</p>
                    </div>
                    <div className="saved-weather__title-right"
                        style={{transform : `rotate(${this.props.rotate})`}}>
                        <svg className="bi bi-caret-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 001.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 00-.753 1.659z" clipRule="evenodd"/>
                        </svg>
                    </div>
                </div>
                <div className="saved-weather__items" 
                    style={{
                        border : this.props.border,
                        minHeight : this.props.height,
                        overflow : this.props.overflow
                    }}>
                    {savedWeatherItems}
                </div>
            </div>
        );
    }
}

export default SavedWeatherInfo;