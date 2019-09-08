import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"

// pageContext is the data passed down from gatsby-node context that isn't being fetched in the query
export default ({ data, pageContext }) => {
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext
  const nextPage = `/blog/${currentPage + 1}`
  const prevPage = currentPage - 1 === 1 ? "/blog" : `/blog/${currentPage - 1}`

  return (
    <Layout>
      <>
        <h4> {data.allMarkdownRemark.totalCount} Posts </h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h4>
              <Link
                to={`/posts${node.fields.slug}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {node.frontmatter.title}
              </Link>
              <span style={{ color: "black" }}> { node.timeToRead }m </span>
              <span style={{ color: "#bbb" }}> {node.frontmatter.date} </span>
            </h4>
            <p> {node.excerpt} </p>
          </div>
        ))}

        {/* Pagination links */}
        <div 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            maxWidth: 300,
            margin: '0 auto'
          }} >
          {!isFirstPage && (
            <Link to={prevPage} rel="prev">
              Previous Page
            </Link>
          )}

          {/* Create an array  */}
          {Array.from({ length: totalPages }, (_, index) => (
            <Link key={index} to={`/blog/${index === 0 ? "" : index + 1}`}>
              {index + 1}
            </Link>
          ))}
          {!isLastPage && (
            <Link to={nextPage} rel="next">
              Next Page
            </Link>
          )}
        </div>
      </>
    </Layout>
  )
}

// This will take in the values passed from context in gatsby-node.js for
// blog templates
export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(skip: $skip, limit: $limit, sort:{
    fields:[frontmatter___date],
    order: DESC
  }) {
      totalCount
      edges {
        node {
          timeToRead
          id
          excerpt
          frontmatter {
            title
            date(formatString: "MMMM Do, YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
