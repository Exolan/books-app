import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { text, password, relationship, timestamp, integer } from '@keystone-6/core/fields'

const isAuth = ({ session }: any) => !!session // Проверяем, что пользователь аутентифицирован

// Общая конфигурация доступа для списков Author, Genre, Book и Review
const authAccess = {
  operation: {
    query: allowAll,
    create: isAuth,
    update: isAuth,
    delete: isAuth
  }
}

// Хук для автоматического заполнения tracking-полей
const withTimestamps = ({ operation, resolvedData, context }: any) => {
  const userId = context.session?.data.id

  // При создании
  if (operation === 'create') {
    return {
      ...resolvedData,
      createdAt: new Date(),
      createdBy: userId ? { connect: { id: userId } } : undefined
    }
  }

  // При обновлении
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
      // Разрешаем всем просматривать пользователей, регистрироваться, но обновлять и удалять только аутентифицированным пользователям
      operation: {
        query: allowAll,
        create: allowAll,
        update: isAuth,
        delete: isAuth
      }
    },

    fields: {
      // Имя
      name: text({
        validation: { isRequired: true }
      }),

      // Электронная почта
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique'
      }),

      // Пароль
      password: password({
        validation: { isRequired: true }
      }),

      // Отзывы
      reviews: relationship({
        ref: 'Review.user',
        many: true
      }),

      // tracking-поля
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
      resolveInput: withTimestamps,
      validateInput: async ({ resolvedData, addValidationError, operation, context }) => {
        if (operation === 'create' && resolvedData.email) {
          const existingUser = await context.db.User.findOne({
            where: { email: resolvedData.email }
          })

          if (existingUser) {
            addValidationError('Пользователь с таким email уже существует')
          }
        }
      }
    }
  }),

  Author: list({
    access: authAccess,

    fields: {
      // Имя
      firstName: text({
        validation: { isRequired: true }
      }),

      // Фамилия
      lastName: text({
        validation: { isRequired: true }
      }),

      // Книги автора
      books: relationship({
        ref: 'Book.author',
        many: true
      }),

      // tracking-поля
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
      // Название жанра
      name: text({
        validation: { isRequired: true },
        isIndexed: 'unique'
      }),

      // Книги
      books: relationship({
        ref: 'Book.genre',
        many: true
      }),

      // tracking-поля
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
      // Название
      title: text({
        validation: {
          isRequired: true,
          length: { min: 2, max: 200 } // Небольшая валидация
        }
      }),

      // Автор
      author: relationship({
        ref: 'Author.books',
        // Отображение имени в админке
        ui: {
          displayMode: 'select',
          labelField: 'firstName'
        }
      }),

      // Жанры (может быть несколько?)
      genre: relationship({
        ref: 'Genre.books',
        many: true
      }),

      // Описание
      description: text({
        validation: { isRequired: true }
      }),

      // Отзывы
      reviews: relationship({
        ref: 'Review.book',
        many: true
      }),

      // tracking-поля
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
      resolveInput: withTimestamps,

      // Валидация при создании на пустые поля author и genre
      validateInput: async ({ resolvedData, addValidationError, operation }) => {
        if (operation === 'create') {
          // Проверяем наличие автора
          const hasAuthor = resolvedData.author
          if (!hasAuthor) {
            addValidationError('Невозможно создать книгу без автора.')
          }

          // Проверяем наличие хотя бы одного жанра
          const hasGenre = resolvedData.genre
          if (!hasGenre) {
            addValidationError('Невозможно создать книгу без жанра.')
          }
        }
      }
    }
  }),

  Review: list({
    access: authAccess,

    fields: {
      // Пользователь, который оставил отзыв
      user: relationship({
        ref: 'User.reviews'
      }),

      // Книга, на которую оставлен отзыв
      book: relationship({
        ref: 'Book.reviews'
      }),

      // Текст отзыва
      text: text({
        validation: { isRequired: true }
      }),

      // Оценка от 1 до 5
      score: integer({
        validation: {
          isRequired: true,
          min: 1,
          max: 5
        }
      }),

      // tracking-поля
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
      resolveInput: withTimestamps,

      // Валидация при создании на пустые поля user и book
      validateInput: async ({ resolvedData, addValidationError, operation }) => {
        if (operation === 'create') {
          // Проверяем наличие автора
          const hasUser = resolvedData.user
          if (!hasUser) {
            addValidationError('Невозможно создать отзыв без пользователя')
          }

          // Проверяем наличие хотя бы одного жанра
          const hasBook = resolvedData.book
          if (!hasBook) {
            addValidationError('Невозможно создать отзыв без книги')
          }
        }
      }
    },

    // Добавление уникальных индексов на поля userId и bookId, чтобы пользователь не мог оставить несколько отзывов на одну книгу
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

    // Попытка это сделать через хуки
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
