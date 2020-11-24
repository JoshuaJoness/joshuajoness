import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import BackgroundImage from 'gatsby-background-image'

const Madrid = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "madrid2.jpg" }) {
        childImageSharp {
          fluid(fit: FILL) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <BackgroundImage fluid={data.placeholderImage.childImageSharp.fluid} />
}

export default Madrid
