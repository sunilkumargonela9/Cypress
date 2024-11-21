import TopMenuPage from '../../pageObjects/TopMenuPage'
import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import dayjs from 'dayjs'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import ProductPage from '../../pageObjects/ProductPage'
import PricingPage from '../../pageObjects/PricingPage'
import RelationshipIncomePage from '../../pageObjects/RelationshipIncomePage'
import LeftNavigation from '../../pageObjects/LeftNavigation'
import ApprovalPage from '../../pageObjects/ApprovalPage'
import config from '../../config/global_qa.json'
import pricingData from '../../fixtures/pricingRevenueRoeSva.json'


const dateNow = dayjs().unix()
const newDealName = "RelationshipIncome Deal" + dateNow 
const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = config.env.importedRelationship
const prdName = Cypress.env('prdName')
const testEnv = Cypress.env('testEnv')
const revenue = "5000"
const creditRwa = "22500"
const clientName = config.env.importedClient
const prdcategoryName = Cypress.env('prdcategoryName')
const crossSellPrdName = Cypress.env('crossSellPrdName')
const prdcategoryName2 = config.env.prdcategoryName2
const crossSellPrdName2 = config.env.crossSellPrdName2
const prdName2 = config.env.prdName2
const balance = "4000"
const clientMargin = "100"


before(() => {
    cy.login(username, password)

})

describe("Total Limit, Revenue, ROE values should be correct on deal level on pricing page", () => {
    it("user should be able to create a deal under a relationship", () => {
        TopMenuPage.searchValue(searchVal)
        TopMenuPage.selectTableValue(searchVal)
        TopMenuPage.verifySearch(searchVal)
        TopMenuPage.addDeal()
        ClientWizardPage.enterDealName(newDealName)
        ClientWizardPage.selectClient(clientName)
        ClientWizardPage.clickNext()
        ProductWizardPage.selectProduct(prdName)
        ProductWizardPage.createDeal()
        ProductPage.enterMandatoryFields(testEnv, prdName)
    })

    it("user should be able to add cross sell with service product to the deal", () => {
        LeftNavigation.selectClient(clientName)
        PricingPage.clickAddProduct()
        ProductWizardPage.selectProdutForCrossSell(prdcategoryName, crossSellPrdName)
        ProductWizardPage.createDeal()
        ProductPage.enterMandatoryFieldsCrossSell(revenue, creditRwa)
        ProductPage.clickSave()
    })

    it("user should be able to add cross sell with deposit product to the deal", () => {
        LeftNavigation.selectClient(clientName)
        PricingPage.clickAddProduct()
        ProductWizardPage.selectProdutForCrossSell(prdcategoryName2, crossSellPrdName2)
        ProductWizardPage.selectProduct(prdName2)
        ProductWizardPage.createDeal()
        ProductPage.enterMandatoryFieldsForDepositProduct(balance, clientMargin)
        ProductPage.clickSave()
    })

    it("write revenue,sva,roe values from relationship income page", () => {
        RelationshipIncomePage.clickRelationshipIncomeTab()
        RelationshipIncomePage.writeRevenueSvaRoeFromRelationshipPage()
    })

    it("verify Impact SVA existing and with deal values", () => {
        ApprovalPage.navigateToPricing() 
        PricingPage.verifySVAvaluesExistingAndWithDeal()
    })


    it("verify Impact Revenue existing and with deal values", () => {
        ApprovalPage.navigateToPricing() 
        PricingPage.verifyRevenueValuesExistingAndWithDeal()
    })

    // Skip due to issue https://bxjira.atlassian.net/browse/DPXA-3122
    it.skip("verify Impact Roe existing values and with deal", () => {
        PricingPage.verifyRoeValuesExistingAndWithDeal()
    })


})