import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'

import { text, password, relationship, timestamp, integer } from '@keystone-6/core/fields'
import { create } from 'domain'

type Session = {
  data: {
    id: string
    name: string
    email: string
  }
}

const isAuth = ({ session }: { session?: Session }) => Boolean(session?.data.id)

export const lists = {
  User: list({
    access: allowAll,

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

      createdAt: timestamp(),
      updatedAt: timestamp()
    },

    hooks: {
      resolveInput: ({ operation, resolvedData }) => {
        if (operation === 'create') {
          resolvedData.createdAt = new Date()
          return resolvedData
        }
        if (operation === 'update') {
          resolvedData.updatedAt = new Date()
          return resolvedData
        }
        return resolvedData
      }
    }
  }),

  Author: list({
    access: allowAll,

    fields: {
      firstName: text({ validation: { isRequired: true } }),
      lastName: text({ validation: { isRequired: true } }),
      books: relationship({ ref: 'Book.author', many: true }),
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
    access: allowAll,

    fields: {
      name: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      books: relationship({ ref: 'Book.genre', many: true }),
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
    access: allowAll,

    fields: {
      title: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      author: relationship({ ref: 'Author.books', many: false }),
      genre: relationship({ ref: 'Genre.books', many: true }),
      reviews: relationship({ ref: 'Review.book', many: true }),
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
      user: relationship({ ref: 'User.reviews', many: false }),
      book: relationship({ ref: 'Book.reviews', many: false }),
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
