import ApiPage from '../../pageObjects/ApiPage'
import dealData from '../../fixtures/cba_qa/dealData.json'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'


const username = Cypress.env('username')
const password = Cypress.env('password')
const testEnv = Cypress.env('testEnv')
const esgUrl = Cypress.env('esgurl')
const dealName = dealData.awfPendingDeal // Deal for Indicative to Pending Approval


beforeEach(() => {
    cy.login(username, password)
    TopMenuPage.searchValue(dealName)
    TopMenuPage.clickDealTab()
    TopMenuPage.selectTableValue(dealName)
    cy.log(dealName)
    cy.getDealId()
});

describe ('ESG API Login and Approval', () => {
    it('Login to ESG via API and Approve the deal', () => {
        cy.apiEsgLogin(esgUrl)
        ApiPage.updateStartAssessmentBody()
        ApiPage.postStartAssessment(esgUrl)
        ApiPage.postApprovalInfoESG()
        ApiPage.postApproveESG()
    })
    it('ESG link on Approval page should have a green check icon', () => {
        ApprovalPage.navigateToApproval()
        ApprovalPage.verifyEsgCheckIcon()
    });
})
