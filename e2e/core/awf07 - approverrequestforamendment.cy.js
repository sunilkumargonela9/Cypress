import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/dealData.json'
import TopMenuPage from '../../pageObjects/TopMenuPage'



const password = Cypress.env('password')
const approverL1 = Cypress.env('approverL1')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const dealName = dealData.awfDraftDealIndicative1 // Deal for Indicative to Pending Approval
    


before(() => {
    cy.login(approverL1, password)
    TopMenuPage.searchValue(dealName)
    TopMenuPage.clickDealTab()
    TopMenuPage.selectTableValue(dealName)
    TopMenuPage.verifySearch(dealName)
    ApprovalPage.navigateToApproval()
});

describe('User should be able to send the deal back to Submitter for Amendment', () => {
    let comments = "Send deal for Amendment"
    it('User should be to click the Amendmend button', () => {
        ApprovalPage.approverSendDealToAmend(comments)

    });

    it('Action history should be updated to include User Comments when user send deal to NPW status', () => {
        ApprovalPage.validateActionHistory(comments) 
    });

    it('Deal status should be back to Draft', () => {
        ApprovalPage.validateDraftStatus()
    });

})





