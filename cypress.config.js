const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require('cy-verify-downloads');

module.exports = defineConfig({
  watchForFileChanges: false,
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  waitForAnimations: true,
  animationDistanceTreshold: 20,
  defaultCommandTimeout: 25000,
  execTimeout: 45000,
  pageLoadTimeout: 80000,
  requestTimeout: 45000,
  responseTimeout: 45000,
  failOnStatusCode: false,
  projectId: "wntn5p",
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/results/mochawesome/assets",
  video: false,

  retries: {
    runMode: 0,
    openMode: 0,
  },

  env: {
    MAILOSAUR_API_KEY: "tX1Q2oBGb0rmiDex"
  },

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: "cypress/results/mochawesome",
  },

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
      on('task', verifyDownloadTasks)
    },

    specPattern: 'cypress/e2e/**/*.js',
    supportFile: 'cypress/support/e2e.js',
    experimentalStudio: true
  },

});