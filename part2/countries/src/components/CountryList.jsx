import { useState } from "react"
import SingleCountry from "./SingleCountry"

const CountryList = ({ filteredCountries }) => {
    const [country, setCountry] = useState(null)
    return (
        country === null ?

            <>
                {filteredCountries.map(country =>
                    <div key={country.name.common}>
                        {country.name.common} <button onClick={() => setCountry(country)}>show</button>
                    </div>)}
            </> :

            <SingleCountry country={country} />

    )
}

export default CountryList