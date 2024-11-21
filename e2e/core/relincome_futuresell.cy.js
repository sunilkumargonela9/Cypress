import TopMenuPage from '../../pageObjects/TopMenuPage'
import RelationshipIncomePage from '../../pageObjects/RelationshipIncomePage'


const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = Cypress.env('selfApproveDeal')


beforeEach(() => {
    cy.login(username, password)
    TopMenuPage.searchValue(searchVal)
    TopMenuPage.clickDealTab()
    TopMenuPage.selectTableValue(searchVal)
    RelationshipIncomePage.clickRelationshipIncomeTab()

});

describe("user should be able to add, edit and delete future sell", () => {

    it("user should be able to add the future sell", () => {
        RelationshipIncomePage.clickPlusFutureCell()
        RelationshipIncomePage.addFutureCell()
        RelationshipIncomePage.clickApplyChanges()
    })

    it('user should be able to edit the future sell', () => {
        RelationshipIncomePage.clickFutureCrossSellTab()
        RelationshipIncomePage.clickEditBtn()
        RelationshipIncomePage.editFutureCell()
        RelationshipIncomePage.clickApplyChanges()
    })
    it("user should be able to delete the future sell", () => {
        RelationshipIncomePage.clickFutureCrossSellTab()
        RelationshipIncomePage.deleteFutureCell()
        RelationshipIncomePage.confirmDeleteApplyChanges()
    })
})