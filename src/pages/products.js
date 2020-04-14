import React from "react"
import Layout from "../components/layout"
import styles from "../scss/blog.module.scss"
import Seo from "../components/SEO"
import Button from "../components/Button/button"

export default () => {
  return (
    <Layout>
      <Seo
        title="Products"
        description="Author, Platform, Hypersay - one better than the other"
        pathname="/products"
      />
      <h1>Products</h1>
      <h4 className={styles.feature}>Our amazing product portfolio</h4>
      <h2>Hypersay</h2>
      <p>Button does nothing if not inside a link</p>
      <Button />
    </Layout>
  )
}
