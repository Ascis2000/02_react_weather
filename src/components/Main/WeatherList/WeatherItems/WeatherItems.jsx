
import React from 'react';

const WeatherItems = ({ weatherData }) => {
	return (
		<div className="weather-cards">
			{
			// usamos el método 'map' para recorrer el array 'weatherData'
			// Por cada elemento del array, generamos una tarjeta 'weather-card'.
			// Para los iconos, ver https://openweathermap.org/weather-conditions#How-to-get-icon-URL
			weatherData.map((item) => (
				<div key={item.dt} className="weather-card">
					<h3>{item.dt_txt}</h3>
					<div>Temperatura: {item.main.temp} °C</div>
					<div>Clima: {item.weather[0].description}</div>

					<img
						src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
						title={item.weather[0].description}
					/>
				</div>
			))
			}
		</div>
	);
};

export default WeatherItems;

