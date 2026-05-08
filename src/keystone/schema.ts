import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'

import { text, password, relationship, timestamp, integer } from '@keystone-6/core/fields'

const isAuth = ({ session }: any) => {
  return !!session
}

export const lists = {
  User: list({
    access: {
      operation: {
        query: allowAll,

        // РЕГИСТРАЦИЯ ДОСТУПНА ВСЕМ
        create: allowAll,

        // А вот менять/удалять только авторизованным
        update: isAuth,
        delete: isAuth
      }
    },

    // this is the fields for our User list
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
      resolveInput: ({ operation, resolvedData }) => {
        if (operation === 'create') {
          resolvedData.createdAt = new Date()
          return resolvedData
        }
        return resolvedData
      }
    }
  }),

  Author: list({
    access: { operation: { query: allowAll, create: isAuth, update: isAuth, delete: isAuth } },

    fields: {
      firstName: text({ validation: { isRequired: true } }),
      lastName: text({ validation: { isRequired: true } }),
      books: relationship({ ref: 'Book.author', many: true, access: { read: allowAll, create: isAuth, update: isAuth } }),
      createdAt: timestamp(),
      updatedAt: timestamp(),
      createdBy: relationship({ ref: 'User', many: false }),
      updatedBy: relationship({ ref: 'User', many: false })
    },

    hooks: {
      resolveInput: ({ operation, resolvedData, context }) => {
        if (operation === 'create') {
          resolvedData.createdAt = new Date()
          resolvedData.createdBy = { connect: { id: context.session?.data.id } }
          return resolvedData
        }
        if (operation === 'update') {
          resolvedData.updatedAt = new Date()
          resolvedData.updatedBy = { connect: { id: context.session?.data.id } }
          return resolvedData
        }
        return resolvedData
      }
    }
  }),

  Genre: list({
    access: { operation: { query: allowAll, create: isAuth, update: isAuth, delete: isAuth } },

    fields: {
      name: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      books: relationship({ ref: 'Book.genre', many: true, access: { read: allowAll, create: isAuth, update: isAuth } }),
      createdAt: timestamp(),
      updatedAt: timestamp(),
      createdBy: relationship({ ref: 'User', many: false }),
      updatedBy: relationship({ ref: 'User', many: false })
    },

    hooks: {
      resolveInput: ({ operation, resolvedData, context }) => {
        if (operation === 'create') {
          resolvedData.createdAt = new Date()
          resolvedData.createdBy = { connect: { id: context.session?.data.id } }
          return resolvedData
        }
        if (operation === 'update') {
          resolvedData.updatedAt = new Date()
          resolvedData.updatedBy = { connect: { id: context.session?.data.id } }
          return resolvedData
        }
        return resolvedData
      }
    }
  }),

  Book: list({
    access: { operation: { query: allowAll, create: isAuth, update: isAuth, delete: isAuth } },

    fields: {
      title: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      author: relationship({ ref: 'Author.books', many: false, access: { read: allowAll, create: isAuth, update: isAuth } }),
      genre: relationship({ ref: 'Genre.books', many: true, access: { read: allowAll, create: isAuth, update: isAuth } }),
      reviews: relationship({ ref: 'Review.book', many: true, access: { read: allowAll, create: isAuth, update: isAuth } }),
      createdAt: timestamp(),
      updatedAt: timestamp(),
      createdBy: relationship({ ref: 'User', many: false }),
      updatedBy: relationship({ ref: 'User', many: false })
    },

    hooks: {
      resolveInput: ({ operation, resolvedData, context }) => {
        if (operation === 'create') {
          resolvedData.createdAt = new Date()
          resolvedData.createdBy = { connect: { id: context.session?.data.id } }
          return resolvedData
        }
        if (operation === 'update') {
          resolvedData.updatedAt = new Date()
          resolvedData.updatedBy = { connect: { id: context.session?.data.id } }
          return resolvedData
        }
        return resolvedData
      }
    }
  }),

  Review: list({
    access: {
      operation: {
        create: isAuth,
        update: isAuth,
        delete: isAuth,
        query: allowAll
      }
    },

    fields: {
      user: relationship({ ref: 'User.reviews', many: false, access: { read: allowAll, create: isAuth, update: isAuth } }),
      book: relationship({ ref: 'Book.reviews', many: false, access: { read: allowAll, create: isAuth, update: isAuth } }),
      text: text(),
      createdAt: timestamp(),
      updatedAt: timestamp(),
      createdBy: relationship({ ref: 'User', many: false }),
      updatedBy: relationship({ ref: 'User', many: false }),
      score: integer({
        validation: { isRequired: true, min: 1, max: 5 }
      })
    },

    hooks: {
      resolveInput: ({ operation, resolvedData, context }) => {
        if (operation === 'create') {
          resolvedData.createdAt = new Date()
          resolvedData.createdBy = { connect: { id: context.session?.data.id } }
          return resolvedData
        }
        if (operation === 'update') {
          resolvedData.updatedAt = new Date()
          resolvedData.updatedBy = { connect: { id: context.session?.data.id } }
          return resolvedData
        }
        return resolvedData
      }
    }

    // НУЖНА ПРОВЕРКА НА ТО, ЧТО У ПОЛЬЗОВАТЕЛЯ МОЖЕТ БЫТЬ ТОЛЬКО ОДИН ОТЗЫВ НА ЭТУ КНИГУ
  })
}
