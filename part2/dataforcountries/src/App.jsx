import { useState } from 'react'

const countries = [{ "name": { "common": "Finland", "official": "Republic of Finland", "nativeName": { "fin": { "official": "Suomen tasavalta", "common": "Suomi" }, "swe": { "official": "Republiken Finland", "common": "Finland" } } }, "tld": [".fi"], "cca2": "FI", "ccn3": "246", "cca3": "FIN", "cioc": "FIN", "independent": true, "status": "officially-assigned", "unMember": true, "currencies": { "EUR": { "name": "Euro", "symbol": "€" } }, "idd": { "root": "+3", "suffixes": ["58"] }, "capital": ["Helsinki"], "altSpellings": ["FI", "Suomi", "Republic of Finland", "Suomen tasavalta", "Republiken Finland"], "region": "Europe", "subregion": "Northern Europe", "languages": { "fin": "Finnish", "swe": "Swedish" }, "translations": { "ara": { "official": "جمهورية فنلندا", "common": "فنلندا" }, "bre": { "official": "Republik Finland", "common": "Finland" }, "ces": { "official": "Finská republika", "common": "Finsko" }, "cym": { "official": "Republic of Finland", "common": "Finland" }, "deu": { "official": "Republik Finnland", "common": "Finnland" }, "est": { "official": "Soome Vabariik", "common": "Soome" }, "fin": { "official": "Suomen tasavalta", "common": "Suomi" }, "fra": { "official": "République de Finlande", "common": "Finlande" }, "hrv": { "official": "Republika Finska", "common": "Finska" }, "hun": { "official": "Finn Köztársaság", "common": "Finnország" }, "ita": { "official": "Repubblica di Finlandia", "common": "Finlandia" }, "jpn": { "official": "フィンランド共和国", "common": "フィンランド" }, "kor": { "official": "핀란드 공화국", "common": "핀란드" }, "nld": { "official": "Republiek Finland", "common": "Finland" }, "per": { "official": "جمهوری فنلاند", "common": "فنلاند" }, "pol": { "official": "Republika Finlandii", "common": "Finlandia" }, "por": { "official": "República da Finlândia", "common": "Finlândia" }, "rus": { "official": "Финляндская Республика", "common": "Финляндия" }, "slk": { "official": "Fínska republika", "common": "Fínsko" }, "spa": { "official": "República de Finlandia", "common": "Finlandia" }, "srp": { "official": "Република Финска", "common": "Финска" }, "swe": { "official": "Republiken Finland", "common": "Finland" }, "tur": { "official": "Finlandiya Cumhuriyeti", "common": "Finlandiya" }, "urd": { "official": "جمہوریہ فن لینڈ", "common": "فن لینڈ" }, "zho": { "official": "芬兰共和国", "common": "芬兰" } }, "latlng": [64, 26], "landlocked": false, "borders": ["NOR", "SWE", "RUS"], "area": 338424, "demonyms": { "eng": { "f": "Finnish", "m": "Finnish" }, "fra": { "f": "Finlandaise", "m": "Finlandais" } }, "flag": "🇫🇮", "maps": { "googleMaps": "https://goo.gl/maps/HjgWDCNKRAYHrkMn8", "openStreetMaps": "openstreetmap.org/relation/54224" }, "population": 5530719, "gini": { "2018": 27.3 }, "fifa": "FIN", "car": { "signs": ["FIN"], "side": "right" }, "timezones": ["UTC+02:00"], "continents": ["Europe"], "flags": { "png": "https://flagcdn.com/w320/fi.png", "svg": "https://flagcdn.com/fi.svg", "alt": "The flag of Finland has a white field with a large blue cross that extend to the edges of the field. The vertical part of this cross is offset towards the hoist side." }, "coatOfArms": { "png": "https://mainfacts.com/media/images/coats_of_arms/fi.png", "svg": "https://mainfacts.com/media/images/coats_of_arms/fi.svg" }, "startOfWeek": "monday", "capitalInfo": { "latlng": [60.17, 24.93] }, "postalCode": { "format": "#####", "regex": "^(?:FI)*(\\d{5})$" } }]

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
  }
  const Content = ({country}) => {
    let languages = Object.values(country.languages)
    return (
      <>
      <div>{country.name.common}</div>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <ul>
        languages:
        {languages.map((language)=><li>{language}</li>)}
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
        <ul>
          <Country filteredCountries={countries.filter(country => regexNameFilter.test(country.name.common) & countryName != '')}/>
        </ul>
      </div>
    </>
  )
}

export default App
