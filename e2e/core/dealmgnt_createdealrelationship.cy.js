import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import ProductPage from '../../pageObjects/ProductPage'
import dayjs from 'dayjs'

const dateNow = dayjs().unix()
const newDealName = "Relationship Deal" + dateNow // Terminate at Approved
const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = Cypress.env('search_relationship')
const prdName = Cypress.env('prdName')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')

before(() => {
    cy.login(username, password)
    
})


describe('Create deal for a relationship', () => {
   
    it('Search for an existing relationship and select the relationship from search results', () => {
        TopMenuPage.searchValue(searchVal)
        TopMenuPage.selectTableValue(searchVal)
        TopMenuPage.verifySearch(searchVal)
        
        
    })
    it('Add deal under relationship and select a product on deal wizard', () => {
        TopMenuPage.addDeal()
        ClientWizardPage.enterDealName(newDealName)
        ClientWizardPage.clickNext()
        ProductWizardPage.selectProduct(prdName)
        ProductWizardPage.createDeal()
    })
    it('Validate the inherited fields', () => {
        ProductPage.verifyRelationshipName(testEnv)
        ProductPage.verifyErrorMessage('Please fill in all mandatory fields to proceed.')
    })
    it('Input field values and save the deal', () => {
        ProductPage.enterMandatoryFields(testEnv, prdName)
    })

})