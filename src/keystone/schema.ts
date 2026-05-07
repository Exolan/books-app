import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'

import { text, password, relationship, timestamp, select, integer } from '@keystone-6/core/fields'
import { release } from 'os'

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
      })
    }
  }),

  Author: list({
    access: allowAll,

    fields: {
      firstName: text({ validation: { isRequired: true } }),
      lastName: text({ validation: { isRequired: true } }),
      books: relationship({ ref: 'Book.author', many: true })
    }
  }),

  Genre: list({
    access: allowAll,

    fields: {
      name: text({ validation: { isRequired: true } }),
      books: relationship({ ref: 'Book.genre', many: true })
    }
  }),

  Book: list({
    access: allowAll,

    fields: {
      title: text({ validation: { isRequired: true } }),
      author: relationship({ ref: 'Author.books', many: false }),
      genre: relationship({ ref: 'Genre.books', many: true }),
      reviews: relationship({ ref: 'Review.book', many: true })
    }
  }),

  Review: list({
    access: allowAll, // ИЗМЕНИТЬ, ГОСТИ НЕ МОГУТ ВИДЕТЬ

    fields: {
      user: relationship({ ref: 'User.reviews', many: false }),
      book: relationship({ ref: 'Book.reviews', many: false }),
      text: text(),
      createdAt: timestamp(),
      score: integer({
        validation: { isRequired: true, min: 1, max: 5 }
      })
    }

    // НУЖНА ПРОВЕРКА НА ТО, ЧТО У ПОЛЬЗОВАТЕЛЯ МОЖЕТ БЫТЬ ТОЛЬКО ОДИН ОТЗЫВ НА ЭТУ КНИГУ
  })
}
