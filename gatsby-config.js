module.exports = {
  siteMetadata: {
    title: `Matters NFT site`,
    description: `matters nft site`,
    author: `@thematters`,
    siteUrl: `https://nft.matters.news/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,

    `gatsby-plugin-image`,

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    `gatsby-transformer-sharp`,

    `gatsby-plugin-sharp`,

    // {
    //   resolve: `gatsby-plugin-typescript`,
    //   options: {
    //     isTSX: true, // defaults to false
    //     jsxPragma: `jsx`, // defaults to "React"
    //     allExtensions: true, // defaults to false
    //   },
    // },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "~": "./src",
        },
        extensions: ["ts", "tsx", "css"],
      },
    },

    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout/index.tsx`),
      },
    },

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
