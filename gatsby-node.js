// Note: This file is a node script so make sure to use commonJS

//
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")


const postTemplate = path.resolve("./src/templates/post-template.jsx")
const blogTemplate = path.resolve("./src/templates/blog-template.jsx")
const productTemplate = path.resolve("./src/templates/product-template.jsx")

// Redux behind the scenes!!!!! Gives us actions to give us a bunch of stores

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    // Creates a slug for the given node (/page-1/,/page-2/, etc.)
    const slug = createFilePath({ node, getNode, basePath: "posts" })

    // Creates a node field
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

// Query page data with graphyql (result) then map each node to a page component with props (context)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
  {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
    allContentfulProduct {
      edges {
        node {
          slug
        }
      }
    }
  }
  `)

  const posts = result.data.allMarkdownRemark.edges
  posts.forEach(({ node: post }) => {
    createPage({
      path: `posts${post.fields.slug}`,
      component: postTemplate,
      context: {
        slug: post.fields.slug,
      },
    })
  })
  
  const postsPerPage = 2
  const totalPages = Math.ceil(posts.length / postsPerPage)

  // Empty first argument
  Array.from({ length: totalPages }).forEach((_, index)=>{

    const currentPage = index + 1
    const isFirstPage = index === 0
    const isLastPage = currentPage === totalPages

    createPage({
        path: isFirstPage ? '/blog' : `/blog/${currentPage}`,
        component: blogTemplate,
        context: {
            // # of posts per blog page
            limit: postsPerPage,
            // # Of posts to skip
            skip: index * postsPerPage,
            // Send these to component via query
            isFirstPage,
            isLastPage,
            currentPage,
            totalPages
        }
    })

  })

  const products = result.data.allContentfulProduct.edges 
  products.forEach(({ node: product }) => {
    createPage({
      path: `/products/${product.slug}`,
      component: productTemplate,
      context : {
        slug: product.slug
      }
    })
  })

}

 