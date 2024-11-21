import TopMenuPage from '../../pageObjects/TopMenuPage'
import PricingPage from '../../pageObjects/PricingPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dayjs from 'dayjs'

const username = Cypress.env('username')
const password = Cypress.env('password')
const awfTestDealData = Cypress.env('testDealDraft')
const awfWFAdminTest = Cypress.env('wfaTestDeal')

const dateNow = dayjs().unix()
const testEnv = Cypress.env('testEnv')
const pendingApprovalDeal = "awfPendingApproval" + dateNow // Submit for Approval
const WFAdeal = "awfWFA" + dateNow // Work Flow Admin approver
const NPWdeal = "awfNPW" + dateNow // Terminate at NPW
const dealNameIndicative1 = "awfApproved" + dateNow // Terminate at Approved
const declineDeal = "awfDecline" + dateNow // Deal for Declinehj


beforeEach(() => {
    cy.login(username, password)
});

afterEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
});


describe('Create Test Data', () => {
    it('Create AWF Test Data for two levels Pending Approval', () => {        
        TopMenuPage.searchValue(awfTestDealData) // Select Deal to be used in testing
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(awfTestDealData)
        PricingPage.cbaTestData(pendingApprovalDeal)
        
    })

    it('Create AWF Test Data for WorkflowAdmin approval', () => {        
        TopMenuPage.searchValue(awfWFAdminTest) // Select Deal to be used in testing
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(awfWFAdminTest)
        PricingPage.cbaTestData(WFAdeal)
       
    })

    it('Create AWF Test Data For Draft to Indicative to NPW', () => {
        TopMenuPage.searchValue(awfTestDealData) // Select Deal to be used in testing
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(awfTestDealData)
        PricingPage.cbaTestData(NPWdeal)
        ApprovalPage.navigateToApproval()
        ApprovalPage.sendDealToIndicative()
        ApprovalPage.confirmMoveDraftToIndicative()
    })


    it('Write Data to Fixtures', () => {
        cy.writeFile('cypress/fixtures/cba_qa/dealData.json', { 
            awfPendingDeal:pendingApprovalDeal,
            awfWorkflowAdminDeal : WFAdeal,
            awfNPWDeal : NPWdeal,
            awfDraftDealIndicative1: dealNameIndicative1,
            declineDeal1 : declineDeal,
        })
    })

})