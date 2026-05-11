import { renderHook } from '@testing-library/react'
import { useMutation } from '@apollo/client'

import { useCreateReview } from 'src/features/review/createReview/model/useCreateReview'

global.alert = jest.fn()

jest.mock('@apollo/client', () => ({
  useMutation: jest.fn()
}))

describe('useCreateReview', () => {
  const mockedUseMutation = useMutation as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('show success alert after creating review', async () => {
    const mutationFn = jest.fn()

    mockedUseMutation.mockImplementation((_, options) => {
      mutationFn.mockImplementation(async () => {
        options.onCompleted({
          createReview: {
            id: '1',
            text: 'Очень хорошая книга',
            score: 5
          }
        })

        return Promise.resolve({
          data: {
            createReview: {
              id: '1',
              text: 'Очень хорошая книга',
              score: 5
            }
          }
        })
      })

      return [
        mutationFn,
        {
          loading: false,
          error: null
        }
      ]
    })

    const { result } = renderHook(() => useCreateReview())

    await result.current.createReview()

    expect(alert).toHaveBeenCalledWith('Отзыв успешно добавлен!')
  })

  it('show duplicate review alert', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const mutationFn = jest.fn()

    mockedUseMutation.mockImplementation((_, options) => {
      mutationFn.mockImplementation(async () => {
        const error = {
          graphQLErrors: [
            {
              message: 'Prisma error: Unique constraint failed on the fields: (`user`,`book`)'
            }
          ]
        }

        options.onError(error)

        return Promise.reject(error)
      })

      return [
        mutationFn,
        {
          loading: false,
          error: null
        }
      ]
    })

    const { result } = renderHook(() => useCreateReview())

    await expect(result.current.createReview()).rejects.toBeDefined()

    expect(alert).toHaveBeenCalledWith('Вы уже оставили отзыв на эту книгу')

    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })
})
