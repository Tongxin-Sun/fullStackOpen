import { useEffect, useState } from 'react'
import countryService from './services/countries'
import DisplayCountries from './components/DisplayCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => setCountries(initialCountries))
  }, [])

  const filteredCountries = name === '' ?
    [] :
    countries.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase()))

  return (
    <>
      <div>
        <label htmlFor="country">find countries</label> <input name="country" type="text" onChange={e => setName(e.target.value)} />
      </div>

      <DisplayCountries filteredCountries={filteredCountries} />
    </>
  )
}

export default App
