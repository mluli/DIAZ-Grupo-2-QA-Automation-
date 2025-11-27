const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Default viewport set to full HD so tests run maximized by default
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      // Ensure browsers start in fullscreen or maximized when possible.
      // This helps run tests in a full window both in headed and headless runs.
      on('before:browser:launch', (browser = {}, launchOptions) => {
        // Chromium based browsers (Chrome, Edge)
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // start maximized / fullscreen for chromium
          launchOptions.args.push('--start-maximized')
          launchOptions.args.push('--start-fullscreen')
        }

        // Electron
        if (browser.name === 'electron') {
          // Electron needs explicit window size
          launchOptions.preferences.width = 1920
          launchOptions.preferences.height = 1080
          launchOptions.args.push('--start-fullscreen')
        }

        // Firefox: kiosk mode is closest to fullscreen
        if (browser.family === 'firefox') {
          launchOptions.args.push('-kiosk')
        }

        return launchOptions
      })

      // return the modified config
      return config
    },
  },
});
