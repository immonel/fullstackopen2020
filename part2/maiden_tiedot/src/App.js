import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
         .then(response => setData(response.data))
  }, [])

  const filterChange = (event) => setFilter(event.target.value)
  
  return (
    <div>
      <form>
        <div>
          find countries <input value={filter} onChange={filterChange} />
        </div>
      </form>
      <Display data={data} filter={filter} onBtn={filterChange}/>
    </div>
  )
}

const Display = ({ data, filter, onBtn }) => {
  const countries = data.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />
  } else {
    return <CountryList data={countries} onBtn={onBtn}/>
  }
}

const CountryInfo = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <p>
      capital {country.capital}<br />
      population {country.population}
    </p>
    <h2>languages</h2>
    <ul>
      {country.languages.map(c => <li key={c.name}>{c.name}</li>)}
    </ul>
    <img src={country.flag} height="256px" alt="flag"/>
  </div>
)

const CountryList = ({ data, onBtn }) => {
  return (
    <>
      {data.map(c => (
        <div key={c.name}>{c.name}
        <button onClick={onBtn} value={c.name}>show</button>
        </div>
      ))}
    </>
  )
}

export default App
