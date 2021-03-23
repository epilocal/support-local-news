import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./styles/layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div style={{backgroundColor: 'var(--color-light)', fontFamily: 'var(--font-family)'}}>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
            textAlign: 'center'
          }}
        >
          <p>Sources: <a href='https://www.projectnewsoasis.com/'>Project Oasis</a>, <a href='https://www.usnewsdeserts.com/reports/expanding-news-desert/'>UNC News Deserts Study</a></p>
          © {new Date().getFullYear()} | MIT License | <a href='https://www.github.com/'>See Code on Github</a>
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
