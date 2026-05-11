import { renderHook } from '@testing-library/react'
import { useMutation } from '@apollo/client'
import { useSignUp } from './useSignUp'

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

describe('useSignUp', () => {
  const mockedUseMutation = useMutation as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('redirect after successful registration', async () => {
    const mutationFn = jest.fn()

    mockedUseMutation.mockImplementation((_, options) => {
      mutationFn.mockImplementation(async () => {
        options.onCompleted({
          createUser: {
            id: 'test',
            email: 'test',
            name: 'test',
            password: 'testtestetst'
          }
        })

        return Promise.resolve({
          data: {
            createUser: {
              id: 'test',
              email: 'test',
              name: 'test',
              password: 'testtestetst'
            }
          }
        })
      })

      return [
        mutationFn,
        {
          loading: false
        }
      ]
    })

    const { result } = renderHook(() => useSignUp())

    await result.current.signUp()

    expect(replace).toHaveBeenCalledWith('/auth/signin')
  })

  it('show duplicate email alert', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const mutationFn = jest.fn()

    mockedUseMutation.mockImplementation((_, options) => {
      mutationFn.mockImplementation(async () => {
        const error = {
          graphQLErrors: [
            {
              message: 'You provided invalid data for this operation.\n  - User: Пользователь с таким email уже существует'
            }
          ]
        }

        options.onError(error)

        return Promise.reject(error)
      })

      return [
        mutationFn,
        {
          loading: false
        }
      ]
    })

    const { result } = renderHook(() => useSignUp())

    await expect(result.current.signUp()).rejects.toBeDefined()

    expect(alert).toHaveBeenCalledWith('Пользователь с таким email уже существует')

    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  it('show fallback error alert', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const mutationFn = jest.fn()

    mockedUseMutation.mockImplementation((_, options) => {
      mutationFn.mockImplementation(async () => {
        const error = {
          graphQLErrors: []
        }

        options.onError(error)

        return Promise.reject(error)
      })

      return [
        mutationFn,
        {
          loading: false
        }
      ]
    })

    const { result } = renderHook(() => useSignUp())

    await expect(result.current.signUp()).rejects.toBeDefined()

    expect(alert).toHaveBeenCalledWith('Ошибка регистрации. Попробуйте позже')

    consoleSpy.mockRestore()
  })
})
