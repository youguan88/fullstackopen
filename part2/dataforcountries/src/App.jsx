import { useState } from 'react'
import './app.css'
import languageAPI from './services/language'

let countries = []
languageAPI.getAll().then(response => countries = response.data)

function App() {
  const [countryName, setCountryName] = useState('')

  const handleCountryName = (event) =>{
    setCountryName(event.target.value)
  }
  const Country = ({filteredCountries}) => {
    if (filteredCountries.length == 1)
    {
      return (
        filteredCountries.map(country => <Content key={country.name.common} country={country}/>)
      )
    }
    else if (filteredCountries.length > 10)
    {
      return <div>Too many matches, specify another filter</div>
    }
    else
    {
      return (
        filteredCountries.map(country => <div>{country.name.common}</div>)
      )
    }
  }
  const Content = ({country}) => {
    let languages = Object.values(country.languages)
    return (
      <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <div className='language'><b>languages:</b></div>
      <ul>
        {languages.map((language)=><li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} />
      </>
    )
  }
  const regexNameFilter = RegExp(countryName, 'i')

  return (
    <>
      find countries <input text={countryName} onChange={handleCountryName} />
      <div>
        <div>
          <Country filteredCountries={countries.filter(country => regexNameFilter.test(country.name.common) & countryName != '')}/>
        </div>
      </div>
    </>
  )
}

export default App
