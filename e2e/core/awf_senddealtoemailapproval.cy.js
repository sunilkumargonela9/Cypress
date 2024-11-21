import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'


const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = Cypress.env('emailapprovaldeal') // Deal for Email Approval
const approverL1 = Cypress.env('approverL1') 
const approverL2 = Cypress.env('approverL2') 




// Script still pending completion
// before(() => {
//     cy.login(username, password)
//     TopMenuPage.searchValue(searchVal)
//     TopMenuPage.selectTableValue(searchVal)
//     ApprovalPage.navigateToApproval()
//     ApprovalPage.modifyDeal() 
//     ApprovalPage.navigateToApproval()

// })



describe.skip('Send Deal to L1 Approval', () => { 
    it('Send Deal to Indicative', () => { // To be enabled upon completion of script
        ApprovalPage.sendDealToIndicative()
        ApprovalPage.confirmMoveDraftToIndicative()
    })

    it('Send Deal to L1 Approval', () => {
        ApprovalPage.selectL1Approver(approverL1)
        ApprovalPage.selectL2Approver(approverL2)
        ApprovalPage.sendToApproval()
    })

})