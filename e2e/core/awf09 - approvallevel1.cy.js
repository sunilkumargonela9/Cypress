import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/dealData.json'
import EmailPage from '../../pageObjects/EmailPage'


const username = Cypress.env('approverL1')
const password = Cypress.env('password')
const searchVal = dealData.awfDraftDealIndicative1 // Deal for Approver Approved


before(() => {
    //Clear L1 Approval Email
    // EmailPage.deleteAllMessage()
    // EmailPage.clearEmailData()
    cy.login(username, password)
    TopMenuPage.searchValue(searchVal)
    TopMenuPage.clickDealTab()
    TopMenuPage.selectTableValue(searchVal)
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

