import TopMenuPage from '../../pageObjects/TopMenuPage'
import PricingPage from '../../pageObjects/PricingPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dayjs from 'dayjs'

const username = Cypress.env('username')
const password = Cypress.env('password')
const awfTestDataDraft = Cypress.env('awfTestDataDraft')
const awfSelfApprove = Cypress.env('selfApproveDeal')
const dateNow = dayjs().unix()
const approverL1 = Cypress.env('approverL1')
const approverL2 = Cypress.env('approverL2')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const dealNameIndicative1 = "awfApproved" + dateNow // Terminate at Approved
const dealNameIndicative2 = "awfNpw" + dateNow // Terminate at NPW
const selfApproveDeal = "awfSelfApproved" + dateNow// Terminate at Self Approved
const selfApproveDealNPW = "awfSelfNpw" + dateNow // Terminate at Self NPW
const declineDeal = "awfDecline" + dateNow // Deal for Decline


beforeEach(() => {
    cy.login(username, password)
});

afterEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
});


describe('Create Test Data', () => {
    it('Create AWF Test Data For Draft to Indicative to Pending Approval', () => {        
        TopMenuPage.searchValue(awfTestDataDraft) // Select Deal to be used in testing
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableExactVal(awfTestDataDraft)
        TopMenuPage.verifySearch(awfTestDataDraft)
        PricingPage.copyTestData(dealNameIndicative1)
    });

    it('Create AWF Test Data For Draft to Indicative to NPW', () => {
        TopMenuPage.searchValue(awfTestDataDraft) // Select Deal to be used in testing
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableExactVal(awfTestDataDraft,)
        TopMenuPage.verifySearch(awfTestDataDraft)
        PricingPage.copyTestData(dealNameIndicative2)
        ApprovalPage.navigateToApproval()
        ApprovalPage.sendDealToIndicative()
        

        
    });

    it('Create AWF Test Data For Draft to Self approve', () => {        
        TopMenuPage.searchValue(awfSelfApprove) // Select Deal to be used in testing
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableExactVal(awfSelfApprove,)
        TopMenuPage.verifySearch(awfSelfApprove)
        PricingPage.copyTestData(selfApproveDeal)
    });

    it('Create AWF Test Data For Draft to Self approve to NPW', () => {      
        TopMenuPage.searchValue(awfSelfApprove) // Select Deal to be used in testing
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableExactVal(awfSelfApprove)
        TopMenuPage.verifySearch(awfSelfApprove)
        PricingPage.copyTestData(selfApproveDealNPW)
        ApprovalPage.navigateToApproval()
        ApprovalPage.sendDealToIndicative()

    });

    it('Create AWF Test Data For Draft to Indicative to Decline', () => {

        
        TopMenuPage.searchValue(awfTestDataDraft) // Select Deal to be used in testing
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableExactVal(awfTestDataDraft)
        TopMenuPage.verifySearch(awfTestDataDraft)
        PricingPage.copyTestData(declineDeal)
        ApprovalPage.navigateToApproval()
        ApprovalPage.sendDealToIndicative()
        ApprovalPage.navigateToPricing()
        ApprovalPage.navigateToApproval()
        ApprovalPage.selectL1Approver(approverL1)
        ApprovalPage.selectL2Approver(approverL2)
        ApprovalPage.sendToApproval()

    });



    it('Write Data to Fixtures', () => {
        cy.writeFile('cypress/fixtures/dealData.json', { 
            awfDraftDealIndicative1: dealNameIndicative1,
            awfDraftDealIndicative2: dealNameIndicative2,
            awfSelfApprove: selfApproveDeal,
            awfSelfApproveNpw: selfApproveDealNPW,
            declineDeal1 : declineDeal,
        })
        
    })

})