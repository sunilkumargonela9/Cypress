import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import ProductPage from '../../pageObjects/ProductPage'
import PricingPage from '../../pageObjects/PricingPage'
import dayjs from 'dayjs'



const dateNow = dayjs().unix()
const autodeal = "AutomationDeal" + dateNow //Deal name for Deal creation
const username = Cypress.env('username')
const password = Cypress.env('password')
const searchRel = Cypress.env('search_relationship')
const prdName = Cypress.env('prdName')
const catVal = Cypress.env('Search_category')
const testEnv = Cypress.env('testEnv')
const relationshipName = ''
const clientName = Cypress.env('search_client')

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
        ClientWizardPage.enterDealName(autodeal)
        ClientWizardPage.selectClient(clientName)
        ClientWizardPage.clickNext()
        ProductWizardPage.selectProductCat(catVal)
        ProductWizardPage.selectProduct(prdName)
        ProductWizardPage.createDeal()
    })
    it('Validate the inherited fields', () => {
        ProductPage.verifyInheritedFields(testEnv,clientName)
        ProductPage.verifyErrorMessage('Please fill in all mandatory fields to proceed.')
    })
    it('Input field values and save the deal', () => {
        ProductPage.enterMandatoryFields(testEnv, prdName )
    })

})