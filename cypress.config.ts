import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://teste-colmeia-qa.colmeia-corp.com',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    defaultCommandTimeout: 6000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});
