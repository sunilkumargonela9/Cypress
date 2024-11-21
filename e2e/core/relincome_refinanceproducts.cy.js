import TopMenuPage from "../../pageObjects/TopMenuPage"
import RelationshipIncomePage from "../../pageObjects/RelationshipIncomePage"
import PricingPage from "../../pageObjects/PricingPage"
import ProductPage from "../../pageObjects/ProductPage"

const username = Cypress.env('username')
const password = Cypress.env('password')
const relName = 'Entrada Resort Imported'
const product = 'Entrada Resort Loan Imported'
const rate = 10


before(() => {
    cy.login(username, password)
    TopMenuPage.searchValue(relName)
    TopMenuPage.selectTableValue(relName)
    RelationshipIncomePage.clickRelationshipIncomeTab()
})

describe("User should be able to Refinance product", () => {
    it("User should be able to modify the product", () => {
        RelationshipIncomePage.clickRefinance()
        RelationshipIncomePage.clickModalApplyChanges()
    })

    it("edit the refinanced product,create the deal and verify the name", () => {
        PricingPage.clickRefinancedProduct(product)
        ProductPage.fillUtilisationRate(rate)
        PricingPage.saveCopiedDeal()
        PricingPage.verifyNewDealName('Refinance')
    })

    it("verify revert icon should be present against the product", () => {
        RelationshipIncomePage.clickRelationshipIncomeTab()
        RelationshipIncomePage.verifyRevertIcon(product)
    })
   
})