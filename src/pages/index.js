import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import Layout from "../components/layout";
import SEO from "../components/seo";
import Button from "../components/button";
import Table from "../components/table";
import Card from "../components/card";

import publications from "../data/publications.json";
import options from "../data/options.json";


const IndexPage = () => {

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const[randomPublication, setRandomPublication] = useState(publications[getRandomNumber(0, publications.length - 1)]);
  const[randomFilteredPublication, setRandomFilteredPublication] = useState(publications[getRandomNumber(0, publications.length - 1)]);

  const[filteredPublications, setFilteredPublications] = useState([]);
  const[showTable, setShowTable] = useState(false);

  const[countryValues, setCountryValues] = useState({ selectedOption: []});
  const[stateValues, setStateValues] = useState({ selectedOption: []});
  const[cityValues, setCityValues] = useState({ selectedOption: []});
  const[stateOptions, setStateOptions] = useState([]);
  const[cityOptions, setCityOptions] = useState([]);


  const toggleShowTable = () => {
    setShowTable(!showTable);
  }

  const newRandomPublication = (pubs) => {
    let numPubs = pubs.length;
    setRandomPublication(pubs[getRandomNumber(0, numPubs - 1)]);
  }

  const newRandomFilteredPublication = (pubs) => {
    let numPubs = pubs.length;
    setRandomFilteredPublication(pubs[getRandomNumber(0, numPubs - 1)]);
  }

  const countryOptions = Object.keys(options).map( (country) => ({value: country, label: country}));


  const toggleDropdown = (values, name) => {
    switch (name) {
      case 'country':
        setCountryValues({selectedOption: values});
        if (values.length < 1) {
          setStateValues({selectedOption: []});
          setStateOptions([]);
          setCityValues({selectedOption: []});
          setCityOptions([]);
        }
        break;
      case 'state':
        setStateValues({selectedOption: values});
        if (values.length < 1) {
          setCityValues({selectedOption: []});
          setCityOptions([]);
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
    setFilteredPublications(filteredPubs);
    newRandomFilteredPublication(filteredPubs);
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
        <Card>
          <h2>Did you know:</h2>
          <p style={{fontSize: '1.5rem'}}>1 out of 5 local newspapers in the US has closed or merged since 2004</p>
        </Card>
        <section style={{paddingTop: '4rem'}}>
        <h2 style={{fontSize: '2.5rem'}}>Show some love to an independent, local news site</h2>
        <p style={{fontSize: '1.5rem'}}>Clicking on the button below will randomly take you to a local news site in the US or Canada</p>
        <a href={randomPublication['URL']} rel="external" onClick={ () => newRandomPublication(publications) }><Button style size='lg' textSize='lg'>Inspire me</Button></a>
        <p style={{fontSize: '1.5rem', paddingTop: '3rem'}}>Or use the filters below to find a local news site near you:</p>
        <div style={{paddingBottom: '1rem', margin: 'auto'}}>
        <Select
          className="reactSelect"
          name="country-filter"
          placeholder="Country"
          value={countryValues.selectedOption}
          options={countryOptions}
          onChange={(values) => toggleDropdown(values, 'country')}
          isMulti
        />
        <Select
          className="reactSelect"
          name="state-filter"
          placeholder="State / Province"
          value={stateValues.selectedOption}
          options={stateOptions}
          onChange={(values) => toggleDropdown(values, 'state')}
          isMulti
          isDisabled={stateOptions.length < 1}
        />
        <Select
          className="reactSelect"
          name="city-filter"
          placeholder="City / Town"
          value={cityValues.selectedOption}
          options={cityOptions}
          onChange={(values) => toggleDropdown(values, 'city')}
          isMulti
          isDisabled={cityOptions.length < 1}
        />
        </div>
        <a href={randomFilteredPublication['URL']} rel="external" onClick={ () => newRandomFilteredPublication(filteredPublications) } ><Button customMargin='.75rem' style size='md' textSize='lg'>Go to random in my area</Button></a>
        <Button customMargin='.75rem' style size='md' textSize='lg' onClick={ () => { toggleShowTable() }}>{!showTable ? 'See all in my area' : 'Hide all in my area'}</Button>
        {showTable && <Table tableData={filteredPublications} />}
        <p style={{fontSize: '1.25rem', paddingTop: '2rem'}}>Made by <a target="_blank" rel="noreferrer" href='https://twitter.com/dickens_greg'>Greg</a> as part of the <a href='https://www.epilocal.com/'>Epilocal</a> project</p>
        </section>
      </div>

    </Layout>
  )

}

export default IndexPage
