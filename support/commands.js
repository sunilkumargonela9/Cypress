import 'cypress-file-upload'
import 'cypress-mailosaur'
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//require('cypress-xpath');
Cypress.Commands.add("login", (username, password) => {
    cy.visit(`/signin`)
    cy.get('#login_username').type(username)
    cy.get('#login_password').type(password)
    cy.get('[type="Submit"]').click()
    cy.get('.spinner').should('not.exist')

})

Cypress.Commands.add('getType', (key) => {
    cy.get(`[type="${key}"]`)
});

Cypress.Commands.add('clientstitle', (title) => {
    cy.contains(title)
});

Cypress.Commands.add('classname', (key) => {
    cy.get(key)
})

Cypress.Commands.add('userrole', (key) => {
    cy.get(`[role="${key}"]`)
})


Cypress.Commands.add('checkSpinner', () => {
    cy.get('.spinner', { timeout: 60000 }).should('not.exist')
})

Cypress.Commands.add('checkSavedAlert', () => {
    cy.contains('Saved Successfully').should('exist')
})


Cypress.Commands.add('apiLogin', () => {
    cy.request({
        method: 'POST',
        url: 'auth/token',
        headers: {
            "Content-Type": "application/json",
        },
        body: {
            "userName": Cypress.env('username'),
            "password": Cypress.env('password')
        }
    })
        .then((resp) => {
            cy.writeFile('cypress/fixtures/apiLogin.json', resp)
        })

})

Cypress.Commands.add('apiAdminLogin', () => {
    cy.request({
        method: 'POST',
        url: 'auth/token',
        headers: {
            "Content-Type": "application/json",
        },
        body: {
            "userName": Cypress.env('adminUsername'),
            "password": Cypress.env('password')
        }
    })
        .then((resp) => {
            cy.writeFile('cypress/fixtures/apiLogin.json', resp)
        })

})

Cypress.Commands.add('apiEsgLogin', (esgUrl) => {
    cy.log("User login using API")
    cy.request({
        method: 'POST',
        url: 'auth/token',
        headers: {
            "origin": `${esgUrl}`,
            "referer": `${esgUrl}`,
            "Content-Type": "application/json",
        },
        body:{
            "userName":Cypress.env('username'),
            "password":Cypress.env('password')
            }
      })
    .then((resp)=>{
        expect(resp.status).to.eq(200)
        cy.writeFile('cypress/fixtures/apiLogin.json', resp)
    })
    
})


Cypress.Commands.add('getDealId', () => {
    cy.location()
        .then((location) =>{
            let href = location.href
            let id = href.split('deal/')[1]
            cy.log("deal id is = " + id)
            cy.readFile('cypress/fixtures/cba_qa/dealData.json').then((obj) => {
                obj.dealId = id
                cy.writeFile('cypress/fixtures/cba_qa/dealData.json', obj)
            })
            
        })
})


require('cy-verify-downloads').addCustomCommand()
require('cypress-downloadfile/lib/downloadFileCommand')

