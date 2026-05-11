import { renderHook } from '@testing-library/react'
import { useMutation } from '@apollo/client'
import { useSignIn } from 'src/features/auth/signin/model/useSignIn'

const replace = jest.fn()
global.alert = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace
  })
}))

jest.mock('@apollo/client', () => ({
  useMutation: jest.fn()
}))

describe('useSignIn', () => {
  const mockedUseMutation = useMutation as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('redirect after successful login', async () => {
    const mutationFn = jest.fn()

    mockedUseMutation.mockImplementation((_, options) => {
      mutationFn.mockImplementation(async () => {
        options.onCompleted({
          authenticateUserWithPassword: {
            item: {
              id: '1',
              email: 'test@mail.ru',
              name: 'test'
            }
          }
        })

        return Promise.resolve({
          data: {
            authenticateUserWithPassword: {
              item: {
                id: '1',
                email: 'test@mail.ru',
                name: 'test'
              }
            }
          }
        })
      })

      return [
        mutationFn,
        {
          data: {
            authenticateUserWithPassword: {
              item: {
                id: '1',
                email: 'test@mail.ru',
                name: 'test'
              }
            }
          },
          loading: false
        }
      ]
    })

    const { result } = renderHook(() => useSignIn())

    await result.current.signIn()

    expect(replace).toHaveBeenCalledWith('/')

    expect(result.current.user).toEqual({
      id: '1',
      email: 'test@mail.ru',
      name: 'test'
    })
  })

  it('show alert on server error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const mutationFn = jest.fn()

    mockedUseMutation.mockImplementation((_, options) => {
      mutationFn.mockImplementation(async () => {
        options.onError(new Error('Тестовая ошибка'))

        return Promise.reject(new Error('Тестовая ошибка'))
      })

      return [
        mutationFn,
        {
          data: null,
          loading: false
        }
      ]
    })

    const { result } = renderHook(() => useSignIn())

    await expect(result.current.signIn()).rejects.toThrow()

    expect(consoleSpy).toHaveBeenCalled()

    expect(alert).toHaveBeenCalledWith('Не удалось соединиться с сервером')

    consoleSpy.mockRestore()
  })

  it('show alert for invalid email/password', async () => {
    const mutationFn = jest.fn()

    mockedUseMutation.mockImplementation((_, options) => {
      mutationFn.mockImplementation(async () => {
        options.onCompleted({
          authenticateUserWithPassword: {}
        })

        return Promise.resolve()
      })

      return [
        mutationFn,
        {
          data: {
            authenticateUserWithPassword: {}
          },
          loading: false
        }
      ]
    })

    const { result } = renderHook(() => useSignIn())

    await result.current.signIn()

    expect(alert).toHaveBeenCalledWith('Неверный логи или пароль')
  })
})
