module.exports = {
  siteMetadata: {
    title: 'Detroit open checkbook',
  },
  plugins: [
    'gatsby-plugin-react-helmet', 
    'gatsby-plugin-less',
    {
      resolve: 'gatsby-source-pg',
      options: {
        connectionString: "postgres://gisteam@0.tcp.ngrok.io:18800/checkbook",
        schema: 'public'
      }
    }
  ],
}
