module.exports = {
    siteMetadata: {
        title: `MasterMind`,
        description: `Sample project in React/Gatsby and Redux`,
        author: `NicolasPorreca`,
    },
    plugins: [
        // PLUGINS
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-styled-components`,
        {
            resolve: `gatsby-plugin-exclude`,
            options: {
                paths: ['/src/pages/templates/**'],
            },
        },
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /.svg$/,
                },
            },
        },
        {
            resolve: 'gatsby-plugin-transition-link',
            options: {
                layout: require.resolve(`${__dirname}/src/components/Layout.tsx`),
            },
        },
        // {
        //     resolve: `gatsby-plugin-intl`,
        //     options: {
        //         path: `${__dirname}/src/assets/i18n`,
        //         languages: [`en`, `it`],
        //         defaultLanguage: `en`,
        //         redirect: true,
        //     },
        // },

        // SOURCES
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/assets/images`,
            },
        },

        // TRANSFORMERS
        `gatsby-transformer-sharp`,

        // OPTIONS FOR PWA
        // {
        //     resolve: `gatsby-plugin-manifest`,
        //     options: {
        //         name: `gatsby-starter-default`,
        //         short_name: `starter`,
        //         start_url: `/`,
        //         background_color: `#663399`,
        //         theme_color: `#663399`,
        //         display: `minimal-ui`,
        //         icon: `src/assets/images/gatsby-icon.png`, // This path is relative to the root of the site.
        //     },
        // },

        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};
