import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/dealData.json'
import EmailPage from '../../pageObjects/EmailPage'



const username = Cypress.env('approverL2')
const password = Cypress.env('password')
const searchVal = dealData.awfDraftDealIndicative1 // Deal for Approver Approved


describe.skip('Approver Should be able to Received notification email', () => {
    it('Check Approval Email', () => {
        EmailPage.getEmailData(username)
    });
    
    it('Check Subject', () => {
            EmailPage.verifySubject('DPX Deal Pricing Requested')
        });
    
    it('Check Attachment', () => {
        EmailPage.checkAttachment()
    });
        
});

describe('Approve Approver L2', () => {
    
    before(() => {
        cy.login(username, password)
        TopMenuPage.searchValue(searchVal)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(searchVal)
        ApprovalPage.navigateToApproval()
    
    })

    let comments = 'L2 Appproved'

    it('Deal will transition to Level2 Approval', () => {
        ApprovalPage.clickOnApproveBtn()
        ApprovalPage.approverApproveDeal(comments)
    })
    
    it('Check icon will be displayed beside the approver name', () => {
        ApprovalPage.validatingCheckIcon()
    })

    it('Action history should be updated', () => {
        ApprovalPage.validateApprovedStatus()
        ApprovalPage.validateActionHistory(comments)

    })
})