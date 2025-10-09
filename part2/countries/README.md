# What this document is about

I wrote this document while developing the countries project. My goal is to clarify my thought process and keep a record of the decisions I made along the way. It explains how the code flows, as well as how and why I approached different implementation details.

***

The first time the page is rendered, `useEffect` will be called to fetch all the countries info from the base URL: https://studies.cs.helsinki.fi/restcountries/api/all. This `useEffect` will only be called once because the second parameter doesn't specify any variable.

```JavaScript
useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => setCountries(initialCountries))
  }, [])
```

After this, the variable `countries` will be set to the newly fetched data from this URL, which is an array of country objects. Because `countries` as a state variable is set to a new value (previously it was an empty array `[]` ), the whole component `App` will be rerendered. 

At this point, our app gets the data and it is ready to go.

When the user types anything in the input box, the `onChange` event handler will be called. 

```JavaScript
onChange={e => setName(e.target.value)}
```

This event handler will take whatever is typed by the user (`e.target.value`) and set the value of the state variable `name` to it, using the `setName` function. 

Again, because the state variable `name` is set to a new value, the `App` component will be re-rendered. This time, the major job for handling the logic for displaying countries that matche the query input is handled by the `<DisplayCountries>` component.

```JavaScript
<CountryList filteredCountries={filteredCountries} />
```
This component takes `filteredCountries` as a parameter. `filteredCountries` is a constant defined as:

```JavaScript
const filteredCountries = name === '' ?
    [] :
    countries.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase()))
```
It is initially set to an empty array because the state variable `name` is initialized as an empty string. However, after the user types any character(s) in the input, its value will be set to that character(s), the `App` component will be re-rendered, and the `filterdCountries` will no longer be an empty array.

Instead, it is an array of country objects whose name contain the character(s) typed by the user. The `DisplayCountries` component renders different components based on the length of `filteredCountries`. If it is empty, we display nothing. If it only contains one country object, we display the `SingleCountry` component. When the number of countries is between 1 and 10, we display the countries as a country list. Lastly, if there are more than 10 countries, we display a message that says that there are too many matches.

If the number of countries filtered is between 1 and 10, the `CountryList` component is rendered. Inside the `CountryList` component, jobs are done by conditional rendering based on the value of the state variable `country`. For each country displayed, there will be a show button. When clicked, the `onClick` event will be triggered.

```javascript
<button onClick={() => setCountry(country)}>show</button>
```

This event will set the state variable `country` to the specific country that the user clicked, and as a result, the `CountryList` component will be re-rendered. This time because the `country` is not null, the `SingleCountry` component will be rendered. 

## Weather Component
The only thing worth mentioning inside the `SingleCountry` component is the `Weather` component.

```javascript
import countryService from "../services/countries"
import { useEffect, useState } from "react"

const Weather = ({ country }) => {
    const [currentWeather, setCurrentWeather] = useState('')
    const [iconSrc, setIconSrc] = useState('')

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
```

The first time when the `Weather` component is rendered, it calls two functions from the `countryService`. 

The `getWeather` function takes the latitude and the longitude of the country displayed, calls the Open Weather API, and returns a weather object. Upon the weather object is returned, we set the state variable `currentWeather`. The whole `Weather` component thus gets re-rendered, with the weather details of that country. 

Then we call the second function `getWeatherIcon`, that takes the icon code as a parameter, calls the API for an icon image, and returns its URL. Upon we receive this URL, we set the state variable `iconSrc` to it and render the `<img>` element.

In other words, the `Weather` component will be rendered three times. If we open the console, we would see the message "The Weather component is rendered!" printed three times. 

## How to iteratively render each element in an object?
Inside the `SingleCountry` component, we need to render a list of languages spoken in that country. The list of languages is stored in the `country` object like this:

```JavaScript
languages : {fra: 'French', gsw: 'Swiss German', ita: 'Italian', roh: 'Romansh'}
```

So `country.languages` will return an object. We know that we can iteratively render each element in an array using the `map` method.

```JavaScript
{country.languages.map(language => <li>{language}</li>)}
```
 However, this doesn't work for objects. To iteratively render each element in an object, we can use `Object.entrys`.

 ```JavaScript
 {Object.entries(country.languages).map(([key, language]) => (<li key={key}>{language}</li>))}
 ```