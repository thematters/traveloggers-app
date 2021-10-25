import { graphql, useStaticQuery } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import React from "react"
import { Helmet } from "react-helmet"

import { LANG } from "~/enums"

type SEOProps = {
  title?: {
    [LANG.zhHant]: string
    [LANG.zhHans]: string
    [LANG.en]: string
  }
  description?: {
    [LANG.zhHant]: string
    [LANG.zhHans]: string
    [LANG.en]: string
  }
}

export const SEO: React.FC<SEOProps> = ({
  title: pageTitle = {},
  description = {},
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const { locale } = useLocalization()
  const lang = locale as LANG

  const metaDescription = description[lang] || site.siteMetadata.description
  const siteTitle = site.siteMetadata?.title
  const socialTitle = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle

  return (
    <Helmet
      title={pageTitle[lang]}
      titleTemplate={`%s | ${siteTitle}`}
      defaultTitle={siteTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: socialTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: socialTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]}
    >
      <link
        rel="icon"
        type="image/png"
        href="/favicon-16x16.png"
        sizes="16x16"
      />
      <link
        rel="icon"
        type="image/png"
        href="/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="apple-touch-icon"
        key="apple-touch-icon"
        href="/apple-touch-icon.png"
      />
    </Helmet>
  )
}
