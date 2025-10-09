import Weather from "./Weather"

const SingleCountry = ({ country }) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <div>Capital {country.capital}</div>
            <div>Area {country.area}</div>
            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(([key, language]) => (<li key={key}>{language}</li>))}
            </ul>
            <img src={country.flags.svg} />
            <Weather country={country} />
        </>
    )
}

export default SingleCountry