require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Open Checkbook Detroit',
  },
  pathPrefix: "/open-checkbook",
  plugins: [
    'gatsby-plugin-react-helmet', 
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-107915075-10`
      }
    },
    'gatsby-plugin-less',
    {
      resolve: 'gatsby-source-pg',
      options: {
        connectionString: process.env.PG_CONN,
        schema: 'public',
        refetchInterval: 120,
        watchPg: true
      }
    }
  ],
};
