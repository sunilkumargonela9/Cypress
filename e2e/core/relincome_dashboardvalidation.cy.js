import TopMenuPage from '../../pageObjects/TopMenuPage'
import PricingPage from '../../pageObjects/PricingPage'
import RelationshipIncomePage from '../../pageObjects/RelationshipIncomePage'
import DashboardPage from '../../pageObjects/DashboardPage'



const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = Cypress.env('importedRelationship')


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

    it('write Relationship Income Total revenue and ROE YTD Historical Data', () => {
        RelationshipIncomePage.writeYTDTotalHistoricalRevenue()
        RelationshipIncomePage.writeYTDTotalHistoricalROE()
    })

    it('Dashboard YTD total revenue & Roe should be correct', () => {
        DashboardPage.clickOnDashboardTab()
        DashboardPage.validateYTDTotalRevenueTitle()
        DashboardPage.validateYTDTotalRevenueValue()
        DashboardPage.validateYTDTotalRoeTitle()
        DashboardPage.validateYTDTotalRoeValue()
    })

    it('write Relationship Income Credit, Deposit & Service revenue YTD Historical Data', () => {
        RelationshipIncomePage.clickRelationshipIncomeTab()
        RelationshipIncomePage.writeYTDCreditHistoricalRevenue()
        RelationshipIncomePage.writeYTDDepositHistoricalRevenue()
        RelationshipIncomePage.writeYTDServiceHistoricalRevenue()
    })
    
    it('Dashboard YTD Credit,Deposit & Service revenue should be correct', () => {
        DashboardPage.clickOnDashboardTab()
        DashboardPage.validateCategoryTitles()
        DashboardPage.validateCreditRevenueValue()
        DashboardPage.validateDepositRevenueValue()
        DashboardPage.validateServiceRevenueValue()
    })
})