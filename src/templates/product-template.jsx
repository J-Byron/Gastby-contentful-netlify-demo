import React from 'react'
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from 'gatsby-image'

export default ({ data: { contentfulProduct }, pageContext, location}) => (
    <Layout>
        <div style={{
            marginLeft: "0 auto",
            width: "100%",
            textAlign: "center"
        }}>
            {/* Product info */}
            <h2>
                { contentfulProduct.name } -
                <span style={{ color: "#ccc"}}>
                    Added on { contentfulProduct.createdAt}
                </span>
            </h2>
            <h4>
                ${contentfulProduct.price}
            </h4>
            <p>
                {contentfulProduct.description}
            </p>

            <button 
                className="snipcart-add-item"
                data-item-id={contentfulProduct.id}
                data-item-price={contentfulProduct.price}
                data-item-image={contentfulProduct.image.file.url}
                data-item-name={contentfulProduct.name}
                data-item-url={location.pathname}
                style={{
                    background: 'orange',
                    color: 'white',
                    padding: '0.3em',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    margin: '0 0 15px 0'
                }}
            > Add to cart </button>

            <Img style={{ margin: '0 auto', maxWidth: 600}} fluid={contentfulProduct.image.fluid} />
        </div>
    </Layout>
)

export const query = graphql`
query ($slug: String!) {
  contentfulProduct(slug: {eq: $slug}) {
    id
    price
    name
    description
    createdAt(formatString: "MMMM, Do, YYYY")
    image {
        fluid(maxWidth: 800){
            ...GatsbyContentfulFluid
        }
        file{
           url 
        }
    }
  }
}
`