/*
  const countryOptions = publications.map(publication => publication['Country'])
  .filter((value, index, self) => self.indexOf(value) === index);
  const stateOptions = publications.map(publication => publication['State'])
  .filter((value, index, self) => self.indexOf(value) === index);
  const cityOptions = publications.map(publication => publication['City'])
  .filter((value, index, self) => self.indexOf(value) === index);
*/

/*
  let structuredPublications = {};
  publications.forEach( (publication) => {
    if(!structuredPublications[publication['Country']]) {
      structuredPublications[publication['Country']] = {};
      structuredPublications[publication['Country']][publication['State']] = {};
      structuredPublications[publication['Country']][publication['State']][publication['City']] = {};
      structuredPublications[publication['Country']][publication['State']][publication['City']][publication['Publication Name']] = publication;
    }
    else if(!structuredPublications[publication['Country']][publication['State']]) {
      structuredPublications[publication['Country']][publication['State']] = {};
      structuredPublications[publication['Country']][publication['State']][publication['City']] = {};
      structuredPublications[publication['Country']][publication['State']][publication['City']][publication['Publication Name']] = publication;
    }
    else if(!structuredPublications[publication['Country']][publication['State']][publication['City']]) {
      structuredPublications[publication['Country']][publication['State']][publication['City']] = {};
      structuredPublications[publication['Country']][publication['State']][publication['City']][publication['Publication Name']] = publication;
    }
    else {
      structuredPublications[publication['Country']][publication['State']][publication['City']][publication['Publication Name']] = publication;
    }
  });
  console.log(structuredPublications);
  */
