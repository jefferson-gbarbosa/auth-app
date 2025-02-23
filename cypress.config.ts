import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity:false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://jefferson-gbarbosa.github.io/auth-app/',
    testIsolation:false
  },
});
