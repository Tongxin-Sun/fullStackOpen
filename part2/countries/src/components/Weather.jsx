import countryService from "../services/countries"
import { useEffect, useState } from "react"

const Weather = ({ country }) => {
    const [currentWeather, setCurrentWeather] = useState('')
    const [iconSrc, setIconSrc] = useState('')
    console.log("The Weather component is rendered!")

    useEffect(() => {
        countryService
            .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
            .then(weather => {
                setCurrentWeather(weather)
                countryService
                    .getWeatherIcon(weather.weather[0].icon)
                    .then(url => setIconSrc(url))
            })
    }, [])
    if (!currentWeather) return null

    return (
        <>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {currentWeather.main.temp} Celsius</p>
            {iconSrc && <img src={iconSrc} alt="weather icon" />}
            <p>Wind {currentWeather.wind.speed} m/s</p>
        </>
    )

}

export default Weather