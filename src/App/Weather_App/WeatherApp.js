import React from 'react';
import './WeatherApp.css';
import OfferCity from './Offer_City/OfferCity';
import SavedWeatherInfo from './SavedWeatherInfo/SavedWeatherInfo';
import RenderWeather from './RenderInfo/RenderWeatherInfo';
import WeatherErrorInfo from './RenderInfo/RenderErrorInfo';

import sunnyImg from './Images/Weather/sunny.jpg';
import rainImg from './Images/Weather/rain.jpg';
import snowImg from './Images/Weather/snow.jpg';
import cloudsImg from './Images/Weather/clouds.jpg';
import fogImg from './Images/Weather/fog.jpg';
import thunderImg from './Images/Weather/thunderstorm.jpg';
import clearImg from './Images/Weather/clear.jpg';

class WeatherApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCitiesArrayLoaded : false,
            bgImage : sunnyImg,
            requestedCity : "",
            uniqueCitiesArray : [],
            weatherInfoArray : [],
            error : "",
            errorCode : "",
            inputDisplay : "none",
            savedWeatherActive : false,
            savedWeatherBorder : "none",
            savedWeatherHeight : "0px",
            savedWeatherOverflow : "hidden",
            savedWeatherRotate : "0",
            savedWeatherInfoCoverWidth : "0",
            isModalActive : false
        };
        this.handleCityInput = this.handleCityInput.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleCityClick = this.handleCityClick.bind(this);
        this.changeInputState = this.changeInputState.bind(this);
        this.changeSavedWeatherState = this.changeSavedWeatherState.bind(this);
        this.hideError = this.hideError.bind(this);
    }

    async componentDidMount(){
        if( !localStorage.citiesArray ){
            const response = await fetch(
              'http://parseapi.back4app.com/classes/Continentscountriescities_City?count=1&limit=200000&keys=name',
              {
                headers: {
                  'X-Parse-Application-Id': 'bWhgR2KWPZ3fF6x6KWKg6kkAI7qHhYzr178snzkU',
                  'X-Parse-REST-API-Key': 'Nxov1JBpq6VaE6itEkaE8a5isc6a8D96eFHJIqvZ'
                }
              }
            );
            const data = await response.json();
            let citiesArray = data.results.map((city) => city.name);
            localStorage.setItem("citiesArray", citiesArray);
            this.setState({
              isArrayLoaded : true
            });
          } else{
            this.setState({
              isArrayLoaded : true
            });
          }
        let weatherApp = document.querySelector(".weather-app");
        weatherApp.addEventListener("click", this.changeInputState);
        weatherApp.addEventListener("click", this.changeSavedWeatherState, true);
    }

    handleCityInput(event){
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        if( localStorage.getItem("citiesArray") ){
          const citiesArray = localStorage.getItem("citiesArray").split(",");
          let listOfCities = [];
          if( inputValue.length >= 3 ){
              citiesArray.map((city) => {
                  if( city.search(inputValue) !== -1 ){
                      listOfCities.push(city);
                  }
              });
          }
          let uniqueCitiesArray = [];
          listOfCities.map((city) => {
              if( !uniqueCitiesArray.includes(city) ){
                  uniqueCitiesArray.push(city);
              }
          });
          this.setState({
              uniqueCitiesArray : uniqueCitiesArray
          });
          if( event.key === "Enter" ){
            this.setState({
              requestedCity : inputValue
            }, () => {
              this.getWeather();
            });
          }
        }
    }

    handleSearchClick(){
      let value = document.querySelector(".inputCity").value;
      this.setState({
        requestedCity : value
      }, () => {
        this.getWeather();
      });
    }

    handleCityClick(event){
        event.preventDefault();
        let offeredCity = event.target.innerHTML.split(": ")[1];
        let inputCity = document.querySelector(".inputCity");
        this.setState({
            requestedCity : offeredCity
        }, () => {
            inputCity.value = offeredCity;
            this.getWeather();
        });
    }

    async getWeather(){
        await fetch(`http://api.weatherstack.com/current?access_key=f21f60494a0b3767f04cf32189c20be8&query=`+this.state.requestedCity+"`")
        .then((response) => response.json())
        .then((data) => {
          if( data.success !== false ){
            let weatherInfoArray = this.state.weatherInfoArray;
            let weatherInfo = {
                date : new Date(),
                requestedCity : data.location.name,
                requestedCountry : data.location.country,
                localTime : data.location.localtime,
                temperature : data.current.temperature,
                pressure : data.current.pressure,
                windSpeed : data.current.wind_speed,
                weatherIcon : data.current.weather_icons[0],
                weatherDescription : data.current.weather_descriptions[0],
            }
            weatherInfoArray.unshift(weatherInfo);
            this.setState({
                uniqueCitiesArray : [],
                weatherInfoArray : weatherInfoArray,
                error : "",
                inputDisplay : "none"
            });
            if( weatherInfo.weatherDescription === "Sunny" ){
              this.setState({
                bgImage : sunnyImg
              });
            } else if( weatherInfo.weatherDescription === "Partly cloudy" ||  weatherInfo. weatherDescription === "Overcast"){
              this.setState({
                bgImage : cloudsImg
              });
            } else if( weatherInfo.weatherDescription === "Light Rain Shower" || weatherInfo.weatherDescription === "Light drizzle" || weatherInfo.weatherDescription === "Patchy rain possible" || weatherInfo.weatherDescription === "Light Drizzle And Rain" || weatherInfo.weatherDescription === "Light Rain" ){
              this.setState({
                bgImage : rainImg
              });
            } else if( weatherInfo.weatherDescription === "Clear"){
              this.setState({
                bgImage : clearImg
              });
            } else if( weatherInfo.weatherDescription === "Light Rain Shower, Rain With Thunderstorm" || weatherInfo.weatherDescription === "Rain With Thunderstorm" || weatherInfo.weatherDescription === "Light Rain With Thunderstorm"){
              this.setState({
                bgImage : thunderImg
              });
            } else if( weatherInfo.weatherDescription === "Mist" ){
              this.setState({
                bgImage : fogImg
              });
            }
          } else{
            this.setState({
                error : data.error.info,
                errorCode : data.error.code
            });
          }
        });
    }

    changeInputState(event){
      let target = event.target;
      let input = document.querySelector(".inputCity");
      if( target === input ){
        this.setState({
          inputDisplay : "block"
        });
      } else{
        this.setState({
          inputDisplay : "none"
        });
      }
    }

    changeSavedWeatherState(event){
      let target = event.target;
      if( target === document.querySelector(".saved-weather__title") ){
        if( this.state.savedWeatherActive === false ){
          this.setState({
              savedWeatherBorder : "2px solid #D0D0D0",
              savedWeatherHeight : "300px",
              savedWeatherOverflow : "auto",
              savedWeatherRotate : "180deg",
              savedWeatherActive : true,
              savedWeatherInfoCoverWidth : "100%"
          }, () => {
             document.querySelector(".saved-weather__title-right").innerHTML = `
              <svg className="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z"/>
              </svg>
             `;
          });
        }   else if( this.state.savedWeatherActive === true ){
            this.setState({
                savedWeatherBorder : "none",
                savedWeatherHeight : "0px",
                savedWeatherOverflow : "hidden",
                savedWeatherRotate : "0",
                savedWeatherActive : false,
                savedWeatherInfoCoverWidth : "0"
            }, () => {
                document.querySelector(".saved-weather__title-right").innerHTML = `
                    <svg className="bi bi-caret-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 001.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 00-.753 1.659z" clip-rule="evenodd"/>
                    </svg>
                `
            });
        }
      } else if( target === document.querySelector(".savedWeatherInfoCover") ){
          this.setState({
            savedWeatherBorder : "none",
            savedWeatherHeight : "0px",
            savedWeatherOverflow : "hidden",
            savedWeatherRotate : "0",
            savedWeatherActive : false,
            savedWeatherInfoCoverWidth : "0"
          }, () => {
              document.querySelector(".saved-weather__title-right").innerHTML = `
                  <svg className="bi bi-caret-down" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 001.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 00-.753 1.659z" clip-rule="evenodd"/>
                  </svg>
              `
          });
      }
    }

    hideError(event){
      let overlay = document.querySelector(".weather-error__overlay");
      let closeHeader = document.querySelector(".weather-error__header-close");
      let closeFooter = document.querySelector(".weather-error__close");
      if( event.target === overlay || event.target === closeHeader || event.target === closeFooter ){
        this.setState({
          error : ""
        });
      }
    }

    render(){
        let weatherInfoItems = "";
        if( this.state.weatherInfoArray.length > 0){
            weatherInfoItems = this.state.weatherInfoArray.map((el) => 
                <RenderWeather
                    className="weather-info__item"
                    key={el.requestedCity + el.date.toLocaleTimeString()}
                    date={el.date.toLocaleDateString()}
                    time={el.date.toLocaleTimeString()}
                    localTime={el.localTime}
                    city={el.requestedCity}
                    country={el.requestedCountry}
                    temperature={el.temperature}
                    pressure={el.pressure}
                    wind={el.windSpeed}
                    icon={el.weatherIcon}
                    description={el.weatherDescription}
                    error={this.state.error}
                    errorCode={this.state.errorCode} /> 
            )
        }
        if( this.state.error === "" ){
          return(
              <div className="weather-app">
                <div className="weather-app__bg" style={{backgroundImage : `url(${this.state.bgImage})`}}></div>
                <div className="weather-app__inner">
                  <div className="weather-app__inner-title">
                    Weather App
                  </div>
                  <div className="weather-app__inner-top">
                    <OfferCity
                        className="offerCity" 
                        handleInput={this.handleCityInput}
                        handleSearchClick={this.handleSearchClick}
                        handleCityClick={this.handleCityClick}
                        uniqueCitiesArray={this.state.uniqueCitiesArray}
                        display={this.state.inputDisplay}
                        isArrayLoaded={this.state.isArrayLoaded} />
                    <SavedWeatherInfo 
                      savedWeatherInfo={JSON.parse(localStorage.getItem("weatherInfo"))}
                      border={this.state.savedWeatherBorder}
                      height={this.state.savedWeatherHeight}
                      overflow={this.state.savedWeatherOverflow}
                      rotate={this.state.savedWeatherRotate} />
                      <div className="savedWeatherInfoCover" style={{
                        width : this.state.savedWeatherInfoCoverWidth
                      }}></div>
                  </div>
                  <div className="weather-info__items">
                    {weatherInfoItems}
                  </div>
                </div>
              </div>
          );
        } else if( this.state.error !== ""){
          return(
              <div className="weather-app">
                <div className="weather-app__bg" style={{backgroundImage : `url(${this.state.bgImage})`}}></div>
                <div className="weather-app__inner">
                  <div className="weather-app__inner-title">
                    Weather App
                  </div>
                  <div className="weather-app__inner-top">
                    <OfferCity
                        className="offerCity" 
                        handleInput={this.handleCityInput}
                        handleSearchClick={this.handleSearchClick}
                        handleCityClick={this.handleCityClick}
                        uniqueCitiesArray={this.state.uniqueCitiesArray}
                        display={this.state.inputDisplay}
                    />
                    <SavedWeatherInfo 
                      savedWeatherInfo={JSON.parse(localStorage.getItem("weatherInfo"))}
                      border={this.state.savedWeatherBorder}
                      height={this.state.savedWeatherHeight}
                      overflow={this.state.savedWeatherOverflow}
                      rotate={this.state.savedWeatherRotate} />
                      <div className="savedWeatherInfoCover" style={{
                        width : this.state.savedWeatherInfoCoverWidth
                      }}></div>
                  </div>
                  <div className="weather-info__items">
                    {weatherInfoItems}
                  </div>
                </div>
                <WeatherErrorInfo 
                  close={this.hideError} 
                  error={this.state.error}
                  errorCode={this.state.errorCode} />
              </div>
          );
        }
      }
}

export default WeatherApp;