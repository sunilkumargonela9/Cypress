

import TopMenuPage from '../../pageObjects/TopMenuPage';
import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage';
import * as data from '../../fixtures/suncorp/config_productwizard.json'





const username = Cypress.env('username')
const password = Cypress.env('password')
const relationship = 'Alpha Consulting'
const client = 'Alpha Consulting Client - 1'


before(() => {
    cy.login(username, password)
})

//product wizard entity configuration

describe("Credit category type and its categories and product should be dispalyed", () => {

    it("go to clientWizard", () => {
        TopMenuPage.addDeal()
        TopMenuPage.searchRelationship(relationship)
        TopMenuPage.selectRelValue(relationship)
        ClientWizardPage.clickNext()
        ClientWizardPage.clickOnRelationshipDetails()
    })

    it("go to product wizard page", () => {
        ClientWizardPage.selectClient(client)
        cy.wait(1000)
        ClientWizardPage.clickNext()
        cy.checkSpinner()
    })

    it("credit heading should be displayed", () => {
        ProductWizardPage.validateProductName('credit', data)
    })

    it("commerical lending category should be displayed", () => {
        ProductWizardPage.validateProductCategory('credit', 'commercialLending', data)
    })

    it("commercial lending category products with description should be displayed", () => {
        ProductWizardPage.validateNamesAndDescription('credit', 'commercialLending', 'row1', data)
        ProductWizardPage.validateNamesAndDescription('credit', 'commercialLending', 'row2', data)
        ProductWizardPage.validateNamesAndDescription('credit', 'commercialLending', 'row3', data)
        ProductWizardPage.validateNamesAndDescription('credit', 'commercialLending', 'row4', data)
        ProductWizardPage.validateNamesAndDescription('credit', 'commercialLending', 'row5', data)
    })

})

describe("Deposit category with category types and its product details should be displayed", () => {

    it("Deposit category type should be displayed", () => {
        ProductWizardPage.validateProductName('deposit', data)
        ProductWizardPage.selectCategoryType('deposit', data)
    })

    it("Deposit category should be displayed", () => {
        ProductWizardPage.validateProductCategory('deposit', 'deposit', data)
    })

    it("Deposit category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('deposit', 'deposit', data)
        ProductWizardPage.validateNamesAndDescription('deposit', 'deposit', 'row1', data)
    })

})