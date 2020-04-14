import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/SEO"
import "../scss/main.scss"
import Button from "../components/Button/button"
import styles from "../scss/blog.module.scss"

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage =
      currentPage - 1 === 1
        ? "/projects/"
        : "/projects/" + (currentPage - 1).toString()
    const nextPage = "projects/" + (currentPage + 1).toString()

    return (
      <Layout>
        <Seo title="All Projects" description="Recent Learn Forward Projects" />
        <div className="blog-list">
          <h1>Some of Our Projects</h1>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.frontmatter.path
            return (
              <article key={title} className={styles.item}>
                <div className={styles.title}>
                  <h2>
                    <Link to={node.frontmatter.path}>{title}</Link>
                  </h2>
                </div>
                <div className={styles.content}>
                  <p>{node.excerpt}</p>
                  <div className={styles.meta}>
                    <Link className="btn-link" to={node.frontmatter.path}>
                      <Button />
                    </Link>
                    <h4>
                      {node.frontmatter.tags.map(tag => (
                        <span
                          key={tag}
                          style={{
                            fontWeight: "normal",
                            color: "white",
                            backgroundColor: "lightgray",
                            borderRadius: "10px",
                            margin: "0 3px",
                            padding: "2px 5px",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </h4>
                  </div>
                </div>
              </article>
            )
          })}
          {!isFirst && (
            <Link className="btn" to={prevPage} rel="prev">
              Previous Project
            </Link>
          )}

          {!isLast && (
            <Link className="btn" to={nextPage} rel="next">
              Next Project
            </Link>
          )}
        </div>
      </Layout>
    )
  }
}
export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            tags
          }
          excerpt
        }
      }
    }
  }
`
