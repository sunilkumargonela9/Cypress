import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import ProductPage from '../../pageObjects/ProductPage'
import PricingPage from '../../pageObjects/PricingPage'
import dayjs from 'dayjs'
import * as product from'../../fixtures/mqg_qa/config_productwizard.json'

const dateNow = dayjs().unix()
const newDealName = "Client Deal" + dateNow // Terminate at Approved
const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = Cypress.env('search_relationship')
const prdName = Cypress.env('prdName4')
const clientName = Cypress.env('search_client')
const testEnv= Cypress.env('testEnv')


before(() => {
    cy.login(username, password)
})

describe('Create deal for a Client', () => {
   
    it('Search for an existing relationship and select the relationship from search results', () => {
        TopMenuPage.searchValue(searchVal)
        TopMenuPage.selectTableValue(searchVal)
        PricingPage.verifyRelationshipName(searchVal) 
        TopMenuPage.verifySearch(searchVal)
    })
    it('Add deal for a client and select a product on deal wizard', () => {
        TopMenuPage.addDeal()
        ClientWizardPage.selectClient(clientName)
        ClientWizardPage.clickNext()
        ProductWizardPage.selectCategoryType('lending',product)
        ProductWizardPage.selectProduct(prdName)
        ProductWizardPage.createDeal()
    })
    it('Validate the inherited fields', () => {
        ProductPage.verifyErrorMessage('Please fill in all mandatory fields to proceed.')
    })
    it('Input field values and save the deal', () => {
        ProductPage.enterMandatoryFields(testEnv, prdName)
    })
})