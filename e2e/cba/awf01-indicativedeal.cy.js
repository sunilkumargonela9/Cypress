import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/cba_qa/dealData.json'

const username = Cypress.env('username')
const password = Cypress.env('password')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const deal1 = dealData.awfPendingDeal // Deal for Indicative to Pending Approval
const deal2 = dealData.awfWorkflowAdminDeal // Deal for Indicative to WorkflowAdmin Approval

describe('Submitter  Indicative', () => {    
    before(() => {
        cy.login(username, password)
        TopMenuPage.searchValue(deal1)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(deal1)
        ApprovalPage.navigateToApproval()    
    });

    it('Error message is displayed when user submit deal without selecting the approvers', () => {
       // ApprovalPage.navigateToApproval()
       ApprovalPage.sendDealToIndicative()
       ApprovalPage.confirmMoveDraftToIndicative()
        ApprovalPage.sendToApproval()
        ApprovalPage.validatingAlert('Missing Approvers in Roles')
        ApprovalPage.closingAlertPopup()

    });

})

describe('Submitter Indicative', () => {    
    before(() => {
        cy.login(username, password)
        TopMenuPage.searchValue(deal2)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(deal2)
        ApprovalPage.navigateToApproval()    
    });


    it('Error message is displayed when user submit deal without selecting the approvers', () => {
        ApprovalPage.sendDealToIndicative()
       ApprovalPage.confirmMoveDraftToIndicative()        
    });

})




