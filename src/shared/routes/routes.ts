export const routes = {
  home: '/',

  auth: {
    signIn: '/auth/signin',
    signUp: '/auth/signup'
  },

  books: {
    byId: (id: string) => `/books/${id}`
  }
}
