// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "@cypress/code-coverage/support";

// Alternatively you can use CommonJS syntax:
// require('./commands')

// * adding user info persistent for "/viewer" routes
Cypress.Commands.add<any>("setPersist", () => {
  const userPersist = {
    user: '{"name":"Sean","streamingConfig":{"videoEnabled":false,"microphoneEnabled":false}}',
    _persist: '{"version":-1,"rehydrated":false}',
  };
  window.localStorage.setItem("persist:root", JSON.stringify(userPersist));
});
