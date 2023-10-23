import { useState, useEffect } from 'react'
import './app.css'
import languageAPI from './services/language'
import openweathermapAPI from './services/openweathermap'

const Country = ({ filteredCountries, handleShowButton }) => {
  if (filteredCountries.length == 1) {
    return (
      filteredCountries.map(country => <Content key={country.name.common} country={country} />)
    )
  }
  else if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else {
    return (
      filteredCountries.map(country => {
        const countryName = country.name.common
        return (
          <div key={countryName}>
            {countryName}
            <ShowButton handleShowButton={() => handleShowButton(countryName)} />
          </div>
        )
      })
    )
  }
}

const Content = ({ country }) => {
  let languages = Object.values(country.languages)
  const [openweathermapData, setopenweathermapData] = useState(null)
  const api_key = import.meta.env.VITE_openweathermapkey
  useEffect(() => {
    openweathermapAPI.getAll(country, api_key).then(response => {
      setopenweathermapData(response.data)
    })
  }, [])
  if (!openweathermapData) {
    return null
  }
  else {
    const weatherIcon = `https://openweathermap.org/img/wn/${openweathermapData.weather[0].icon}@2x.png`
    return (
      <>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <div className='language'><b>languages:</b></div>
        <ul>
          {languages.map((language) => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} />
        <h1>Weather in {country.capital}</h1>
        <div>temperature {openweathermapData.main.temp} Celsius</div>
        <img src={weatherIcon} />
        <div>wind {openweathermapData.wind.speed} m/s</div>
      </>
    )
  }
}

const ShowButton = ({ handleShowButton }) => {
  return (<button className="showButton" onClick={handleShowButton}>show</button>)
}

function App() {
  const [countries, setCountries] = useState([])
  const [countryName, setCountryName] = useState('')
  useEffect(() => {
    languageAPI.getAll().then(response => setCountries(response.data))
  }, [])
  const handleCountryName = (event) => {
    setCountryName(event.target.value)
  }
  const handleShowButton = (countryName) => {
    setCountryName(countryName)
  }
  const regexNameFilter = RegExp(countryName, 'i')

  return (
    <>
      find countries <input value={countryName} onChange={handleCountryName} />
      <div>
        <Country
          filteredCountries={countries.filter(country => regexNameFilter.test(country.name.common) & countryName != '')}
          handleShowButton={handleShowButton} />
      </div>
    </>
  )
}

export default App
