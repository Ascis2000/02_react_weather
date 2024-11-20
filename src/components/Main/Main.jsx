
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Main.css';
import WeatherList from './WeatherList';

const Main = () => {

    // API_KEY personal de la pagina
	const API_KEY = import.meta.env.VITE_API_KEY;

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
	const [error, setError] = useState('');

    const fetchWeather = async (url) => {
        try {
            setError('');

			// obtenemos los datos del fetch
            const res = await axios.get(url);

			// asignamos en la variable/estado 'forecast' los datos devueltos por el fetch
			// forecast = res.data.list
            setForecast(res.data.list);

			// si existe res.data.city, significa que hemos utilizado la geolocalizacion
            if (res.data.city) {
                setCity(res.data.city.name);
            }
        } catch {
            setError('No se pudo obtener la información del clima');
            setForecast([]);
        }
    };

    useEffect(() => {
        const fetchWeatherGeolocation = async () => {

			// busqueda por defecto con la ciudad 'Madrid'
            const defaultUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
            
			if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
                        await fetchWeather(url);
                    },
					// si ocurre algún error usamos la url por defecto
                    async () => {
                        await fetchWeather(defaultUrl);
                    }
                );
			// si el navegador no soporta la geolocalización, 
			// usamos la url por defecto
            } else {
                await fetchWeather(defaultUrl);
            }
        };
        fetchWeatherGeolocation();
    }, []);

	// funcion para manejar la busqueda de ciudades desde el formulario
	const handleSearch = async (searchCity) => {
		// actualizamos el estado 'city' con el valor del campo de formulario
		// sería como escribir en JS: city=searchCity
		setCity(searchCity);

		const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=metric&appid=${API_KEY}`;
        fetchWeather(url);
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

