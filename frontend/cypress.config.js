import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import { config } from 'dotenv';

config()

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: "cypress/e2e/**/*.feature",
    // env: {
    //   cognito_username: process.env.AWS_COGNITO_USERNAME,
    //   cognito_password: process.env.AWS_COGNITO_PASSWORD,
    // awsConfig: awsConfig.default,
    // },
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      })
      on('file:preprocessor', bundler)
      await addCucumberPreprocessorPlugin(on, config)
      return config
    },
  },
})
