import LeftNavigation from '../../pageObjects/LeftNavigation';
import ProspectPage from '../../pageObjects/ProspectPage';
import ClientPage from '../../pageObjects/ClientPage';
import TopMenuPage from '../../pageObjects/TopMenuPage';
import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage';
import ProductPage from '../../pageObjects/ProductPage';
import dayjs from 'dayjs-with-plugins'
import PricingPage from '../../pageObjects/PricingPage';
import ApprovalPage from '../../pageObjects/ApprovalPage';
import LoginPage from '../../pageObjects/LoginPage';
import EmailPage from '../../pageObjects/EmailPage';

const dateNow = dayjs().unix()
const username = Cypress.env('username')
const password = Cypress.env('password')
const testEnv = Cypress.env('testEnv') //to differentiate input fields based on test environment
const client_name = "suncorp_client" + dateNow
const deal_name = "Suncorp_deal" + dateNow
const product = "Overdraft"
const creditRatingCode = '1'
const lgd = 'A'
const level1Approver = "Jessica"
const level2Approver = "Frank"

before(() => {
    cy.login(username, password)
});

describe.skip('Verify that user should be able to create relationship, client and deal under it', () => {

    it('Verify that user will be able to add a relationship ', () => {
        LeftNavigation.openSideBar()
        LeftNavigation.openProspectPage()
        ProspectPage.populateRequiredFields(testEnv)
        ProspectPage.verifyRelationshipIsCreated()

    });

    it("verify that user should be able to add client to the relationship", () => {
        ClientPage.selectClientTab()
        ClientPage.clicksOnAddClient()
        ClientPage.removeClientName()
        ClientPage.enterNewClientName(client_name)
        ClientPage.enterSuncorpFields(creditRatingCode, lgd)
        ClientPage.clickSave()
        ClientPage.verifyClientNameIfSave(client_name)
        ClientPage.writeClientNameToJson(client_name)

    })

    it("verify that user should be able to add a deal to the client", () => {
        TopMenuPage.addDeal()
        ClientWizardPage.enterDealName(deal_name)
        ClientWizardPage.clickNext()
        ProductWizardPage.selectProduct(product)
        ProductWizardPage.createDeal()
        ProductPage.enterMandatoryFields(testEnv, product)

    })


    it("Send the deal for approval", () => {
        ApprovalPage.navigateToApproval()
        ApprovalPage.selectL1Approver(level1Approver)
        ApprovalPage.selectL2Approver(level2Approver)
        ApprovalPage.sendToApproval()
        LoginPage.userLogout()
    })

})

describe.skip("Approve deal with Approver L1", () => {

    it("Login as approver1 and go to approvals", () => {
        //Clear L1 Approval Email
        // EmailPage.deleteAllMessage()
        // EmailPage.clearEmailData()
        cy.login(level1Approver, password)
        TopMenuPage.searchValue(deal_name)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(deal_name)
        ApprovalPage.navigateToApproval()
    })

    it('Deal will transition to Level1 Approval', () => {

        ApprovalPage.clickOnApproveBtn()
        LoginPage.userLogout()

    })

})

describe.skip('Approve deal with Approver L2', () => {

    it("login as level2 approver", () => {

        cy.login(level2Approver, password)
        TopMenuPage.searchValue(deal_name)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(deal_name)
        ApprovalPage.navigateToApproval()
    })

    it('Deal will transition to Level2 Approval', () => {
        ApprovalPage.clickOnApproveBtn()
        LoginPage.userLogout()
    })

})

describe.skip("Settle the approved deal", () => {

    it("go to approval page", () => {
        cy.login(username, password)
        TopMenuPage.searchValue(deal_name)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(deal_name)
        ApprovalPage.navigateToApproval()
    })


    it("settle the deal by giving the outer id", () => {
        ApprovalPage.validateApprovedStatus()
        ApprovalPage.clickOnBookBtn()
        ApprovalPage.giveOuterProductId()
    })
})