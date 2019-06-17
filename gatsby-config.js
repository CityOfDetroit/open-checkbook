require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Detroit open checkbook',
  },
  pathPrefix: "/open-checkbook",
  plugins: [
    'gatsby-plugin-react-helmet', 
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
