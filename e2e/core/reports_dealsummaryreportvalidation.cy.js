import TopMenuPage from '../../pageObjects/TopMenuPage'
import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import dayjs from 'dayjs'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import ProductPage from '../../pageObjects/ProductPage'
import PricingPage from '../../pageObjects/PricingPage'
import ReportsPage from '../../pageObjects/ReportsPage'
import config from '../../config/global_qa.json'
import RelationshipDetailsPage from '../../pageObjects/RelationshipDetailsPage'



const dateNow = dayjs().unix()
const newDealName = "Generate Reports Deal" + dateNow
const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = config.env.importedRelationship
const prdName = Cypress.env('prdName')
const testEnv = Cypress.env('testEnv')
const clientName = config.env.importedClient
const reportType = 'Deal Summary Report'


before(() => {
    cy.login(username, password)

})

describe("Verify Deal summary report values should be equal to the pricing page values", () => {

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

    it("save RelationshipSummary,Impact,DealSummary values from report", () => {
        
        ReportsPage.cleanUpJson()
        let report_data = ['Business Unit','ROE','Industry Code','Revenue','State/Location','SVA',
        'Exposure','Relationship','With Deal','Impact','Term Loan']
        PricingPage.clickOnReportsTab()
        ReportsPage.selectReportType(reportType)
        ReportsPage.clickGenerate()
        report_data.forEach((fieldName) => {
            ReportsPage.getReportData(fieldName)
        })
    })

    it("save Impact ROE values from report", () => {

        let report_data = ['Relationship','With Deal','Impact']
        report_data.forEach((fieldName) => {
            ReportsPage.getImpactROEValues(fieldName)
        })
    })

    it("save all the Detailed forecast data from report", ()=> {

        let forecast_data = ['Margin','Fees','Revenue','Capital Benefit','Expected Loss','Brokerage','Trail',
    'Opex','NPBT','Tax','Franking Credit','NPAT','Capital Charge','SVA','ROE','NPM']
        forecast_data.forEach((fieldName) => {
            ReportsPage.getReportDetailedForeCastData(fieldName)
        })
    })


    it("save pricing page business unit,Revenue,Roe,SVA relationship values ", () => {
        PricingPage.clickOnPricingTab()
        PricingPage.clickDetails()
        PricingPage.getBusinessUnitValue()
        PricingPage.clickData()
        let pricingpage_data = ['Revenue','SVA','ROE']
        pricingpage_data.forEach((fieldName) => {
            PricingPage.getPricingPageValue(fieldName)
        })
    })
    
    it("save pricing page Revenue and ROE's with deal and Impact values", () => {
        PricingPage.getRevenueImpactWithDealValues('WithDeal','Impact')
        PricingPage.getROEImactValues('WithDeal','Impact')
    })

    it("save Industry code and limit values", () => {
        PricingPage.clickProductName(prdName)
        ProductPage.getProductIndustryCodeValue()
        ProductPage.getProductLimit()
    })

    it("save pricing page multiyear forecast data", () => {
        PricingPage.clickData()
        ProductPage.clickRevenueHeading()
        ProductPage.clickNPBTHeading()
        ProductPage.clickNPATHeading()
        let forecast_data = ['Margin','Fees','Revenue','Capital Benefit','Expected Loss','Brokerage','Trail',
        'Opex','NPBT','Tax','Franking Credit','NPAT','Capital Charge','SVA','ROE','NPM']
        forecast_data.forEach((fieldName) => {
            PricingPage.getPricingPageMultiyearForecaseData(fieldName)
        })
    })

    it("save relationship's exposure and state/Location value", () => {
        TopMenuPage.clickOnRelationship(searchVal)
        RelationshipDetailsPage.navigateToDetailsPage()
        RelationshipDetailsPage.getRelationshipExposureValue()
        RelationshipDetailsPage.getRelationshipStateValue()
    })

    it("verify Business Unit value", () => {
        ReportsPage.verifyValue('report_Business Unit','pricingpage_BusinessUnit')
    })

    it("verify ROE value", () => {
        ReportsPage.verifyValue('report_ROE', 'pricingpage_ROE')
    })

    it("verify multiyear forecast ROE value", () =>{
        ReportsPage.verifyValue('reportforecast_ROE','pricingpageforecast_ROE')
    })

    it("verify Industry code value", () => {
        ReportsPage.verifyValue('report_Industry Code','pricingpage_productIndustryCode')
    })

    it("verify Revenue value", () => {
        ReportsPage.verifyValue('report_Revenue','pricingpage_Revenue')
    })

    it("verify Revenue forecast value", () => {
        ReportsPage.verifyValue('reportforecast_Revenue','pricingpageforecast_Revenue')
    })

    it("verify SVA value", () => {
        ReportsPage.verifyValue('report_SVA','pricingpage_SVA')
    })

    it("verify SVA forecast value" ,() => {
        ReportsPage.verifyValue('reportforecast_SVA','pricingpageforecast_SVA')
    })

    it("verify Revenue with deal value", () => {
        ReportsPage.verifyValue('report_With Deal','RevenueWithDeal')
    })

    it("verify Revenue impact value", () => {
        ReportsPage.verifyValue('report_Impact','RevenueImpact')
    })

    it("verify Term loan product limit value", () => {
        ReportsPage.verifyValue('report_Term Loan','pricingpage_limit')
    })

    it("verify Margin value", () => {
        ReportsPage.verifyValue('reportforecast_Margin','pricingpageforecast_Margin')
    })

    it("verify Fees value", () => {
        ReportsPage.verifyValue('reportforecast_Fees','pricingpageforecast_Fees')
    })

    it("verify Capital Benefit value", () => {
        ReportsPage.verifyValue('reportforecast_Capital Benefit','pricingpageforecast_Capital Benefit')
    })

    it("verify Expected Loss value", () => {
        ReportsPage.verifyValue('reportforecast_Expected Loss','pricingpageforecast_Expected Loss')
    })

    it("verify Brokerage value ", () => {
        ReportsPage.verifyValue('reportforecast_Brokerage','pricingpageforecast_Brokerage')
    })

    it("verify Trial value", () => {
        ReportsPage.verifyValue('reportforecast_Trail','pricingpageforecast_Trail')
    })

    it("verify Opex value", () => {
        ReportsPage.verifyValue('reportforecast_Opex','pricingpageforecast_Opex')
    })
    
    it("verify NPBT value", () => {
        ReportsPage.verifyValue('reportforecast_NPBT','pricingpageforecast_NPBT')
    })

    it("verify Tax value", () => {
        ReportsPage.verifyValue('reportforecast_Tax','pricingpageforecast_Tax')
    })

    it("verify Franking credit value", () => {
        ReportsPage.verifyValue('reportforecast_Franking Credit','pricingpageforecast_Franking Credit')
    })

    it("verify NPAT value", () => {
        ReportsPage.verifyValue('reportforecast_NPAT','pricingpageforecast_NPAT')
    })

    it("verify capital charge value", () => {
        ReportsPage.verifyValue('reportforecast_Capital Charge','pricingpageforecast_Capital Charge',)
    })

    it("verify NPM value", () => {
        ReportsPage.verifyValue('reportforecast_NPM','pricingpageforecast_NPM')
    })

    it("verify Exposure value", () => {
        ReportsPage.verifyValue('report_Exposure','pricingpage_Exposure')
    })

    it("verify State/Location value", () => {
        ReportsPage.verifyValue('report_State/Location','pricingpage_State')
    })

    it("verify Revenue Relationship values", () => {
        ReportsPage.verifyValue('report_Relationship','pricingpage_Revenue')
    })

    it("verify Impact Relationship ROE value", () => {
        ReportsPage.verifyValue('report_Relationship_ImpactROE','pricingpage_ROE')
    })

    it("verify Impact with deal ROE value", () => {
       ReportsPage.verifyValue('report_With Deal_ImpactROE','pricingpage_ROEWithDeal')
    })

    // Skipped due to a defect https://bxjira.atlassian.net/browse/DPXA-3122
    it.skip("verify Impact ROE value", () => {
       ReportsPage.verifyValue('report_Impact_ImpactROE','pricingpage_ROEImpact')
    })


})