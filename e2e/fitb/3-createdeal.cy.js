import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import ProductPage from '../../pageObjects/ProductPage'
import PricingPage from '../../pageObjects/PricingPage'
import clientDealData from '../../fixtures/fitb_qa/clientDealData.json'
import dayjs from 'dayjs'

const dateNow = dayjs().unix()
const searchVal = Cypress.env('search_relationship')
const newDealName = searchVal+ " Deal " + dateNow 
const username = Cypress.env('username')
const password = Cypress.env('password')
const prdName = Cypress.env('prdName')
const clientName = Cypress.env('search_client')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const dealName = Cypress.env('search_deal') 
const createNewDeal = clientDealData.createDealNew



before(() => {
    cy.login(username, password)
})


describe('Create deal for a Client', () => {
   
    it('Search for an existing relationship and select the relationship from search results', () => {

        TopMenuPage.searchValue(searchVal)
        TopMenuPage.dealTestDataExist(dealName)
        TopMenuPage.clickRelationshipTab()
        TopMenuPage.selectTableExactVal(searchVal)
        PricingPage.verifyRelationshipName(searchVal) 
        TopMenuPage.verifySearch(searchVal)
        
    })
    it('Add deal for a client and select a product on deal wizard', () => {
        TopMenuPage.addDeal()

        if (createNewDeal =="No") {
            ClientWizardPage.enterDealName(newDealName)
        } else {
            ClientWizardPage.enterDealName(dealName)
        }
        
        ClientWizardPage.selectClient(clientName)
        ClientWizardPage.clickNext()
        ProductWizardPage.selectProduct(prdName)
        ProductWizardPage.createDeal()
    })
    it('Validate the inherited fields', () => {
        ProductPage.verifyClientName(testEnv,clientName)
        ProductPage.verifyErrorMessage('Please fill in all mandatory fields to proceed.')
    })

    it('Input field values and save the deal', () => {
        ProductPage.enterMandatoryFields(testEnv, prdName)
    })

})