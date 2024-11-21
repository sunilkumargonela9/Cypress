import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import ProductPage from '../../pageObjects/ProductPage'
import PricingPage from '../../pageObjects/PricingPage'
import products from '../../fixtures/cba_qa/products.json'




const username = Cypress.env('username')
const password = Cypress.env('password')
const searchRel = Cypress.env('search_relationship')
const typeVal = Cypress.env('search_type')
const prdName = Cypress.env('prdName')
const clientName = Cypress.env('search_client')
const catVal = Cypress.env('Search_category')
const testEnv = Cypress.env('testEnv')
const relationshipName = ''

before(() => {
    cy.login(username, password)
})


describe('Create deal for a Client', () => {
   
    it('Search for an existing relationship and select the relationship from search results', () => {
        TopMenuPage.searchValue(searchRel)
        TopMenuPage.selectTableValue(searchRel)
        PricingPage.verifyRelationshipName(searchRel) 
        
        TopMenuPage.verifySearch(searchRel)
    })
    it('Add deal for a client and select a product on deal wizard', () => {
        TopMenuPage.addDeal()
        ClientWizardPage.selectClient(clientName)
        ClientWizardPage.clickNext()
        ProductWizardPage.selectProductType(typeVal)
        ProductWizardPage.selectProductCat(catVal)
        ProductWizardPage.selectProduct(prdName)
        ProductWizardPage.createDeal()
    })
    it('Validate the inherited fields', () => {
        ProductPage.verifyClientName(testEnv)
        ProductPage.verifyErrorMessage('Please fill in all mandatory fields to proceed.')
    })
    it('Input field values and save the deal', () => {
        
        ProductPage.enterMandatoryFields(testEnv, prdName )
    })

})