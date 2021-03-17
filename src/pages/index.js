import React, { useState } from 'react';
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import publications from "../data/publications.json"

const NUM_PUBS = 711;

const IndexPage = () => {

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const[randomPublication, setRandomPublication] = useState(publications[getRandomNumber(0, NUM_PUBS - 1)]);

  const newRandomPublication = () => {
    setRandomPublication(publications[getRandomNumber(0, NUM_PUBS - 1)]);
  }



  return (
    <Layout>
      <SEO title="Home" />
      <div style={{textAlign: 'center'}}>
        <p style={{fontSize: '1.5rem'}}>Did you know that: 1 / 3 local newspapers has closed in the last 10 years</p>
        <p style={{fontSize: '1.5rem'}}>Clicking on the button below will randomly take you to an independent news site in the US or Canada</p>
        <a href={randomPublication['URL']} target="_blank" rel="noreferrer" onClick={ () => { newRandomPublication() }}><Button style size='lg' textSize='lg'>Inspire me</Button></a>
        <p style={{fontSize: '1.5rem'}}>Or use the filters below to find a local news site near you:</p>
      </div>

    </Layout>
  )

}

export default IndexPage
