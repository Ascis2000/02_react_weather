
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

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					name="city"
					placeholder="Introduce una ciudad"
					value={inputValue}
					onChange={
						(event) => {
							setInputValue(event.target.value)
						}
					}
				/>
				<button type="submit">Buscar</button>
			</form>

			<div className="weather-list">
			{
				forecast.map(item => (
					<div className="weather-cards" key={uuidv4()}>
						<WeatherItems wtData={item} />
					</div>
				))
			}
			</div>
		</div>
	);
};

export default WeatherList;

