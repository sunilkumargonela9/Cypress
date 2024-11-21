
import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'   
import dealData from '../../fixtures/dealData.json'

const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = dealData.awfDraftDealIndicative1

describe('Submitter Draft', () => {
    it('Validating the Draft Status ', () => {
        cy.login(username, password)
        TopMenuPage.searchValue(searchVal)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableExactVal(searchVal)
        ApprovalPage.navigateToApproval()
        ApprovalPage.validateDraftStatus()
    });

    it('User should be able to navigate to the pricing and back to approval page', () => {
        ApprovalPage.navigateToPricing()
        ApprovalPage.navigateToApproval()
    });

describe('User should be able to send the deal to Indicative status', () => {
    
    it('User should be able to move the Draft to Indicative', () => {
        ApprovalPage.sendDealToIndicative()
    });

    it('Deal status should be set Indicative', () => {
        ApprovalPage.validatingIndicative()
    });
    
});

}) 
