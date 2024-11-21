import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/cba_qa/dealData.json'

const username = Cypress.env('username')
const password = Cypress.env('password')

const npwdeal = dealData.awfNPWDeal  // Deal for Indicative to NPW

const testEnv = Cypress.env('testEnv')
let reason =  Cypress.env('npwReason')


describe('User should be able to send the deal to NPW status', () => {
    
    let comments = 'Send this Automation Deal to Npw'
    
    before(() => {
        cy.login(username, password)
        TopMenuPage.searchValue(npwdeal)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(npwdeal)
        ApprovalPage.navigateToApproval()
    });
    
    it('User should be able to enter the reason & send the deal for NPW status ', () => {
        //ApprovalPage.addCommentaryDetails()
        ApprovalPage.npwDeal()
        ApprovalPage.npwReason(reason)
        ApprovalPage.enternpwComments(comments)
        ApprovalPage.validateNpwStatus()
    })

    it('Action history should be updated to include User Comments when user send deal to NPW status', () => {
        ApprovalPage.validateActionHistory(comments) 
    });

})




