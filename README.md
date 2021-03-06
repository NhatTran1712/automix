# Structure

The project has been structured with 3 non-standard components (Auth, Gateway
& Utils), and 11 (+ future expansion) standard GraphQL components.

## Auth

The authentication component provides access to the Auth0 Admin API (for
managing users), and validates the JWT tokens via JWKS of incoming requests.

The component is called from the apollo gateway (see below), and passes the
context of the user from the request to the remaining components.

## Gateway

The gateway component sets up the Apollo Gateway, and can considered the
entrypoint of the project.

## Utils

Utils contains helper utilities and shared libraries amongst the components.

If you're reading the spec and see a type you don't recognise, there's a good
chance it's in utils.

## Components

The remaining directories in `./src` contain definitions for all the components
of the project, which define the models, types, resolvers and services.

# Libraries

A number of libraries are used in the projects, these libraries generally
fall into 3 categories:

1. Apollo/GraphQL core libraries
2. Authentication libraries
3. Typescript & decorator/metadata helper libraries

Broken up by category, the primary libraries in use are:

## Apollo/GraphQL core libraries

- [Express](https://expressjs.com/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Apollo Federation](https://www.apollographql.com/docs/apollo-server/federation/introduction/)
- [Apollo Gateway](https://www.apollographql.com/docs/apollo-server/federation/gateway/)

## Authentication libraries

- [Auth0](https://github.com/auth0/node-auth0)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [JWKS](https://github.com/auth0/node-jwks-rsa)

## Typescript & decorator libraries

- [Typescript](https://www.typescriptlang.org/)
- [TypeGraphQL](https://typegraphql.com/)
- [TypeDI](https://github.com/typestack/typedi)
- [Class Validator](https://github.com/typestack/class-validator)

## Misc libraries

- [Jest](https://jestjs.io/)
#   a u t o m i x  
 