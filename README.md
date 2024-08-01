# quorum-react

Uses vite as build system. Uses react/typescript/gql/tailwind. Deployed to netlify https://quorumvote.com (backend billing is disabled so not functional at the moment).

## Quickstart

```
echo "VITE_API_URL=http://localhost:8080/query" > .env
yarn install
yarn dev
```

## Generating GQL types

Strict GQL types are generated per operation. Running `yarn generate` will parse ts[x] files for queries/mutations and generate a custom type for each against the backend schema.
