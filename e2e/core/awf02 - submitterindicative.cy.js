import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/dealData.json'
import EmailPage from '../../pageObjects/EmailPage'

const username = Cypress.env('username')
const password = Cypress.env('password')
const approverL1 = Cypress.env('approverL1')
const approverL2 = Cypress.env('approverL2')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const deal1 = dealData.awfDraftDealIndicative1 // Deal for Indicative to Pending Approval
const deal2 = dealData.awfDraftDealIndicative2 // Deal for Indicative to NPW

describe('Submitter Indicative', () => {    
    before(() => {
        cy.login(username, password)
        TopMenuPage.searchValue(deal1)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(deal1)
        ApprovalPage.navigateToApproval()    
    });


    it('User should be able to navigate to the Pricing Tab after clicking the Calc button ', () => {
        ApprovalPage.selectCalc()
        ApprovalPage.verifyPricingTab()
    });

    it('Error message is displayed when user submit deal without selecting the approvers', () => {
        ApprovalPage.navigateToApproval()
        ApprovalPage.addCommentaryDetails()
        ApprovalPage.sendToApproval()
        ApprovalPage.validatingAlert('Missing Approvers in Roles')
        ApprovalPage.closingAlertPopup()

    });

})

describe('User should be able to send the deal to NPW status', () => {
    
    let comments = 'Send Deal to Npw'
    
    before(() => {
        cy.login(username, password)
        TopMenuPage.searchValue(deal2)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(deal2)
        ApprovalPage.navigateToApproval()
    });
    
    it('User should be able to enter the reason & send the deal for NPW status ', () => {
        ApprovalPage.addCommentaryDetails()
        ApprovalPage.npwDeal()
        ApprovalPage.enternpwComments(comments)
        ApprovalPage.validateNpwStatus()
    })

    it('Action history should be updated to include User Comments when user send deal to NPW status', () => {
        ApprovalPage.validateActionHistory(comments) 
    });

})


describe('User should be able to send the deal to Pending Approval status', () => {

    let comments = 'Send Deal to Pending Approval'
    
    before(() => {
        TopMenuPage.searchValue(deal1)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(deal1)
        ApprovalPage.navigateToApproval()
    });

    it('User should able to select Approvers', () => {
        ApprovalPage.selectL1Approver(approverL1)
        ApprovalPage.selectL2Approver(approverL2)
    });

    it('User should be able to add a message the can be sent to the approver', () => {   
        ApprovalPage.enterStatusComments(comments)
    });

    it('User should be able to send the deal for approval by clicking the submit button', () => {
        ApprovalPage.sendToApproval()
    });
    
})

describe.skip('Approver Should be able to Received notification email', () => {
    it('Check Approval Email', () => {
        EmailPage.getEmailData(approverL1)
    });
    
    it('Check Subject', () => {
            EmailPage.verifySubject('DPX Deal Pricing Requested')
        });
    
    it('Check Attachment', () => {
        EmailPage.checkAttachment()
    });
        
});






