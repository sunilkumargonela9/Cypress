import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/dealData.json'

const username = Cypress.env('username')
const password = Cypress.env('password')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const searchVal = dealData.awfSelfApprove // Deal for Indicative to Pending Approval
const comments = ' Indicative '

before(() => {
    cy.login(username, password)
    TopMenuPage.searchValue(searchVal)
    TopMenuPage.clickDealTab()
    TopMenuPage.selectTableValue(searchVal)
    ApprovalPage.navigateToApproval()
});

describe('Submitter Self Approve Draft', () => {
    it('Deal should be in Draft status after creation ', () => {
        ApprovalPage.validateDraftStatus()
    });

    it('Self approval icon should be displayed but disabled', () => {
        ApprovalPage.validateSelfApprove()
    })

    it('Validating congratulations message ', () => {
        ApprovalPage.congratulationPopUp()
    })

    it('User should be able to navigate to the pricing and back to approval page', () => {
        ApprovalPage.navigateToPricing()
        ApprovalPage.navigateToApproval()
    });

})

describe('User should be able to send the deal to Indicative status', () => {

    it('User should be able to move the Draft to Indicative', () => {
        ApprovalPage.sendDealToIndicative()
        ApprovalPage.confirmMoveDraftToIndicative()
    });

    it('Success message should be displayed', () => {
        ApprovalPage.validateSuccessMessage() 
    });



});


