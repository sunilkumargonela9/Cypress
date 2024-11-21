import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/cba_qa/dealData.json'
import PricingPage from '../../pageObjects/PricingPage'


const username = Cypress.env('username')
const password = Cypress.env('password')
const approverL1 = Cypress.env('approverL1')
const approverL2 = Cypress.env('approverL2')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const product=Cypress.env('awfProduct')
const newProduct = 'New Product'
const deal1 = dealData.awfPendingDeal // Deal for Indicative to Pending Approval
const deal2 = dealData.awfWorkflowAdminDeal // Deal for Indicative to WorkflowAdmin Approval

before(() => {
    cy.login(username, password)
})

describe(`User should be able to send the deal - ${deal1} to Pending Approval status`, () => {

    let comments = 'Send Deal - ' + deal1 + ' to Pending Approval'
    it('search the deal and navigate to Approval tab', () =>{
        TopMenuPage.searchValue(deal1)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(deal1)
        ApprovalPage.navigateToApproval()
    })
    

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

describe('Verify the deal in pending Approval status', () => {
    it('Deal should be in Level 1 approval status as indicated by a blue circle', () => {
        ApprovalPage.verifyDealL1Status()
    })

    it('Hourglass icon is displayed besides the approvers name', () => {
        ApprovalPage.verifyHourglassIcon()
    })
})


describe('User should be able to Withdraw the deal in Pending approval', () => {

    let comments = 'Withdraw the automation Deal to resubmit'
    
    it('User should be able to Withdraw the deal from pending approval', () => {
        ApprovalPage.withdrawDeal(comments)
    })


})

describe('User should be able to update the deal after withdraw', () => {
    it('User should be able to modify the deal', () => {
        PricingPage.clickOnPricingTab()
        PricingPage.selectProduct(product)
        PricingPage.selectProductName(newProduct)
        PricingPage.ClickOnCalcPlusSaveBtn()
        PricingPage.ClickOnNextbtn()
        ApprovalPage.validatingIndicative()
    })
    
});


describe('User should be able to send back the deal for Approval', () => {
    
    let comments = 'Resubmit the deal for Approval'
    it('User should select approver again before sending for Approval ', () => {
        ApprovalPage.navigateToApproval()
        ApprovalPage.enterStatusComments(comments)
        ApprovalPage.selectL1Approver(approverL1)
        ApprovalPage.selectL2Approver(approverL2)
        ApprovalPage.sendToApproval()
    });

    
});


describe(`User should be able to send the deal - ${deal2} to Maker and Checker for Approval`, () => {
    let comments = 'Send Deal - ' + deal2 + ' to Pending Approval'
    it('Select the deal and navigate to approval tab', () => {
   
    TopMenuPage.searchValue(deal2)
    TopMenuPage.clickDealTab()
     cy.wait(1000)
     TopMenuPage.selectTableValue(deal2)
     ApprovalPage.navigateToApproval() 
    })
    it('Submit the deal for approval', () => {
        ApprovalPage.enterStatusComments(comments)
        ApprovalPage.sendToApproval()
    })
})








