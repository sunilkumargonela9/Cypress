import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/cba_qa/dealData.json'
import TopMenuPage from '../../pageObjects/TopMenuPage'



const dealName = dealData.awfPendingDeal // select deal for approval
const username = Cypress.env('username')
const password = Cypress.env('password')
const approverL1 = Cypress.env('approverL1')
const approverL2 = Cypress.env('approverL2')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')

before(() => {
    cy.login(approverL1, password)
    TopMenuPage.searchValue(dealName)
    TopMenuPage.clickDealTab()
    TopMenuPage.selectTableValue(dealName)
    TopMenuPage.verifySearch(dealName)
    ApprovalPage.navigateToApproval()
});

describe('Approver should be able to decline the deal for Amendment', () => {
    let comments = "Decline the deal for resubmission"
    it('Approver should be able to click the Decline button', () => {
        ApprovalPage.clickOnDeclineBtn()
        ApprovalPage.declineDeal(comments)

    });

    it('Action history should be updated to include User Comments when user declines the deal', () => {
        ApprovalPage.validateActionHistory(comments) 
    });

    it('Deal status should be back to Indicative', () => {
        ApprovalPage.validateIndicativeStatus()
    });

})

describe('User should submit the deal for approval after Decline action', () => {
    let comments = "Resubmit the deal after Decline action"
    it('login as user and search for the declined deal', () => {
        cy.login(username, password)
        TopMenuPage.searchValue(dealName)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(dealName)
        TopMenuPage.verifySearch(dealName)
        ApprovalPage.navigateToApproval()
    })
    it('select approvers and resubmit the deal for approval', () => {
        ApprovalPage.selectL1Approver(approverL1)
        ApprovalPage.selectL2Approver(approverL2)
        ApprovalPage.enterStatusComments(comments)
        ApprovalPage.sendToApproval()
        ApprovalPage.verifyDealL1Status()
        ApprovalPage.verifyHourglassIcon()
    }) 

})





