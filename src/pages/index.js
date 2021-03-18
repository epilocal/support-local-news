import React, { useState, useEffect } from 'react';
import { StaticImage } from "gatsby-plugin-image";
import Select from 'react-select';

import Layout from "../components/layout";
import SEO from "../components/seo";
import Button from "../components/button";
//import Dropdown from "../components/dropdown";

import publications from "../data/publications.json";
import options from "../data/options.json";


const IndexPage = () => {

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const[randomPublication, setRandomPublication] = useState(publications[getRandomNumber(0, publications.length - 1)]);
  const[filteredPublications, setFilteredPublications] = useState([]);

  const[countryValues, setCountryValues] = useState({ selectedOption: []});
  const[stateValues, setStateValues] = useState({ selectedOption: []});
  const[cityValues, setCityValues] = useState({ selectedOption: []});
  const[stateOptions, setStateOptions] = useState([]);
  const[cityOptions, setCityOptions] = useState([]);


  const newRandomPublication = (pubs) => {
    let numPubs = pubs.length;
    setRandomPublication(pubs[getRandomNumber(0, numPubs - 1)]);
  }

  const countryOptions = Object.keys(options).map( (country) => ({value: country, label: country}));


  const toggleDropdown = (values, name) => {
    switch (name) {
      case 'country':
        setCountryValues({selectedOption: values});
        if (values.length < 1) {
          setStateValues({selectedOption: []});
          setCityValues({selectedOption: []});
        }
        break;
      case 'state':
        setStateValues({selectedOption: values});
        if (values.length < 1) {
          setCityValues({selectedOption: []});
        }
        break;
      case 'city':
        setCityValues({selectedOption: values});

        break;
      default:
        break
    }

  }

  const filterPublications = () => {
    let filteredPubs = publications;
    if (countryValues.selectedOption.length > 0) {
      let countryLabels = countryValues.selectedOption.map( (country) => country.label );
      filteredPubs = filteredPubs.filter( (publication) => {
        return countryLabels.indexOf(publication['Country']) > -1;
      });
    }
    if (stateValues.selectedOption.length > 0) {
      let stateLabels = stateValues.selectedOption.map( (state) => state.label );
      filteredPubs = filteredPubs.filter( (publication) => {
        return stateLabels.indexOf(publication['State']) > -1;
      });
    }
    if (cityValues.selectedOption.length > 0) {
      let cityLabels = cityValues.selectedOption.map( (city) => city.label );
      filteredPubs = filteredPubs.filter( (publication) => {
        return cityLabels.indexOf(publication['City']) > -1;
      });
    }
    console.log(filteredPubs);
    setFilteredPublications(filteredPubs);
    newRandomPublication(filteredPubs);
  }

  useEffect(() => {
    if (countryValues.selectedOption.length > 0) {
      let newStateOptions = countryValues.selectedOption.map( (countryValue) => {
        return Object.keys(options[countryValue.label]).map( (state) => ({value: state, label: state}))
      });
      setStateOptions(newStateOptions[0]);
    }
  }, [countryValues]);

  useEffect(() => {
    if (countryValues.selectedOption.length > 0 && stateValues.selectedOption.length > 0) {
      let newCityOptions = countryValues.selectedOption.map( (countryValue) => {
        return stateValues.selectedOption.map( (stateValue) => {
          return Object.keys(options[countryValue.label][stateValue.label]).map( (city) => ({value: city, label: city}))
      });
    });
      setCityOptions(newCityOptions[0][0]);
    }
  }, [countryValues, stateValues]);

  useEffect(() => {
    filterPublications()
  }, [countryValues, stateValues, cityValues]);




  return (
    <Layout>
      <SEO title="Home" />
      <div style={{textAlign: 'center'}}>
        <p style={{fontSize: '1.5rem'}}>Did you know that: 1 / 3 local newspapers has closed in the last 10 years</p>
        <p style={{fontSize: '1.5rem'}}>Clicking on the button below will randomly take you to an independent news site in the US or Canada</p>
        <a href={randomPublication['URL']} target="_blank" rel="noreferrer" onClick={ () => { newRandomPublication(publications) }}><Button style size='lg' textSize='lg'>Inspire me</Button></a>
        <p style={{fontSize: '1.5rem'}}>Or use the filters below to find a local news site near you:</p>
        <Select
          className="reactSelect"
          name="country-filter"
          placeholder="Filters"
          value={countryValues.selectedOption}
          options={countryOptions}
          onChange={(values) => toggleDropdown(values, 'country')}
          isMulti
        />
        <Select
          className="reactSelect"
          name="state-filter"
          placeholder="Filters"
          value={stateValues.selectedOption}
          options={stateOptions}
          onChange={(values) => toggleDropdown(values, 'state')}
          isMulti
          isDisabled={stateOptions.length < 1}
        />
        <Select
          className="reactSelect"
          name="city-filter"
          placeholder="Filters"
          value={cityValues.selectedOption}
          options={cityOptions}
          onChange={(values) => toggleDropdown(values, 'city')}
          isMulti
          isDisabled={cityOptions.length < 1}
        />
        <a href={randomPublication['URL']} target="_blank" rel="noreferrer" ><Button style size='lg' textSize='lg'>Inspire me</Button></a>
        <Button style size='lg' textSize='lg' onClick={ () => { filterPublications() }}>See in your area</Button>
      </div>

    </Layout>
  )

}

export default IndexPage
