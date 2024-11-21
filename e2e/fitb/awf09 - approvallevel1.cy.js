import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/dealData.json'


const username = Cypress.env('approverL1')
const password = Cypress.env('password')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const searchVal = dealData.awfDraftDealIndicative1 // Deal for Approver Approved


before(() => {
    cy.login(username, password)
    cy.get('.dropdown').click()
    cy.get('#clr-id-1').click()
    TopMenuPage.searchValue(searchVal)
    TopMenuPage.clickDealTab()
    TopMenuPage.selectTableExactVal(searchVal)
    ApprovalPage.navigateToApproval()

})

describe('Approve Approver L1', () => {
    let comments = 'L1 Approved'

    it('Deal will transition to Level1 Approval', () => {
        ApprovalPage.verifyDealL1Status()
        ApprovalPage.clickOnApproveBtn()
        ApprovalPage.approverApproveDeal(comments)
        
    })
    
    it('Check icon will be displayed beside the approver name', () => {
        ApprovalPage.validatingCheckIcon()
    })

    it('Action history should be updated', () => {
        ApprovalPage.validateActionHistory(comments)

    })
})