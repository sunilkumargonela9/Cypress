import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/dealData.json'
import PricingPage from '../../pageObjects/PricingPage'


const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = dealData.awfDraftDealIndicative1 // Deal for Indicative to Pending Approval
const prdName = Cypress.env('prdName')
const newName = 'Term Loan 1'
const approverL1 = Cypress.env('approverL1')
const approverL2 = Cypress.env('approverL2')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')



before(() => {
    cy.login(username, password)
    TopMenuPage.searchValue(searchVal)
    TopMenuPage.clickDealTab()
    TopMenuPage.selectTableExactVal(searchVal)
    ApprovalPage.navigateToApproval()

})

describe('Submitter Pending Approval', () => {
    it('Deal should be in Level 1 approval status as indicated by a blue circle', () => {
        ApprovalPage.verifyDealL1Status()
    })

    it('Hourglass icon is displayed besides the approvers name', () => {
        ApprovalPage.verifyHourglassIcon()
    })
})


describe('User should be able to send the deal to Withdraw status', () => {

    let comments = 'Send Deal to Withdraw'

    it('User should be able to enter the reason & send the deal for Withdraw status ', () => {
        
        ApprovalPage.withdrawDeal(comments)
        ApprovalPage.validateDraftStatus()
    })

    it('Action history should be updated to include User Comments when user send deal to Withdraw status', () => {
        ApprovalPage.validateActionHistory(comments) 
    });



})

describe('User should be able to update the deal', () => {
    it('User should be able to modify the deal and send to Indicative', () => {
        ApprovalPage.navigateToPricing()
        PricingPage.selectProduct(prdName)
        PricingPage.selectProductName(newName)
        PricingPage.ClickOnCalcPlusSaveBtn()
        PricingPage.ClickOnNextbtn()
        ApprovalPage.confirmToMoveDraftToIndicative()
        ApprovalPage.navigateToApproval()
        ApprovalPage.validatingIndicative()
    })
    
});


describe('User should be able to send back the deal for Approval', () => {
    
    let comments = 'Sending For Approval'
    it('User should select approver again before sending for Approval ', () => {
        ApprovalPage.navigateToApproval()
        ApprovalPage.enterStatusComments(comments)
        ApprovalPage.selectL1Approver(approverL1)
        ApprovalPage.selectL2Approver(approverL2)
        ApprovalPage.sendToApproval()
    });

    
});









