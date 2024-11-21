import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/dealData.json'

const username = Cypress.env('username')
const password = Cypress.env('password')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const approvalDeal1 = dealData.awfSelfApprove
const approvalDeal2 = dealData.awfSelfApproveNpw



describe('Submitter Self Approve Indicative', () => {

    it('User should be able to navigate to the Pricing Tab after clicking the Calc button', () => {
        cy.login(username, password)
        TopMenuPage.searchValue(approvalDeal1)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(approvalDeal1)
        ApprovalPage.navigateToApproval()
        ApprovalPage.selectCalc()
        ApprovalPage.verifyPricingTab()
    });

    it('User should be able to send the deal for approval by clicking the submit button', () => {
        ApprovalPage.navigateToApproval()
        ApprovalPage.addCommentaryDetails()
        ApprovalPage.sendToApproval()
    });


    it('User should be able to finalise the deal by clicking the Book button ', () => {
        ApprovalPage.clickOnBookBtn()
    })


    //Need to fix this in Global QA
    it.skip('When the “Book” button is clicked, the application will require an Outer Product ID ', () => {
        ApprovalPage.giveOuterProductId()
        
    })

})

describe('User should be able to send the deal to NPW status', () => {

    let comments = 'Send Deal to Npw'

    before(() => {
        cy.login(username, password)
        TopMenuPage.searchValue(approvalDeal2)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(approvalDeal2)
        ApprovalPage.navigateToApproval()
    });

    it('User should be able to enter the reason & send the deal for NPW status ', () => {
        ApprovalPage.addCommentaryDetails()
        ApprovalPage.npwDeal()
        ApprovalPage.enternpwComments(comments)
        ApprovalPage.validateNpwStatus()
    });

    it('Action history should be updated to include User Comments when user send deal to NPW status', () => {
        ApprovalPage.validateActionHistory(comments)
    });



})