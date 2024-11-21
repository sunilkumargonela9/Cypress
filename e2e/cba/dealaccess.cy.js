import LeftNavigation from '../../pageObjects/LeftNavigation';
import ProspectPage from '../../pageObjects/ProspectPage';
import ClientPage from '../../pageObjects/ClientPage';
import dayjs from 'dayjs'
import TopMenuPage from '../../pageObjects/TopMenuPage';
import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage';
import ProductPage from '../../pageObjects/ProductPage';
import PricingPage from '../../pageObjects/PricingPage';
import mandatoryFields from '../../fixtures/global_qa/productMandatoryInputs.json'
import DealAccessPage from '../../pageObjects/DealAccessPage';
import LoginPage from '../../pageObjects/LoginPage';
import RelationshipDetailsPage from '../../pageObjects/RelationshipDetailsPage';
import AccessPage from '../../pageObjects/AccessPage';


const dateNow = dayjs().unix()
const username = Cypress.env('username')
const password = Cypress.env('password')
const testEnv = Cypress.env('testEnv') //to differentiate input fields based on test environment
const prdName = Cypress.env('prdName')
const catVal = Cypress.env('Search_category')
const client_name = "ClientAccess" + dateNow
const relationship_name = "RelationshipAccess" + dateNow
const deal_name = "DealAccess" + dateNow
const second_user = 'noah'
const product = "Term Loan"
const dealExtId = "DealTest"
const readOnly = 'Read Only'
const fullAccess = 'Full Access'




describe('Create relationship, client and deal under it', () => {
    before(() => {
        cy.login(username, password)
    });

    it('Verify that user will be able to add a relationship ', () => {
        LeftNavigation.openSideBar()
        LeftNavigation.openProspectPage()
        ProspectPage.populateRequiredFields(testEnv)
        ProspectPage.verifyRelationshipIsCreated()
        ProspectPage.editRelationshipName(relationship_name)
        ProspectPage.clickPopUpOk()

    });

    it("add client to the relationship", () => {
        ClientPage.selectClientTab()
        ClientPage.clicksOnAddClient()
        ClientPage.removeClientName()
        ClientPage.enterNewClientName(client_name)
        ClientPage.enterCBAClientFields()
        ClientPage.clickSave()
        ClientPage.verifyClientNameIfSave(client_name)

    })

    it("add a deal to the client", () => {
        TopMenuPage.addDeal()
        ClientWizardPage.enterDealName(deal_name)
        ClientWizardPage.selectClient(client_name)
        ClientWizardPage.clickNext()
        ProductWizardPage.selectProductCat(catVal)
        ProductWizardPage.selectProduct(prdName)
        ProductWizardPage.createDeal()
        ProductPage.enterMandatoryFields(testEnv, prdName )
        
    })

    it("log out of the application", () => {
        LoginPage.userLogout()
    })

});

describe("Verify that user not with Deal access cannot read relationship,client and deal", () => {

    it("login with the second user account", () => {
        cy.login(second_user, password)
    })

    it("verify that user cannot be able to see the relationship", () => {

        TopMenuPage.searchValue(relationship_name)
        TopMenuPage.verifySearchValueIsNotDisplayed(relationship_name)
    })

    it("verify that user cannot be able to see the client", () => {
        TopMenuPage.searchValue(client_name)
        TopMenuPage.clickClientTab()
        TopMenuPage.verifySearchValueIsNotDisplayed(client_name)
    })

    it("verify that user cannot be able to see the deal", () => {
        TopMenuPage.searchValue(deal_name)
        TopMenuPage.clickDealTab()
        TopMenuPage.verifySearchValueIsNotDisplayed(deal_name)
    })

    it("log out of the application", () => {
        LoginPage.userLogout()
    })

})

describe("user with Read Only access cannot edit relationship,client and deal", () => {

    it("login with the first user account", () => {
        cy.login(username, password)
    })

    it("grant read only access to the user", () => {
        TopMenuPage.searchValue(deal_name)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(deal_name)
        DealAccessPage.clickDealAccessTab()
        AccessPage.clickAddUser()
        AccessPage.enterUserName(second_user)
        AccessPage.grantAccess(readOnly)
        AccessPage.clickClose()
        AccessPage.verifyAccessTypeOfUser(second_user, readOnly)

    })

    it("log out of the application", () => {
        LoginPage.userLogout()
    })

    it("login with the second user account", () => {
        cy.login(second_user, password)
    })

    it("verify that user cannot be able to edit the realtionship", () => {
        TopMenuPage.searchValue(relationship_name)
        TopMenuPage.selectTableValue(relationship_name)
        TopMenuPage.clickViewAll()
        TopMenuPage.verifyFieldIsNotEditable('relationshipname')

    })

    it("verify that user cannot be able to edit the client", () => {
        TopMenuPage.searchValue(client_name)
        TopMenuPage.clickClientTab()
        TopMenuPage.selectTableValue(client_name)
        TopMenuPage.verifyFieldIsNotEditable('clientname')

    })

    it("verify that user cannot be able to edit the deal", () => {
        TopMenuPage.searchValue(deal_name)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(deal_name)
        RelationshipDetailsPage.navigateToDetailsPage()
        TopMenuPage.verifyFieldIsNotEditable('dealname')

    })

    it("log out of the application", () => {
        LoginPage.userLogout()
    })
})

describe("verify that user with Full Access cannot edit relationship,client and can edit deal", () => {

    it("login with the first user account", () => {
        cy.login(username, password)
    })

    it("grant Full Access to the user", () => {

        TopMenuPage.searchValue(deal_name)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(deal_name)
        DealAccessPage.clickDealAccessTab()
        AccessPage.clickEditAccessBtn(second_user)
        AccessPage.grantAccess(fullAccess)
        AccessPage.verifyAccessTypeOfUser(second_user, fullAccess)

    })

    it("log out of the application", () => {
        LoginPage.userLogout()
    })

    it("login with the second user account", () => {
        cy.login(second_user, password)
    })

    it("verify that user cannot edit the relationship", () => {

        TopMenuPage.searchValue(relationship_name)
        TopMenuPage.selectTableValue(relationship_name)
        TopMenuPage.clickViewAll()
        TopMenuPage.verifyFieldIsNotEditable('relationshipname')
    })

    it("verify that user cannot edit the client", () => {

        TopMenuPage.searchValue(client_name)
        TopMenuPage.clickClientTab()
        TopMenuPage.selectTableValue(client_name)
        TopMenuPage.verifyFieldIsNotEditable('clientname')

    })

    it("verify that user can edit the deal", () => {

        TopMenuPage.searchValue(deal_name)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(deal_name)
        RelationshipDetailsPage.navigateToDetailsPage()
        PricingPage.enterCopiedDealName(deal_name)
        PricingPage.ClickOnCalcPlusSaveBtn()
    })

})