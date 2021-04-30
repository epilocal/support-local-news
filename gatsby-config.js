module.exports = {
  siteMetadata: {
    title: `Support Local News`,
    description: `Find an independent, local news site near you.`,
    siteUrl: `https://supportlocal.news`,
    author: `Epilocal`,
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `support-local-news`,
        short_name: `sln`,
        start_url: `/`,
        background_color: `#47698e`,
        theme_color: `#47698e`,
        display: `minimal-ui`,
        icon: `src/images/support-local-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        protocol: "https",
        hostname: "supportlocal.news",
        bucketName: "epilocal-supportlocal"
      },
    },
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `supportlocal.news`,
      },
    },
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-advanced-sitemap`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
          siteUrl: "https://supportlocal.news",
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
