import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import PageLayout from "../components/layout/page-layout"
import { graphql } from "gatsby"

import { HeadlineContent } from '../components/typography/headline';
import Img from "gatsby-image"
import { Content, Section} from '../components/layout/layout';

import ArticleFooter from '../components/blog/article-footer';
import MarkdownContentful from '../components/typography/markdown-contentful';
import DateInfo from '../components/content-footer/date-info';
import Separator from '../components/content-footer/separator';
import PageMeta from '../components/page-meta';

const Header = ({article}) => (
  <header>
    <HeadlineContent>{article.title}</HeadlineContent>
  </header>
)

const HeroImage = ({article}) => (
  <Img
      alt={article.title}
      key={article.heroImage.src}
      fluid={article.heroImage.fluid}
    />
)

class BlogPostTemplate extends React.Component {
  render() {
    const article = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <PageLayout light="true">
        <PageMeta
          {...this.props}
          article={article}
          title={article.title}/>

        <article>
          <HeroImage article={article}/>

          <Content>
            <Section>
              <Header article={article}/>
              <MarkdownContentful markdown={article.body.childMarkdownRemark} />
              <ArticleFooter {...this.props} article={article}/>
            </Section>
          </Content>

        </article>
      </PageLayout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      createdAt(formatString: "DD.MMM YYYY")
      updatedAt(formatString: "DD.MMM YYYY")
      excerpt: description {
        childMarkdownRemark {
          excerpt
        }
      }
      body {
        childMarkdownRemark {
          htmlAst
        }
      }

      heroImage {
        fluid(maxWidth: 1180, maxHeight: 480){
          ...GatsbyContentfulFluid
        }
      }

      author {
        name
        role
        image {
          fixed(width: 55, height: 55){
            ...GatsbyContentfulFixed
          }
        }
      }
    }
  }
`
