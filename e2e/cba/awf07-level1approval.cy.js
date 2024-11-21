import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/cba_qa/dealData.json'


const dealName = dealData.awfPendingDeal // select deal for approval
const username = Cypress.env('approverL1')
const password = Cypress.env('password')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')



before(() => {
    cy.login(username, password)
    TopMenuPage.searchValue(dealName)
    TopMenuPage.clickDealTab()
    TopMenuPage.selectTableValue(dealName)
    ApprovalPage.navigateToApproval()

})

describe('Approve Approver L1', () => {
    let comments = 'L1 Approver - ' + username + ' Approved the deal'

    it('Deal will transition to Level1 Approval', () => {
        ApprovalPage.verifyDealL1Status()
        ApprovalPage.approveDirectly(comments)
        
    })
    
    it('Check icon will be displayed beside the approver name', () => {
        ApprovalPage.validatingCheckIcon()
    })

    it('Action history should be updated', () => {
        ApprovalPage.validateActionHistory(comments)

    })
})