import React from 'react';
import './OfferCityStyles.css';

class OfferCity extends React.Component{
    render(){
        return(
            <div className="offerCity">
                <div className="input__wrapper">
                    <input type="text"
                    className="inputCity" 
                    placeholder="Input city name"
                    onClick={this.handleInputClick}
                    onKeyDown={this.props.handleInput} />
                    <button className="searchCity" onClick={this.props.handleSearchClick}>
                        <svg className="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                        </svg>
                    </button>
                </div>
                { this.props.isArrayLoaded === true ? 
                    <ul className="offeredCityWrapper" style={{display : this.props.display}}>
                    {this.props.uniqueCitiesArray.map(city => (
                        <li key={city} className="offeredCity">
                            <button className="offeredCityBtn" 
                              onClick={this.props.handleCityClick}>
                                City: {city}
                            </button>
                        </li>
                    ))}
                </ul> : <div className="lds-facebook"><div></div><div></div><div></div></div>}
            </div>
        );
    }
}

export default OfferCity;