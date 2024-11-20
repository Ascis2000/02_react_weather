
import React from 'react';

const WeatherItems = ({ wtData }) => {

	// const main = wtData.main;
	// const dt_txt = wtData.dt_txt;
	// const weather = wtData.weather;
    const { dt_txt, main, weather } = wtData;

    return (
        <div className="weather-card">
            <p><strong>Fecha y hora:</strong> {dt_txt}</p>
            <p><strong>Temperatura:</strong> {main.temp} °C</p>
            <p><strong>Descripción:</strong> {weather[0].description}</p>
			<img src={`http://openweathermap.org/img/wn/${wtData.weather[0].icon}@2x.png`}
				title={wtData.weather[0].description}
			/>
        </div>
    );
};

export default WeatherItems;

