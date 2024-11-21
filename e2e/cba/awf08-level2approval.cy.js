import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/cba_qa/dealData.json'


const username = Cypress.env('approverL2')
const password = Cypress.env('password')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')

const dealName = dealData.awfPendingDeal // select deal for approval



describe('Approve Approver L2', () => {
    
    before(() => {
        cy.login(username, password)
        TopMenuPage.searchValue(dealName)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(dealName)
        ApprovalPage.navigateToApproval()
    
    })

    let comments = 'L2 Approver - ' + username + ' Approve the deal'

    it('Deal will transition to Level2 Approval', () => {
        ApprovalPage.approveDirectly(comments)
    })
    
    it('Check icon will be displayed beside the approver name', () => {
        ApprovalPage.validatingCheckIcon()
    })

    it('Action history should be updated', () => {
        ApprovalPage.validateApprovedStatus()
        ApprovalPage.validateActionHistory(comments)

    })
})