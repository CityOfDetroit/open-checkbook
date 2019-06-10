# open-checkbook

Search and visualize vendor spending data across city agencies from OCFO.

This repo is bootstrapped from the [Gatsby 2 Semantic UI Starter](https://github.com/pretzelhands/gatsby-starter-semantic-ui) and uses the [gatsby-source-pg](https://www.gatsbyjs.org/packages/gatsby-source-pg/) plugin to query PostgreSQL data.

## Dev

Clone the repo and install dependencies:
```bash
git clone <>
cd open-checkbook
yarn
```

Set your `development` or `production` environment variables by copying `.env.example`: 
```bash
cp .env.example ./.env.development
```

Our current dev secret is: `PG_CONN=postgres://gisteam@0.tcp.ngrok.io:18800/checkbook`

Start the development server: `gatsby develop`
