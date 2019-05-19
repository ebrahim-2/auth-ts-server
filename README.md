# graphql-ts-server-boilerplate

A GraphQL Server boilerplate made with Typescript, MongoDB, and Redis

## Installation

1. Clone project
```
git clone https://github.com/EbrahimKreem/auth-ts-server.git
```
2. cd into folder
```
cd auth-ts-server
```
3. Download dependencies 
```
yarn
```
4. Start MongoDB server

5. Install and start Redis
(https://redis.io/download)

6. Add .env file in the root folder and use your mongodb uri
```
MONGODB_URI=mongodb://localhost/auth
```

## Usage

You can start the server with `yarn run dev` then navigate to `http://localhost:4000/graphql` to use GraphQL Playground.

## Features

* Register
* Login
* Forgot Password
* OAuth for google and facebook
