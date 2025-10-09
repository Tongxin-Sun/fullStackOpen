import CountryList from "./CountryList"
import SingleCountry from "./SingleCountry"

const DisplayCountries = ({ filteredCountries }) => {
    const len = filteredCountries.length

    if (len === 0) {
        return null
    } else if (len > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (len === 1) {
        return <SingleCountry country={filteredCountries[0]} />
    } else {
        return <CountryList filteredCountries={filteredCountries} />
    }
}

export default DisplayCountries