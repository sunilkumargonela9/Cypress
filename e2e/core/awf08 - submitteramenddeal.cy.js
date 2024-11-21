import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/dealData.json'
import PricingPage from '../../pageObjects/PricingPage'


const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = dealData.awfDraftDealIndicative1 // Deal for Indicative to Pending Approval
const prdName = Cypress.env('prdName')
const newName = 'Term Loan Amend'
const approverL1 = Cypress.env('approverL1')
const approverL2 = Cypress.env('approverL2')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')


before(() => {
    cy.login(username, password)
    TopMenuPage.searchValue(searchVal)
    TopMenuPage.clickDealTab()
    TopMenuPage.selectTableValue(searchVal)
})


describe('User should be able to update the deal', () => {
    it('User should be able to modify the deal and send to Indicative', () => {
        PricingPage.selectProduct(prdName)
        PricingPage.selectProductName(newName)
        PricingPage.ClickOnCalcPlusSaveBtn()
        PricingPage.ClickOnNextbtn()
        ApprovalPage.confirmMoveDraftToIndicative()
        ApprovalPage.navigateToApproval()
        ApprovalPage.validatingIndicative()
    })
    
});


describe('User should be able to send back the deal for Approval', () => {
    
    it('User should select approver again before sending for Approval ', () => {
        ApprovalPage.navigateToApproval()
        ApprovalPage.selectL1Approver(approverL1)
        ApprovalPage.selectL2Approver(approverL2)
        ApprovalPage.sendToApproval()
    });

});










