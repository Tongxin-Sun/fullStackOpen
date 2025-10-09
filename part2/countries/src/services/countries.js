import axios from "axios"

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const getWeather = (lat, lng) => {
    return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`)
        .then(response => response.data)
}

const getWeatherIcon = (iconCode) => {
    return axios
        .get(`https://openweathermap.org/img/wn/${iconCode}@2x.png`,
            {
                responseType: "blob",
            }
        )
        .then(response => URL.createObjectURL(response.data))
}

export default { getAll, getWeather, getWeatherIcon }