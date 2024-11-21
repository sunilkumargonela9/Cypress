
import dayjs from 'dayjs'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import mandatoryFields from '../../fixtures/global_qa/productMandatoryInputs.json'
import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import PricingPage from '../../pageObjects/PricingPage'
import ProductPage from '../../pageObjects/ProductPage'
import ReportsPage from '../../pageObjects/ReportsPage'
import data from '../../fixtures/customScheduleDataToUpdate.json'




const dateNow = dayjs().unix()
const newDealName = 'CustomScheduleReport' + dateNow
const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = mandatoryFields.Relationship
const prdName = mandatoryFields.Product
const clientName = mandatoryFields.Client
const term = 12
const report_type = 'Custom Schedule Report'
const repayment_type = 'Interest Only'
const default_interest_rate = 0.00


describe("Create and verify the Deal custom schedule details", () => {
    it("user should be able to create a deal under a relationship", () => {
        cy.login(username, password)
        TopMenuPage.searchValue(searchVal)
        TopMenuPage.selectTableValue(searchVal)
        TopMenuPage.verifySearch(searchVal)
        TopMenuPage.addDeal()
        ClientWizardPage.enterDealName(newDealName)
        ClientWizardPage.selectClient(clientName)
        ClientWizardPage.clickNext()
        ProductWizardPage.selectProduct(prdName)
        ProductWizardPage.createDeal()
        ProductPage.fillMandatoryFields(mandatoryFields.data.limit,
            mandatoryFields.data.utilizationRate, mandatoryFields.data.referenceRate, term)
        PricingPage.saveCopiedDeal()

    })

    it("save custom schedule data", () => {
        PricingPage.clickProductName(prdName)
        PricingPage.clickCustomSchedule()
        PricingPage.getCustomScheduleData()
    })

    it("save custom schedule report data", () => {
        PricingPage.clickOnReportsTab()
        ReportsPage.selectReportType(report_type)
        ReportsPage.clickGenerate()
        ReportsPage.getCustomScheduleReportData()
    })

    it("verify custom schedule Limit data values", () => {
        PricingPage.verifyCustomScheduleValue('Limit', term)
    })

    it("verify custom schedule Utilisation Rate values", () => {
        PricingPage.verifyCustomScheduleValue('Utilisation Rate', term)
    })

    it("verify custom schedule Credit Rating values", () => {
        PricingPage.verifyCustomScheduleValue('Credit Rating', term)
    })

    it("verify custom schedule LGD (%) values", () => {
        PricingPage.verifyCustomScheduleValue('LGD (%)', term)
    })

    it("verify custom schedule Margin Over Reference Rate values", () => {
        PricingPage.verifyCustomScheduleValue('Margin Over Reference Rate', term)
    })

    it("verify custom schedule Capital Model values", () => {
        PricingPage.verifyCustomScheduleValue('Capital Model', term)
    })

    it("verify custom schedule Liquidity Fee values", () => {
        PricingPage.verifyCustomScheduleValue('Liquidity Fee', term)
    })

    it("verify custom schedule Commitment Fee values", () => {
        PricingPage.verifyCustomScheduleValue('Commitment Fee', term)
    })
})

describe("verify principal and interest values of the custom schedule report", () => {
    it("verify principal values should be zero if repayment type is interest only", () => {
        PricingPage.clickOnPricingTab()
        PricingPage.clickProductName(prdName)
        ProductPage.verifyRepaymentType(repayment_type)
        ReportsPage.verifyPrincipalValues(term)
    })

    it("verify interest values should be equal to the payment values", () => {
        ReportsPage.verifyCustomScheduleReportValues('Interest', 'Payment', term)
    })

    it("calculate and verify the interest values", () => {
        ProductPage.calculateInterest(mandatoryFields.data.limit,
            mandatoryFields.data.utilizationRate, term, default_interest_rate)
        ReportsPage.verifyInterest(0, term)
    })
})

describe("Edit and verify the deal custom schedule details", () => {

    it("user should be able to edit the custom schedule data", () => {
        PricingPage.clickCustomSchedule()
        PricingPage.updateCustomScheduleLimit(data.Limit)
        PricingPage.updateCustomScheduleUtilizationRate(data.UtilizationRate)
        PricingPage.updateCustomScheduleCreditRating(data.CreditRating)
        PricingPage.updateCustomScheduleLGD(data.LGD)
        PricingPage.updateCustomScheduleMarginOverRefRate(data.MarginOverRefRate)
        PricingPage.updateCustomScheduleCapitalModel(data.CapitalModel, data.AnnualTurnOver)
        PricingPage.updateCustomScheduleLiquidityFee(data.LiquidityFee)
        PricingPage.updateCustomScheduleCommitmentFee(data.CommitmentFee)
        PricingPage.saveCopiedDeal()

    })

    it("Save updated deal data from custom schedule", () => {
        PricingPage.clickProductName(prdName)
        PricingPage.clickCustomSchedule()
        PricingPage.getCustomScheduleData()
    })

    it("save updated custom schedule report data", () => {
        PricingPage.clickOnReportsTab()
        ReportsPage.selectReportType(report_type)
        ReportsPage.clickGenerate()
        ReportsPage.getCustomScheduleReportData()
    })

    it("verify updated custom schedule Limit data values", () => {
        PricingPage.verifyCustomScheduleValue('Limit', term)
    })

    it("verify updated custom schedule Utilisation Rate values", () => {
        PricingPage.verifyCustomScheduleValue('Utilisation Rate', term)
    })

    it("verify updated schedule Credit Rating values", () => {
        PricingPage.verifyCustomScheduleValue('Credit Rating', term)
    })

    it("verify updated custom schedule LGD (%) values", () => {
        PricingPage.verifyCustomScheduleValue('LGD (%)', term)
    })

    it("verify updated custom schedule Margin Over Reference Rate values", () => {
        PricingPage.verifyCustomScheduleValue('Margin Over Reference Rate', term)
    })

    it("verify updated custom schedule Capital Model values", () => {
        PricingPage.verifyCustomScheduleValue('Capital Model', term)
    })

    it("verify updated custom schedule Liquidity Fee values", () => {
        PricingPage.verifyCustomScheduleValue('Liquidity Fee', term)
    })

    it("verify updated custom schedule Commitment Fee values", () => {
        PricingPage.verifyCustomScheduleValue('Commitment Fee', term)
    })

})


describe("verify principal and interest values of the updated custom schedule report", () => {
    it("verify principal values should be zero if repayment type is interest only", () => {
        PricingPage.clickOnPricingTab()
        PricingPage.clickProductName(prdName)
        ProductPage.verifyRepaymentType(repayment_type)
        ReportsPage.verifyPrincipalValues(term)
    })

    it("verify interest values should be equal to the payment values", () => {
        ReportsPage.verifyCustomScheduleReportValues('Interest', 'Payment', term)
    })

    it("calculate and verify the interest values", () => {
        ProductPage.calculateInterest(data.Limit, data.UtilizationRate, term, data.MarginOverRefRate)
        ReportsPage.verifyInterest(1, term)
    })
})