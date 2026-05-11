import { useQuery } from '@apollo/client'
import { useBook } from './useBook'
import { renderHook } from '@testing-library/react'

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn()
}))

describe('useBook', () => {
  const mockedUseQuery = useQuery as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('return book', () => {
    mockedUseQuery.mockReturnValue({
      data: {
        book: {
          id: '1'
        }
      },
      loading: false,
      error: null,
      refetch: jest.fn()
    })

    const { result } = renderHook(() => useBook('1'))

    expect(result.current.book).toEqual({
      id: '1'
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('return null when no book', () => {
    mockedUseQuery.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: jest.fn()
    })

    const { result } = renderHook(() => useBook('1'))

    expect(result.current.book).toBe(null)
  })

  it('skip when bookId is empty', () => {
    mockedUseQuery.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: jest.fn()
    })

    renderHook(() => useBook(''))

    expect(mockedUseQuery).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        skip: true
      })
    )
  })

  it('return refetch', () => {
    const refetch = jest.fn()

    mockedUseQuery.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch
    })

    const { result } = renderHook(() => useBook('1'))

    expect(result.current.refetch).toBe(refetch)
  })
})
