
import type { CodegenConfig } from '@graphql-codegen/cli';
const config: CodegenConfig = {
  overwrite: true,
  schema: "http://e-commerce-api-dev.us-east-1.elasticbeanstalk.com/graphql",
  documents: "src/graphql/queries/**/*.graphql",
  generates: {
    "src/graphql/generated.ts": {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
    }
  }
};

export default config;
