const path = require(`path`)
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  // Pages built using templates/page-template.js
  const pageData = [
    {
      name: "404",
      title:
        "This is the error page. You can change this title in gatsby-node.js",
    },
  ]
  pageData.forEach(page => {
    createPage({
      path: `/${page.name}`,
      component: require.resolve(`./src/templates/page-template.js`),
      context: { page },
    })
  })

  if (result.errors) {
    console.error(result.errors)
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`src/templates/post.js`),
    })
  })

  // Create project list pages (based on blog)
  const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 30
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/projects` : `/projects/${i + 1}`,
      component: path.resolve("./src/templates/blog-list-template.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}
