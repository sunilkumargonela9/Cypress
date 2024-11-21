import TopMenuPage from '../../pageObjects/TopMenuPage'
import PricingPage from '../../pageObjects/PricingPage'
import RelationshipIncomePage from '../../pageObjects/RelationshipIncomePage'
import * as data from "../../fixtures/relationshipIncomeData.json"


const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = Cypress.env('importedRelationship')
const clientlength = "3"


before(() => {
    cy.login(username, password)
})


describe('Relationship Income - Data Import', () => {
   
    it('Search for an imported data relationship and select the relationship from search results', () => {
        TopMenuPage.searchValue(searchVal)
        TopMenuPage.selectTableValue(searchVal)
        PricingPage.verifyRelationshipName(searchVal) 
        TopMenuPage.verifySearch(searchVal)
    })

    it('Navigate to Relationship Income Page', () => {
        RelationshipIncomePage.clickRelationshipIncomeTab()
    })

    it('Validate Titles', () => {
        RelationshipIncomePage.validateTotalRevenueTitle()
        RelationshipIncomePage.validateCreditRevenueTitle()
        RelationshipIncomePage.validateDepositRevenueTitle()
    })

    it('Validate Title Values', () => {
        RelationshipIncomePage.writeTitleValues()
        RelationshipIncomePage.validateTitleValues()
    })

    it('Total revenue for Forecast should be correct', () => {
        RelationshipIncomePage.validateCategories()
        RelationshipIncomePage.validateForecastRevenue()
        RelationshipIncomePage.validateTotalForecastRevenue()
    })

    it('Total Forecast Revenue should be equal to Total Revenue', () => {
        RelationshipIncomePage.validateForecastTotalRevenueEqualTitleTotalRevenue()
    })

    it('The number of products should be correct', () => {
        RelationshipIncomePage.writeListOfProducts()
        RelationshipIncomePage.validateListOfProducts(data.totalproducts)
    })

    it('The number of products for category commercial Lending should be correct', () => {
        RelationshipIncomePage.writeCommercialLendingProducts()
        RelationshipIncomePage.validateCommercialLendingProducts(data.CommercialLendingProducts)
    })

    it('The number of products for category deposit should be correct', () => {
        RelationshipIncomePage.writeDepositProducts()
        RelationshipIncomePage.validateDepositProducts(data.DepositProducts)
    })

    it('The number of imported clients should be correct', () => {
        RelationshipIncomePage.validateListOfClients(clientlength)
        RelationshipIncomePage.clickRelationshipIncomeTab()
    })


})