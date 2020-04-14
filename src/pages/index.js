import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "../scss/blog.module.scss"
import Seo from "../components/SEO"
import Button from "../components/Button/button"

export default ({ data }) => {
  console.log(data)

  return (
    <Layout>
      <Seo />
      <h1>This is Learn Forward</h1>
      <h4 className={styles.feature}>Noteworthy Projects</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <article className={styles.item}>
          <div className={styles.title}>
            <h2>
              <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
            </h2>
          </div>
          <div className={styles.content}>
            <p>{node.excerpt}</p>
            <div className={styles.meta}>
              <Link className="btn-link" to={node.frontmatter.path}>
                <Button />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            path
          }
          excerpt
        }
      }
    }
  }
`
