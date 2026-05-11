import { useQuery } from '@apollo/client'
import { useBooks } from 'src/entities/book/model'
import { renderHook } from '@testing-library/react'

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn()
}))

describe('useBooks', () => {
  const mockedUseQuery = useQuery as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('return books', () => {
    mockedUseQuery.mockReturnValue({
      data: {
        books: [{ id: '1', title: 'Test' }]
      },
      loading: false,
      error: null
    })

    const { result } = renderHook(() => useBooks())

    expect(result.current.books).toHaveLength(1)
  })

  it('return empty books', () => {
    mockedUseQuery.mockReturnValue({
      data: null,
      loading: false,
      error: null
    })

    const { result } = renderHook(() => useBooks())

    expect(result.current.books).toHaveLength(0)
  })

  it('return loading state', () => {
    mockedUseQuery.mockReturnValue({
      data: null,
      loading: true,
      error: null
    })

    const { result } = renderHook(() => useBooks())

    expect(result.current.loading).toBe(true)
  })

  it('returns error', () => {
    const error = new Error('Тестовая ошибка')

    mockedUseQuery.mockReturnValue({
      data: null,
      loading: false,
      error
    })

    const { result } = renderHook(() => useBooks())

    expect(result.current.error).toBe(error)
  })
})
