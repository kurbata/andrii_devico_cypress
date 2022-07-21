const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    watchForFileChanges: false,
    numTestsKeptInMemory: 50,
    specPattern: "cypress/e2e/**/*.spec.{js,cy,jsx,ts,tsx}",
    retries: {
      runMode: 2,
      openMode: 1,
    },
    setupNodeEvents(on, config) {

    },
  },
});
// implement node event listeners here
//specPattern: "**/*.feature"
