import React from 'react';
import AsyncSelect from 'react-select/async';

import './styles/dropdown.css';

export const Dropdown = ({labelField, toggleDropdown, disabled, dropdownName, values, countryOptions, countryValues, stateValues}) => {

  const loadOptions = (inputValue, callback) => {
    switch (dropdownName) {
      case 'country':
        callback(countryOptions);
        break;
      case 'state':
        console.log(countryValues)
        break;
      case 'city':

        break;
      default:
        break
    }


  };

  return (
    <AsyncSelect
      className="reactSelect"
      name="filters"
      placeholder="Filters"
      value={values.selectedOption}
      onChange={(values) => toggleDropdown(values, dropdownName)}
      isMulti
      isDisabled={disabled}
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
    />




  )
};


export default Dropdown;
