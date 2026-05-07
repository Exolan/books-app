import { createAuth } from '@keystone-6/auth'
import { lists } from './src/keystone/schema'
import { config } from '@keystone-6/core'
import * as dotenv from 'dotenv'
import { statelessSessions } from '@keystone-6/core/session'
import { GraphQLSchema } from 'graphql'
import { mergeSchemas } from 'graphql-yoga'

dotenv.config()
const DATABASE_URL = process.env.DATABASE_URL

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',

  sessionData: 'id name email',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    skipKeystoneWelcome: true
  }
})

const session = statelessSessions({
  secret: process.env.SESSION_SECRET
})

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: DATABASE_URL || `postgresql://postgres:postgres@127.0.0.1:25432/main`
    },
    lists,
    session,
    graphql: {
      extendGraphqlSchema: (schema: GraphQLSchema) => {
        return mergeSchemas({
          schemas: [schema],
          typeDefs: `
            type Query {
              averageScore(bookId: ID!): Float
            }
          `,
          resolvers: {
            Query: {
              averageScore: async (_, { bookId }, context) => {
                const result = await context.prisma.review.aggregate({
                  _avg: { score: true },
                  where: { bookId }
                })

                return result._avg.score ?? 0
              }
            }
          }
        })
      }
    }
  })
)
