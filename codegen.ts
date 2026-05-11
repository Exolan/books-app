import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:3000/api/graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/shared/api/generated/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
        gqlTagName: 'gql'
      },

      // Сделал так, чтобы Date не была unknown
      config: {
        scalars: {
          DateTime: 'string'
        }
      }
    }
  }
}
export default config
