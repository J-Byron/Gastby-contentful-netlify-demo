import React from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql, Link } from "gatsby"

const page3 = () => {
  const getImagedata = useStaticQuery(graphql`
    query imageQuery {
      allFile {
        totalCount
        edges {
          node {
            relativePath
            prettySize
            id
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <h1>Hello from page 3!</h1>
          <table>
            <thead>
              <tr>
                <th> Relative path </th>
                <th> Size </th>
                <th> Id </th>
              </tr>
            </thead>
            <tbody>
              {getImagedata.allFile.edges.map(({node}, index) => (
                <tr key={index}>
                  <td> {node.relativePath} </td>
                  <td> {node.prettySize} </td>
                  <td> {node.id} </td>
                </tr>
              ))}
            </tbody>
          </table>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default page3
