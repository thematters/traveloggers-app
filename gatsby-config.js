const { siteUrl } = require("./.env.json")

module.exports = {
  siteMetadata: {
    // TODO: i18n
    title: `Travelogers`,
    description: `matters nft site`,
    author: `@Mattersw3b`,
    siteUrl,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `zh-hant`,
        locales: `zh-hant zh en`,
        configPath: require.resolve(`./i18n/config.json`),
      },
    },

    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "~": "./src",
          "@": "./",
        },
        extensions: ["ts", "tsx", "css"],
      },
    },

    /**
     * Assets
     */
    // image
    `gatsby-plugin-image`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    /**
     * Layout
     */
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout/index.tsx`),
      },
    },

    /**
     * Components
     */
    // icon
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        prettier: true, // use prettier to format JS code output (default)
        svgo: true, // use svgo to optimize SVGs (default)
        memo: true,
        dimensions: false,
        svgoConfig: {
          plugins: [
            { removeViewBox: false }, // remove viewBox when possible (default)
            { cleanupIDs: true }, // remove unused IDs and minify remaining IDs (default)
          ],
        },
      },
    },

    /**
     * Styles
     */
    // typography
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Press Start 2P`],
        display: "swap",
      },
    },
    // css
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-mixins`)({
            mixinsFiles: "./src/styles/mixins.css",
          }),
          require(`postcss-preset-env`)({
            stage: 0,
            preserve: false,
            importFrom: [
              "./src/styles/variables/breakpoints.css",
              "./src/styles/variables/colors.css",
              "./src/styles/variables/sizing.css",
              "./src/styles/variables/spacing.css",
              "./src/styles/variables/typography.css",
            ],
          }),
        ],
      },
    },
  ],
}
