// ***********************************************************
// This example support/index.js is processed and
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
import './commands'
require("cypress-plugin-tab");

import chaiJsonSchema from 'chai-json-schema'; 
chai.use(chaiJsonSchema);


// Alternatively you can use CommonJS syntax:
// require('./commands')



Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes(`Cannot read properties of undefined (reading 'includes')`) 
    || err.message.includes('This authentication method is invalid or cannot be used in this scope')
    || err.message.includes(`Uncaught SyntaxError: Unexpected token '<'`)
    || err.message.includes(`Cannot read properties of null (reading 'message')`)
    || err.message.includes(`Cannot read properties of undefined (reading 'getComputedStyle')`)
    || err.message.includes(`Cannot read properties of undefined (reading 'length`)
    || err.message.includes(`Cannot set properties of null (setting 'currentScaleValue')`)
    || err.message.includes(`Cannot read properties of null (reading 'clientHeight')`)
    || err.message.includes(`Error: ResizeObserver loop limit exceeded`)
    ) {
        return false
    }
})



// Remove XHR during run
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}

