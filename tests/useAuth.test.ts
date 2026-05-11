import { renderHook } from '@testing-library/react'
import { useQuery } from '@apollo/client'

import { useAuth } from 'src/entities/user/model'

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn()
}))

describe('useAuth', () => {
  const mockedUseQuery = useQuery as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('return authenticated user', () => {
    mockedUseQuery.mockReturnValue({
      data: {
        authenticatedItem: {
          id: '1',
          name: 'test',
          email: 'test@mail.ru'
        }
      },
      loading: false,
      error: null
    })

    const { result } = renderHook(() => useAuth())

    expect(result.current.user).toEqual({
      id: '1',
      name: 'test',
      email: 'test@mail.ru'
    })

    expect(result.current.userLoading).toBe(false)
    expect(result.current.userError).toBe(null)
  })

  it('return undefined when user is not authenticated', () => {
    mockedUseQuery.mockReturnValue({
      data: null,
      loading: false,
      error: null
    })

    const { result } = renderHook(() => useAuth())

    expect(result.current.user).toBeUndefined()
  })
})
