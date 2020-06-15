import React from 'react';
import './ErrorModalStyles.css';

class WeatherErrorInfo extends React.Component{
    render(){
        return(
            <div className="weather-error__overlay" onClick={this.props.close}>
                <div className="weather-error__wrapper">
                    <div className="weather-error__inner">
                        <div className="weather-error__header">
                            <p className="weather-error__title">Oops...</p>
                            <button className="weather-error__header-close" onClick={this.props.close}>
                                <div className="close-line close-line1"></div>
                                <div className="close-line close-line2"></div>
                            </button>
                        </div>
                        <div className="weather-error__main">
                            <div className="weather-error__info-wrapper">
                                <div className="weather-error__info">
                                    {this.props.error}
                                </div>
                                <div className="weather-error__code">
                                    Code: <span>{this.props.errorCode}</span>
                                </div>
                            </div>
                        </div>
                        <div className="weather-error__footer">
                            <button className="weather-error__close" onClick={this.props.close}>Okay</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherErrorInfo;