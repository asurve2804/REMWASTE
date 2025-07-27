const { defineConfig } = require("cypress");
const fs = require("node:fs");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", browserify.default(config));

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}
module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  defaultCommandTimeout: 6000,
  env: {
    url: "http://localhost:3000/",
    email: "atul",
    password: "admin123",
  },
  retries: {
    runMode: 1,
  },
  projectId: "nodpcq",

  e2e: {
    async setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      await preprocessor.addCucumberPreprocessorPlugin(on, config);

      on("file:preprocessor", browserify.default(config));

      // on("file:preprocessor", creatBundler({
      //   plugins: [createEsbuildPlugin(config)]
      // }));

      on("after:spec", (spec, results) => {
        if (results && results.video && results.stats.failures === 0) {
          fs.unlinkSync(results.video);
        }
      });
      return config;
    },
    specPattern: "cypress/e2e/BDD/*.feature",
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    videoCompression: false,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
  },
});
