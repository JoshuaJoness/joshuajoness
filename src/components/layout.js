/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Menu from "./menu"
import "./layout.css"

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

  const [scrolled, setScrolled] = useState(false)
  const scrollHandler = () => {
    if (window.scrollY !== 0) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }
  window.addEventListener('scroll', scrollHandler)

  return (
    <>
      <div>
      <Menu siteTitle={data.site.siteMetadata.title}></Menu>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built by
          {` `}
          <a href="http://www.joshuajones.io">joshuajones.io</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

// {scrolled ? (
//   <Menu siteTitle={data.site.siteMetadata.title}></Menu>
// ) : null}
