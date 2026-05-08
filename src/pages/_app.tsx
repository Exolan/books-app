import React from 'react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'

const client = new ApolloClient({
  link: new HttpLink({
    uri: '/api/graphql'
  }),
  cache: new InMemoryCache(),
  credentials: 'include'
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
