import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { text, password, relationship, timestamp, integer } from '@keystone-6/core/fields'
import { GraphQLSchema } from 'graphql'

const isAuth = ({ session }: any) => !!session

const authAccess = {
  operation: {
    query: allowAll,
    create: isAuth,
    update: isAuth,
    delete: isAuth
  }
}

const withTimestamps = ({ operation, resolvedData, context }: any) => {
  const userId = context.session?.data.id

  if (operation === 'create') {
    return {
      ...resolvedData,
      createdAt: new Date(),
      createdBy: userId ? { connect: { id: userId } } : undefined
    }
  }

  if (operation === 'update') {
    return {
      ...resolvedData,
      updatedAt: new Date(),
      updatedBy: userId ? { connect: { id: userId } } : undefined
    }
  }

  return resolvedData
}

export const lists = {
  User: list({
    access: {
      operation: {
        query: allowAll,
        create: allowAll,
        update: isAuth,
        delete: isAuth
      }
    },

    fields: {
      name: text({
        validation: { isRequired: true }
      }),

      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique'
      }),

      password: password({
        validation: { isRequired: true }
      }),

      reviews: relationship({
        ref: 'Review.user',
        many: true
      }),

      createdAt: timestamp()
    },

    hooks: {
      resolveInput: ({ operation, resolvedData }: any) => {
        if (operation === 'create') {
          return {
            ...resolvedData,
            createdAt: new Date()
          }
        }

        return resolvedData
      }
    }
  }),

  Author: list({
    access: authAccess,

    fields: {
      firstName: text({
        validation: { isRequired: true }
      }),

      lastName: text({
        validation: { isRequired: true }
      }),

      books: relationship({
        ref: 'Book.author',
        many: true
      }),

      createdAt: timestamp(),
      updatedAt: timestamp(),

      createdBy: relationship({
        ref: 'User'
      }),

      updatedBy: relationship({
        ref: 'User'
      })
    },

    hooks: {
      resolveInput: withTimestamps
    }
  }),

  Genre: list({
    access: authAccess,

    fields: {
      name: text({
        validation: { isRequired: true },
        isIndexed: 'unique'
      }),

      books: relationship({
        ref: 'Book.genre',
        many: true
      }),

      createdAt: timestamp(),
      updatedAt: timestamp(),

      createdBy: relationship({
        ref: 'User'
      }),

      updatedBy: relationship({
        ref: 'User'
      })
    },

    hooks: {
      resolveInput: withTimestamps
    }
  }),

  Book: list({
    access: authAccess,

    fields: {
      title: text({
        validation: { isRequired: true },
        isIndexed: 'unique'
      }),

      author: relationship({
        ref: 'Author.books'
      }),

      genre: relationship({
        ref: 'Genre.books',
        many: true
      }),

      reviews: relationship({
        ref: 'Review.book',
        many: true
      }),

      createdAt: timestamp(),
      updatedAt: timestamp(),

      createdBy: relationship({
        ref: 'User'
      }),

      updatedBy: relationship({
        ref: 'User'
      })
    },

    hooks: {
      resolveInput: withTimestamps
    }
  }),

  Review: list({
    access: authAccess,

    fields: {
      user: relationship({
        ref: 'User.reviews'
      }),

      book: relationship({
        ref: 'Book.reviews'
      }),

      text: text(),

      score: integer({
        validation: {
          isRequired: true,
          min: 1,
          max: 5
        }
      }),

      createdAt: timestamp(),
      updatedAt: timestamp(),

      createdBy: relationship({
        ref: 'User'
      }),

      updatedBy: relationship({
        ref: 'User'
      })
    },

    db: {
      extendPrismaSchema: (schema) => {
        return schema.replace(
          /}$/,
          `
    @@unique([userId, bookId])
  }`
        )
      }
    }

    // hooks: {
    //   resolveInput: withTimestamps,

    //   validateInput: async ({ resolvedData, context, operation, item }) => {
    //     if (operation !== 'create') return

    //     const userId = resolvedData.user?.connect?.id
    //     const bookId = resolvedData.book?.connect?.id

    //     if (!userId || !bookId) return

    //     const existingReview = await context.db.Review.findMany({
    //       where: {
    //         user: {
    //           id: {
    //             equals: userId
    //           }
    //         },
    //         book: {
    //           id: {
    //             equals: bookId
    //           }
    //         }
    //       }
    //     })

    //     if (existingReview.length > 0) {
    //       throw new Error('Вы уже оставили отзыв на эту книгу')
    //     }
    //   }
    // }
  })
}
