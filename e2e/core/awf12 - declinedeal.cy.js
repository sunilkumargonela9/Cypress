import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/dealData.json'


const approver = Cypress.env('approverL1')
const username = Cypress.env('username')
const password = Cypress.env('password')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const searchVal = dealData.declineDeal1 // Deal for Indicative to Pending Approval
const comments = 'Deal Decline'


describe('Approver Decline', () => {
    it('Approver should be able to Decline a Deal', () => {
        cy.login(approver, password)
        TopMenuPage.searchValue(searchVal)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(searchVal)
        ApprovalPage.navigateToApproval()
        ApprovalPage.clickOnDropDownBtn()
        ApprovalPage.declineDeal(comments)
    })

    it('Deal status should be in Declined state', () => {
        ApprovalPage.ValidateDeclinedStatus()
    })

})


describe('Deal Status after Decline as seen by Submitter', () => {
    
    before(() => {
        cy.login(username, password)
        TopMenuPage.searchValue(searchVal)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(searchVal)
        ApprovalPage.navigateToApproval()
        
    });

    
    it('Deal status should be in Declined state', () => {
        ApprovalPage.ValidateDeclinedStatus()
    })

    it('User should know when the deal was declined', () => {
        ApprovalPage.validatingStatus()
    })

    it('Action history should be updated', () => {
        ApprovalPage.validateActionHistory(comments)
    })
})
