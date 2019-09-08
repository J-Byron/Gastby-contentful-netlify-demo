import React from 'react'
import {graphql, Link} from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'

export default ({ data : { allContentfulProduct }}) => (
    <Layout>
        <div>
            {/* Products list */}
            { allContentfulProduct.edges.map(({ node: product }) =>(
                <div key={product.id}>
                    <h2>
                        Garb Product
                    </h2>

                    <Link to={`/products/${product.slug}`} style={{textDecoration: 'none', color: 'rebeccapurple'}}>
                    <h3> {product.name} ·{' '} 
                    <span style={{ fontSize: '1.2rem', fontWeight: 300, color: '#f60'}}> ${product.price} </span> </h3>
                    </Link>

                    <Img style={{ maxWidth: 600 }} fluid={product.image.fluid}/>
                </div>
            )) }
        </div>
    </Layout>
)

export const query = graphql`
{ 
	allContentfulProduct(sort:{
    fields: createdAt
    order: DESC
} ) {
    totalCount
    edges {
      node {
        id
        slug
        price
        name
        image {
            fluid(maxWidth: 800){
                ...GatsbyContentfulFluid_tracedSVG
            }
        }
      }
    }
  }
}
`

