import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

const postTemplate = ({ data: post }) => {
  return (
    <Layout>
      <div>
        <h1>{ post.markdownRemark.frontmatter.title }</h1>
        <h4> { post.markdownRemark.timeToRead }</h4>
        <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }} />
      </div>
    </Layout>
  )
}

// Page query
/*
    Create page in gatsby-node.js 
    choose component
    choose context (variable to be passed to page query)
        - In this case, that variable is slug
*/

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default postTemplate
