const { siteUrl } = require("./.env.json");

module.exports = {
  siteMetadata: {
    title: "Traveloggers",
    description:
      "Traveloggers is the avatars issued by Matters Lab, a Web 3 creator ecosystem, to mark the identity of a voyager to Matterverse. Owners of these avatars will have access to the most revolutionary experiments in Matterverse",
    en: {
      title: "Traveloggers",
      description:
        "Traveloggers is the avatars issued by Matters Lab, a Web 3 creator ecosystem, to mark the identity of a voyager to Matterverse. Owners of these avatars will have access to the most revolutionary experiments in Matterverse",
    },
    zh: {
      title: "Traveloggers",
      description:
        "Traveloggers 是致力於搭建更自由與公平的 Web 3.0 創作者生態 Matters Lab 發行的 NFT 數字頭像，代表 Matterverse 的遠航者身份。擁有此身份，將開啟 Matterverse 中最激進的實驗權限。",
    },
    author: `@Mattersw3b`,
    siteUrl,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `en`,
        locales: `en zh`,
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
              "./src/styles/variables/z-index.css",
              "./src/styles/variables/typography.css",
            ],
          }),
        ],
      },
    },
  ],
};
