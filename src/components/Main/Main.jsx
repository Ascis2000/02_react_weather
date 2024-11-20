
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Main.css';
import WeatherList from './WeatherList';

const Main = () => {

	// API_KEY personal de la pagina
	const API_KEY = '1a906c458de265228647c9aec3012555';

	// ESTADO
	// variable 'city' con el valor 'Madrid'
	// Funcion asociada del Estado: setCity()
	const [city, setCity] = useState('Madrid');

	// ESTADO
	// variable 'forecast' con el valor '[]'
	// Funcion asociada del Estado: setForecast()
	const [forecast, setForecast] = useState([]);

	// ESTADO
	// variable 'error' con el valor 'null'
	// Funcion asociada del Estado: setError()
	const [error, setError] = useState(null);

	useEffect(() => {

		// declaracion de la Funcion fetchWeather()
		const fetchWeather = async () => {
			try {
				// asignamos la variable/estado 'error' a null
				// sería lo mismo que escribir en JS, error = ''
				setError(''); 

				// funcion fetch utilizando axios
				const res = await axios.get(
					// https://api.openweathermap.org/data/2.5/forecast?q=Madrid&units=metric&appid=1a906c458de265228647c9aec3012555
					`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
				);

				// asignamos en la variable/estado 'forecast' los datos devueltos por el fetch
				setForecast(res.data.list);

			} catch (err) {

				// actualizamos la variable/estado 'error' con un mensaje de informacion.
				setError('No se pudo obtener la información del clima. Verifica la ciudad.');
				
				// inicializamos la variable/estado 'forecast' a una lista vacía porque no obtuvimos datos válidos
				setForecast([]);
			}
		};
		fetchWeather(); // llamamos a la funcion fetchWeather()

	}, [city]); // useEffect se ejecutará cada vez que cambie el estado de 'city'

	// funcion para manejar la busqueda de ciudades desde el formulario
	const handleSearch = (searchCity) => {
		// actualizamos el estado 'city' con el valor del campo de formulario
		// sería como escribir en JS: city=searchCity
		setCity(searchCity);
	};

	return (
		<section>
			<div className="titSearch">Búsqueda actual: {city}</div>
			{
			error 
			? 
				<p className="error">{error}</p>
			: 
				// llamamos al componente WeatherList que tiene dos props:
				// forecast={forecast}, que serán los datos obtenidos del fecth
				// onSearch={handleSearch}, que será la función para buscar una nueva ciudad
				<WeatherList forecast={forecast} onSearch={handleSearch} />
			}
		</section>
	);
};

export default Main;

