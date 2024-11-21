import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/dealData.json'


const username = Cypress.env('approverL2')
const password = Cypress.env('password')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const searchVal = dealData.awfDraftDealIndicative1 // Deal for Approver Approved



describe('Approve Approver L2', () => {
    
    before(() => {
        cy.login(username, password)
        TopMenuPage.searchValue(searchVal)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableExactVal(searchVal)
        ApprovalPage.navigateToApproval()
    
    })

    let comments = 'L2 Appproved'

    it('Deal will transition to Level2 Approval', () => {
        ApprovalPage.enterStatusComments(comments)
        ApprovalPage.clickOnApproveBtn()
    })
    
    it('Check icon will be displayed beside the approver name', () => {
        ApprovalPage.validatingCheckIcon()
    })

    it('Action history should be updated', () => {
        ApprovalPage.validateApprovedStatus()
        ApprovalPage.validateActionHistory(comments)

    })
})