
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import WeatherItems from './WeatherItems';

const WeatherList = ({ forecast, onSearch }) => {

	// ESTADO
	// variable/estado 'inputValue' con el valor ''
	// Funcion asociada del Estado: setInputValue()
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		
		if (inputValue.trim()) {
			onSearch(inputValue.trim());
			setInputValue('');
		}
	};

	const days = forecast.reduce((acc, item) => {
		const date = item.dt_txt.split(' ')[0];
		if (!acc[date]) acc[date] = [];
		acc[date].push(item);
		return acc;
	}, {});

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					name="city"
					placeholder="Introduce una ciudad"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<button type="submit">Buscar</button>
			</form>
			<div className="weather-list">
				{
				Object.entries(days).map(([date, weatherData]) => (
					<div key={uuidv4()} className="weather-day">
						<h2>{date}</h2>
						<WeatherItems weatherData={weatherData} />
					</div>
				))
				}
			</div>
		</div>
	);
};

export default WeatherList;

