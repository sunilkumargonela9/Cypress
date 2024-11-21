import TopMenuPage from '../../pageObjects/TopMenuPage'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import dealData from '../../fixtures/dealData.json'

const username = Cypress.env('username')
const password = Cypress.env('password')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const searchVal = dealData.awfDraftDealIndicative1 // Deal for Indicative to Pending Approval to Approved



before(() => {
    cy.login(username, password)

});

describe('Submitter Approved', () => {
    before(() => {
        TopMenuPage.searchValue(searchVal)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(searchVal)
        ApprovalPage.navigateToApproval()
        
    });

    it('"Approved" status will be displayed in the DPX approval tab.  ', () => {

        ApprovalPage.validateApprovedStatus()
    })

    it('User should be able to finalise the deal by clicking the Book button ', () => {
        ApprovalPage.clickOnBookBtn()
    })

    it('When the “Book” button is clicked, the application will require an Outer Product ID ', () => {
        ApprovalPage.giveOuterProductId()
        
    })

})



