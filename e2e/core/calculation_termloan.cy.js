
import TopMenuPage from '../../pageObjects/TopMenuPage'
import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import dayjs from 'dayjs'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import ProductPage from '../../pageObjects/ProductPage'
import config from '../../config/global_qa.json'
import mandatoryFields from '../../fixtures/global_qa/productMandatoryInputs.json'
import PricingPage from '../../pageObjects/PricingPage'




const dateNow = dayjs().unix()
const newDealName = "Calculation Term Loan" + dateNow // Terminate at Approved
const username = Cypress.env('username')
const password = Cypress.env('password')
const searchVal = mandatoryFields.Relationship
const prdName = mandatoryFields.Product
const clientName = mandatoryFields.Client

let lifetime = 0
let yr2023 = 1
let yr2024 = 2
let yr2025 = 3
let yr2026 = 4
let yr2027 = 5

before(() => {
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

})

    describe("verify the multiyear forecast data over term loan product", () => {
        it("user should be able to create a deal under a relationship", () => {
            ProductPage.fillMandatoryFields(mandatoryFields.data.limit,
                mandatoryFields.data.utilizationRate, mandatoryFields.data.referenceRate,
                mandatoryFields.data.term)
                ProductPage.enterStartDate('2024','January','1')
            PricingPage.clickData()
            ProductPage.scrollToExposureHeading()
            ProductPage.scrollToExposureHeading()
            ProductPage.selectChannel(mandatoryFields.data.channel)
            ProductPage.updateBrokerageUpfront(mandatoryFields.data.brokerage)
            ProductPage.updateTrail(mandatoryFields.data.trail)
        })
    })

    describe("Verify Income values for all the years", () => {
        it("Verify income lifetime value", () => {
            ProductPage.getValues('Income')
            ProductPage.verifyValue('IncomeInterest', lifetime, 'Lifetime')
        })

        it("verify Income 2023 value", () => {
            ProductPage.verifyValue('IncomeInterest', yr2023,'2023')
        })

        it("verify Income 2024 value", () => {
            ProductPage.verifyValue('IncomeInterest', yr2024,'2024')
        })

        it("verify Income 2025 value", () => {
            ProductPage.verifyValue('IncomeInterest', yr2025,'2025')
        })

        it("verify Income 2026 value", () => {
            ProductPage.verifyValue('IncomeInterest', yr2026,'2026')
        })

        it("verify Income 2027 value", () => {
            ProductPage.verifyValue('IncomeInterest', yr2027,'2027')
        })        

    })

    describe("Verify Drawn Fund cost for all the years", () => {
        it("verify Drawn Fund cost lifetime value", () => {
            ProductPage.clickIncomeHeading()
            ProductPage.getValues('Drawn Fund Cost')
            ProductPage.verifyValue('CostOfDrawnFund', lifetime,'Lifetime')
        })

        it("verify Drawn Fund cost 2023 value", () => {
            ProductPage.verifyValue('CostOfDrawnFund', yr2023,'2023')
        })

        it("verify Drawn Fund cost 2024 value", () => {
            ProductPage.verifyValue('CostOfDrawnFund', yr2024,'2024')
        })

        it("verify Drawn Fund cost 2025 value", () => {
            ProductPage.verifyValue('CostOfDrawnFund', yr2025,'2025')
        })

        it("verify Drawn Fund cost 2026 value", () => {
            ProductPage.verifyValue('CostOfDrawnFund', yr2026,'2026')
        })

        it("verify Drawn Fund cost 2027 value", () => {
            ProductPage.verifyValue('CostOfDrawnFund', yr2027,'2027')
        })
    })

    describe("verify Undrawn Fund cost for all the years", () => {
        it("verify Undrawn fund cost lifetime value", () => {
            ProductPage.getValues('Undrawn Fund Cost')
            ProductPage.verifyValue('CostOfUndrawnFund', lifetime,'Lifetime')
        })

        it("verify Undrawn Fund cost 2023 value", () => {
            ProductPage.verifyValue('CostOfUndrawnFund', yr2023,'2023')
        })

        it("verify Undrawn Fund cost 2024 value", () => {
            ProductPage.verifyValue('CostOfUndrawnFund', yr2024,'2024')
        })

        it("verify Undrawn Fund cost 2025 value", () => {
            ProductPage.verifyValue('CostOfUndrawnFund', yr2025,'2025')
        })

        it("verify Undrawn Fund cost 2026 value", () => {
            ProductPage.verifyValue('CostOfUndrawnFund', yr2026,'2026')
        })

        it("verify Undrawn Fund cost 2027 value", () => {
            ProductPage.verifyValue('CostOfUndrawnFund', yr2027,'2027')
        })
    })

    describe("verify Margin value for all the years", () => {
        it("verify margin lifetime value", () => {
            ProductPage.getValues('Margin')
            ProductPage.verifyValue('Margin', lifetime,'Lifetime')
        })

        it("verify margin 2023 value", () => {
            ProductPage.getValues('Margin')
            ProductPage.verifyValue('Margin', yr2023,'2023')
        })

        it("verify margin 2024 value", () => {
            ProductPage.getValues('Margin')
            ProductPage.verifyValue('Margin', yr2024,'2024')
        })

        it("verify margin 2025 value", () => {
            ProductPage.getValues('Margin')
            ProductPage.verifyValue('Margin', yr2025,'2025')
        })

        it("verify margin 2026 value", () => {
            ProductPage.getValues('Margin')
            ProductPage.verifyValue('Margin', yr2026,'2026')
        })

        it("verify margin 2027 value", () => {
            ProductPage.verifyValue('Margin', yr2027,'2027')
        })

    })

    describe("verify fees value for all the years", () => {
        it("verify fees lifetime value", () => {
            ProductPage.clickFeesHeading()
            ProductPage.getValues('Fees')
            ProductPage.verifyValue('Fees', lifetime,'Lifetime')
        })

        it("verify fees 2023 value", () => {
            ProductPage.clickFeesHeading()
            ProductPage.verifyValue('Fees', yr2023,'2023')
        })

        it("verify fees 2024 value", () => {
            ProductPage.clickFeesHeading()
            ProductPage.verifyValue('Fees', yr2024,'2024')
        })

        it("verify fees 2025 value", () => {
            ProductPage.clickFeesHeading()
            ProductPage.verifyValue('Fees', yr2025,'2025')
        })

        it("verify fees 2026 value", () => {
            ProductPage.clickFeesHeading()
            ProductPage.verifyValue('Fees', yr2026,'2026')
        })

        it("verify fees 2027 value", () => {
            ProductPage.verifyValue('Fees', yr2027,'2027')
        })
    })

    describe("verify Upfront Fee value for all the years", () => {
        it("verify Upfront Fee lifetime value", () => {
            ProductPage.getValues('Upfront Fee')
            ProductPage.verifyValue('UpfrontFee', lifetime,'Lifetime')
        })

        it("verify Upfront Fee 2023 value", () => {
            ProductPage.clickFeesHeading()
            ProductPage.verifyValue('UpfrontFee', yr2023,'2023')
        })

        it("verify Upfront Fee 2024 value", () => {
            ProductPage.clickFeesHeading()
            ProductPage.verifyValue('UpfrontFee', yr2024,'2024')
        })

        it("verify Upfront Fee 2025 value", () => {
            ProductPage.clickFeesHeading()
            ProductPage.verifyValue('UpfrontFee', yr2025,'2025')
        })

        it("verify Upfront Fee 2026 value", () => {
            ProductPage.clickFeesHeading()
            ProductPage.verifyValue('UpfrontFee', yr2026,'2026')
        })

        it("verify Upfront Fee 2027 value", () => {
            ProductPage.verifyValue('UpfrontFee', yr2027,'2027')
        })
    })

    describe("verify Ongoing Fee value for all the years", () => {
        it("verify Ongoing Fee lifetime value", () => {
            ProductPage.getValues('Ongoing Fee')
            ProductPage.verifyValue('OngoingFee', lifetime,'Lifetime')
        })

        it("verify Ongoing Fee 2023 value", () => {
            ProductPage.clickFeesHeading()
            ProductPage.verifyValue('OngoingFee', yr2023,'2023')
        })

        it("verify Ongoing Fee 2024 value", () => {
            ProductPage.clickFeesHeading()
            ProductPage.verifyValue('OngoingFee', yr2024,'2024')
        })

        it("verify Ongoing Fee 2025 value", () => {
            ProductPage.clickFeesHeading()
            ProductPage.verifyValue('OngoingFee', yr2025,'2025')
        })

        it("verify Ongoing Fee 2026 value", () => {
            ProductPage.clickFeesHeading()
            ProductPage.verifyValue('OngoingFee', yr2026,'2026')
        })

        it("verify Ongoing Fee 2027 value", () => {
            ProductPage.verifyValue('OngoingFee', yr2027,'2027')
        })
    })

    describe("verify Revenue value for all the years", () => {
        it("verify Revenue lifetime value", () => {
            ProductPage.clickRevenueHeading()
            ProductPage.getValues('Revenue')
            ProductPage.verifyValue('Revenue', lifetime,'Lifetime')
        })

        it("verify Revenue 2023 value", () => {
            ProductPage.verifyValue('Revenue', yr2023,'2023')
        })

        it("verify Revenue 2024 value", () => {
            ProductPage.verifyValue('Revenue', yr2024,'2024')
        })

        it("verify Revenue 2025 value", () => {
            ProductPage.verifyValue('Revenue', yr2025,'2025')
        })

        it("verify Revenue  2026 value", () => {
            ProductPage.verifyValue('Revenue', yr2026,'2026')
        })

        it("verify Revenue 2027 value", () => {
            ProductPage.verifyValue('Revenue', yr2027,'2027')
        })
    })

    describe("verify CapitalBenefit value for all the years", () => {
        it("verify CapitalBenefit lifetime value", () => {
            ProductPage.getValues('Capital Benefit')
            ProductPage.verifyValue('CapitalBenefit', lifetime,'Lifetime')
        })

        it("verify CapitalBenefit 2023 value", () => {
            ProductPage.verifyValue('CapitalBenefit', yr2023,'2023')
        })

        it("verify CapitalBenefit 2024 value", () => {
            ProductPage.verifyValue('CapitalBenefit', yr2024,'2024')
        })

        it("verify CapitalBenefit 2025 value", () => {
            ProductPage.verifyValue('CapitalBenefit', yr2025,'2025')
        })

        it("verify CapitalBenefit  2026 value", () => {
            ProductPage.verifyValue('CapitalBenefit', yr2026,'2026')
        })

        it("verify CapitalBenefit 2027 value", () => {
            ProductPage.verifyValue('CapitalBenefit', yr2027,'2027')
        })
    })

    describe("verify Expected Loss value for all the years", () => {
        it("verify Expected Loss lifetime value", () => {
            ProductPage.getValues('Expected Loss')
            ProductPage.verifyValue('ExpectedLoss', lifetime,'Lifetime')
        })

        it("verify Expected Loss value 2023 value", () => {
            ProductPage.verifyValue('ExpectedLoss', yr2023,'2023')
        })

        it("verify Expected Loss value 2024 value", () => {
            ProductPage.verifyValue('ExpectedLoss', yr2024,'2024')
        })

        it("verify Expected Loss value 2025 value", () => {
            ProductPage.verifyValue('ExpectedLoss', yr2025,'2025')
        })

        it("verify Expected Loss value 2026 value", () => {
            ProductPage.verifyValue('ExpectedLoss', yr2026,'2026')
        })

        it("verify Expected Loss 2027 value", () => {
            ProductPage.verifyValue('ExpectedLoss', yr2027,'2027')
        })
    })

    describe("verify Brokerage value for all the years", () => {
        it("verify Brokerage lifetime value", () => {
            ProductPage.getValues('Brokerage')
            ProductPage.verifyValue('Brokerage', lifetime,'Lifetime')
        })

        it("verify Brokerage 2023 value", () => {
            ProductPage.verifyValue('Brokerage', yr2023,'2023')
        })

        it("verify Brokerage 2024 value", () => {
            ProductPage.verifyValue('Brokerage', yr2024,'2024')
        })

        it("verify Brokerage 2025 value", () => {
            ProductPage.verifyValue('Brokerage', yr2025,'2025')
        })

        it("verify Brokerage 2026 value", () => {
            ProductPage.verifyValue('Brokerage', yr2026,'2026')
        })

        it("verify Brokerage 2027 value", () => {
            ProductPage.verifyValue('Brokerage', yr2027,'2027')
        })
    })

    describe("verify Trail value for all the years", () => {
        it("verify Trail lifetime value", () => {
            ProductPage.getValues('Trail')
            ProductPage.verifyValue('Trail', lifetime,'Lifetime')
        })

        it("verify Trail 2023 value", () => {
            ProductPage.verifyValue('Trail', yr2023,'2023')
        })

        it("verify Trail 2024 value", () => {
            ProductPage.verifyValue('Trail', yr2024,'2024')
        })

        it("verify Trail 2025 value", () => {
            ProductPage.verifyValue('Trail', yr2025,'2025')
        })

        it("verify Trail 2026 value", () => {
            ProductPage.verifyValue('Trail', yr2026,'2026')
        })

        it("verify Trail 2027 value", () => {
            ProductPage.verifyValue('Trail', yr2027,'2027')
        })
    })


    describe("verify Opex value for all the years", () => {
        it("verify Opex lifetime value", () => {
            ProductPage.getValues('Opex')
            ProductPage.verifyValue('Opex', lifetime,'Lifetime')
        })

        it("verify Opex 2023 value", () => {
            ProductPage.verifyValue('Opex', yr2023,'2023')
        })

        it("verify Opex 2024 value", () => {
            ProductPage.verifyValue('Opex', yr2024,'2024')
        })

        it("verify Opex 2025 value", () => {
            ProductPage.verifyValue('Opex', yr2025,'2025')
        })

        it("verify Opex 2026 value", () => {
            ProductPage.verifyValue('Opex', yr2026,'2026')
        })

        it("verify Opex 2027 value", () => {
            ProductPage.verifyValue('Opex', yr2027,'2027')
        })
    })



    describe("verify Npbt value for all the years", () => {
        it("verify Npbt lifetime value", () => {
            ProductPage.clickNPBTHeading()
            ProductPage.getValues('NPBT')
            ProductPage.verifyValue('Npbt', lifetime,'Lifetime')
        })

        it("verify Npbt 2023 value", () => {
            ProductPage.verifyValue('Npbt', yr2023,'2023')
        })

        it("verify Npbt 2024 value", () => {
            ProductPage.verifyValue('Npbt', yr2024,'2024')
        })

        it("verify Npbt 2025 value", () => {
            ProductPage.verifyValue('Npbt', yr2025,'2025')
        })

        it("verify Npbt 2026 value", () => {
            ProductPage.verifyValue('Npbt', yr2026,'2026')
        })

        it("verify Npbt 2027 value", () => {
            ProductPage.verifyValue('Npbt', yr2027,'2027')
        })
    })

    describe("verify Tax value for all the years", () => {
        it("verify Tax lifetime value", () => {
            ProductPage.getValues('Tax')
            ProductPage.verifyValue('Tax', lifetime,'Lifetime')
        })

        it("verify Tax 2023 value", () => {
            ProductPage.verifyValue('Tax', yr2023,'2023')
        })

        it("verify Tax 2024 value", () => {
            ProductPage.verifyValue('Tax', yr2024,'2024')
        })

        it("verify Tax 2025 value", () => {
            ProductPage.verifyValue('Tax', yr2025,'2025')
        })

        it("verify Tax 2026 value", () => {
            ProductPage.verifyValue('Tax', yr2026,'2026')
        })

        it("verify Tax 2027 value", () => {
            ProductPage.verifyValue('Tax', yr2027,'2027')
        })
    })

    describe("verify FrankingCredit value for all the years", () => {
        it("verify FrankingCredit lifetime value", () => {
            ProductPage.getValues('Franking Credit')
            ProductPage.verifyValue('FrankingCredit', lifetime,'Lifetime')
        })

        it("verify FrankingCredit 2023 value", () => {
            ProductPage.verifyValue('FrankingCredit', yr2023,'2023')
        })

        it("verify FrankingCredit 2024 value", () => {
            ProductPage.verifyValue('FrankingCredit', yr2024,'2024')
        })

        it("verify FrankingCredit 2025 value", () => {
            ProductPage.verifyValue('FrankingCredit', yr2025,'2025')
        })

        it("verify FrankingCredit 2026 value", () => {
            ProductPage.verifyValue('FrankingCredit', yr2026,'2026')
        })

        it("verify FrankingCredit 2027 value", () => {
            ProductPage.verifyValue('FrankingCredit', yr2027,'2027')
        })
    })

    describe("verify Npat value for all the years", () => {
        it("verify Npat lifetime value", () => {
            ProductPage.clickNPATHeading()
            ProductPage.getValues('NPAT')
            ProductPage.verifyValue('Npat', lifetime,'Lifetime')
        })

        it("verify Npat 2023 value", () => {
            ProductPage.verifyValue('Npat', yr2023,'2023')
        })

        it("verify Npat 2024 value", () => {
            ProductPage.verifyValue('Npat', yr2024,'2024')
        })

        it("verify Npat 2025 value", () => {
            ProductPage.verifyValue('Npat', yr2025,'2025')
        })

        it("verify Npat 2026 value", () => {
            ProductPage.verifyValue('Npat', yr2026,'2026')
        })

        it("verify Npat 2027 value", () => {
            ProductPage.verifyValue('Npat', yr2027,'2027')
        })
    })

    describe("verify CapitalCharge value for all the years", () => {
        it("verify CapitalCharge lifetime value", () => {
            ProductPage.getValues('Capital Charge')
            ProductPage.verifyValue('CapitalCharge', lifetime,'Lifetime')
        })

        it("verify CapitalCharge 2023 value", () => {
            ProductPage.verifyValue('CapitalCharge', yr2023,'2023')
        })

        it("verify CapitalCharge 2024 value", () => {
            ProductPage.verifyValue('CapitalCharge', yr2024,'2024')
        })

        it("verify CapitalCharge 2025 value", () => {
            ProductPage.verifyValue('CapitalCharge', yr2025,'2025')
        })

        it("verify CapitalCharge 2026 value", () => {
            ProductPage.verifyValue('CapitalCharge', yr2026,'2026')
        })

        it("verify CapitalCharge 2027 value", () => {
            ProductPage.verifyValue('CapitalCharge', yr2027,'2027')
        })
    })

    describe("verify Sva value for all the years", () => {
        it("verify Sva lifetime value", () => {
            ProductPage.getValues('SVA')
            ProductPage.verifyValue('Sva', lifetime,'Lifetime')
        })

        it("verify Sva 2023 value", () => {
            ProductPage.verifyValue('Sva', yr2023,'2023')
        })

        it("verify Sva 2024 value", () => {
            ProductPage.verifyValue('Sva', yr2024,'2024')
        })

        it("verify Sva 2025 value", () => {
            ProductPage.verifyValue('Sva', yr2025,'2025')
        })

        it("verify Sva 2026 value", () => {
            ProductPage.verifyValue('Sva', yr2026,'2026')
        })

        it("verify Sva 2027 value", () => {
            ProductPage.verifyValue('Sva', yr2027,'2027')
        })
    })

    describe("verify Roe value for all the years", () => {
        it("verify Roe lifetime value", () => {
            ProductPage.getValues('ROE')
            ProductPage.verifyFloatValue('Roe', lifetime,'Lifetime')
        })

        it("verify Roe 2023 value", () => {
            ProductPage.verifyFloatValue('Roe', yr2023,'2023')
        })

        it("verify Roe 2024 value", () => {
            ProductPage.verifyFloatValue('Roe', yr2024,'2024')
        })

        it("verify Roe 2025 value", () => {
            ProductPage.verifyFloatValue('Roe', yr2025,'2025')
        })

        it("verify Roe 2026 value", () => {
            ProductPage.verifyFloatValue('Roe', yr2026,'2026')
        })

        it("verify Roe 2027 value", () => {
            ProductPage.verifyFloatValue('Roe', yr2027,'2027')
        })
    })

    describe("verify NPM value for all the years", () => {
        it("verify NPM lifetime value", () => {
            ProductPage.getValues('NPM')
            ProductPage.verifyFloatValue('NetProfitMargin', lifetime, 'Lifetime')
        })

        it("verify NPM 2023 value", () => {
            ProductPage.verifyFloatValue('NetProfitMargin', yr2023,'2023')
        })

        it("verify NPM 2024 value", () => {
            ProductPage.verifyFloatValue('NetProfitMargin', yr2024,'2024')
        })

        it("verify NPM 2025 value", () => {
            ProductPage.verifyFloatValue('NetProfitMargin', yr2025,'2025')
        })

        it("verify NPM 2026 value", () => {
            ProductPage.verifyFloatValue('NetProfitMargin', yr2026,'2026')
        })

        it("verify NPM 2027 value", () => {
            ProductPage.verifyFloatValue('NetProfitMargin', yr2027,'2027')
        })
    })

    describe("verify Margin (%) value for all the years", () => {
        it("verify Margin (%) lifetime value", () => {
            ProductPage.getValues('Margin (%)')
            ProductPage.verifyFloatValue('TotalMarginPercentage', lifetime,'Lifetime')
        })

        it("verify Margin (%) 2023 value", () => {
            ProductPage.verifyFloatValue('TotalMarginPercentage', yr2023,'2023')
        })

        it("verify Margin (%) 2024 value", () => {
            ProductPage.verifyFloatValue('TotalMarginPercentage', yr2024,'2024')
        })

        it("verify Margin (%) 2025 value", () => {
            ProductPage.verifyFloatValue('TotalMarginPercentage', yr2025,'2025')
        })

        it("verify Margin (%) 2026 value", () => {
            ProductPage.verifyFloatValue('TotalMarginPercentage', yr2026,'2026')
        })

        it("verify Margin (%) 2027 value", () => {
            ProductPage.verifyFloatValue('TotalMarginPercentage', yr2027,'2027')
        })
    })

    describe("verify Margin Including Fee (%) value for all the years", () => {
        it("verify Margin Including Fee (%) lifetime value", () => {
            ProductPage.getValues('Margin Including Fee (%)')
            ProductPage.verifyFloatValue('TotalMarginIncludingFeePercentage', lifetime,'Lifetime')
        })

        it("verify Margin Including Fee (%) 2023 value", () => {
            ProductPage.verifyFloatValue('TotalMarginIncludingFeePercentage', yr2023,'2023')
        })

        it("verify Margin Including Fee (%) 2024 value", () => {
            ProductPage.verifyFloatValue('TotalMarginIncludingFeePercentage', yr2024,'2024')
        })

        it("verify Margin Including Fee (%) 2025 value", () => {
            ProductPage.verifyFloatValue('TotalMarginIncludingFeePercentage', yr2025,'2025')
        })

        it("verify Margin Including Fee (%) 2026 value", () => {
            ProductPage.verifyFloatValue('TotalMarginIncludingFeePercentage', yr2026,'2026')
        })

        it("verify Margin Including Fee (%) 2027 value", () => {
            ProductPage.verifyFloatValue('TotalMarginIncludingFeePercentage', yr2027,'2027')
        })
    })

    describe("verify Sva Margin (%) value for all the years", () => {
        it("verify Sva Margin (%) lifetime value", () => {
            ProductPage.getValues('Sva Margin (%)')
            ProductPage.verifyFloatValue('SvaMarginPercentage', lifetime,'Lifetime')
        })

        it("verify Sva Margin (%) 2023 value", () => {
            ProductPage.verifyFloatValue('SvaMarginPercentage', yr2023,'2023')
        })

        it("verify Sva Margin (%) 2024 value", () => {
            ProductPage.verifyFloatValue('SvaMarginPercentage', yr2024,'2024')
        })

        it("verify Sva Margin (%) 2025 value", () => {
            ProductPage.verifyFloatValue('SvaMarginPercentage', yr2025,'2025')
        })

        it("verify Sva Margin (%) 2026 value", () => {
            ProductPage.verifyFloatValue('SvaMarginPercentage', yr2026,'2026')
        })

        it("verify Sva Margin (%) 2027 value", () => {
            ProductPage.verifyFloatValue('SvaMarginPercentage', yr2027,'2027')
        })
    })

    describe("verify Regulatory Capital value for all the years", () => {
        it("verify Regulatory Capital lifetime value", () => {
            ProductPage.clickRegulatoryCapitalHeading()
            ProductPage.getValues('Regulatory Capital')
            ProductPage.verifyValue('RegulatoryCapital', lifetime,'Lifetime')
        })

        it("verify Regulatory Capital 2023 value", () => {
            ProductPage.verifyValue('RegulatoryCapital', yr2023,'2023')
        })

        it("verify Regulatory Capital 2024 value", () => {
            ProductPage.verifyValue('RegulatoryCapital', yr2024,'2024')
        })

        it("verify Regulatory Capital 2025 value", () => {
            ProductPage.verifyValue('RegulatoryCapital', yr2025,'2025')
        })

        it("verify Regulatory Capital 2026 value", () => {
            ProductPage.verifyValue('RegulatoryCapital', yr2026,'2026')
        })

        it("verify Regulatory Capital 2027 value", () => {
            ProductPage.verifyValue('RegulatoryCapital', yr2027,'2027')
        })
    })

    describe("verify Credit Risk Capital value for all the years", () => {
        it("verify Credit Risk Capital lifetime value", () => {
            ProductPage.getValues('Credit Risk Capital')
            ProductPage.verifyValue('CreditRiskCapital', lifetime,'Lifetime')
        })

        it("verify Credit Risk Capital 2023 value", () => {
            ProductPage.verifyValue('CreditRiskCapital', yr2023,'2023')
        })

        it("verify Credit Risk Capital 2024 value", () => {
            ProductPage.verifyValue('CreditRiskCapital', yr2024,'2024')
        })

        it("verify Credit Risk Capital 2025 value", () => {
            ProductPage.verifyValue('CreditRiskCapital', yr2025,'2025')
        })

        it("verify Credit Risk Capital 2026 value", () => {
            ProductPage.verifyValue('CreditRiskCapital', yr2026,'2026')
        })

        it("verify Credit Risk Capital 2027 value", () => {
            ProductPage.verifyValue('CreditRiskCapital', yr2027,'2027')
        })
    })

    describe("verify Op Risk Capital value for all the years", () => {
        it("verify Op Risk Capital lifetime value", () => {
            ProductPage.getValues('Op Risk Capital')
            ProductPage.verifyValue('OpRiskCapital', lifetime,'Lifetime')
        })

        it("verify Op Risk Capital 2023 value", () => {
            ProductPage.verifyValue('OpRiskCapital', yr2023,'2023')
        })

        it("verify Op Risk Capital 2024 value", () => {
            ProductPage.verifyValue('OpRiskCapital', yr2024,'2024')
        })

        it("verify Op Risk Capital 2025 value", () => {
            ProductPage.verifyValue('OpRiskCapital', yr2025,'2025')
        })

        it("verify Op Risk Capital 2026 value", () => {
            ProductPage.verifyValue('OpRiskCapital', yr2026,'2026')
        })

        it("verify Op Risk Capital 2027 value", () => {
            ProductPage.verifyValue('OpRiskCapital', yr2027,'2027')
        })
    })

    describe("verify Other Risk Capital value for all the years", () => {
        it("verify Other Risk Capital lifetime value", () => {
            ProductPage.getValues('Other Risk Capital')
            ProductPage.verifyValue('OtherRiskCapital', lifetime,'Lifetime')
        })

        it("verify Other Risk Capital 2023 value", () => {
            ProductPage.verifyValue('OtherRiskCapital', yr2023,'2023')
        })

        it("verify Other Risk Capital 2024 value", () => {
            ProductPage.verifyValue('OtherRiskCapital', yr2024,'2024')
        })

        it("verify Other Risk Capital 2025 value", () => {
            ProductPage.verifyValue('OtherRiskCapital', yr2025,'2025')
        })

        it("verify Other Risk Capital 2026 value", () => {
            ProductPage.verifyValue('OtherRiskCapital', yr2026,'2026')
        })

        it("verify Other Risk Capital 2027 value", () => {
            ProductPage.verifyValue('OtherRiskCapital', yr2027,'2027')
        })
    })

    describe("verify Regulatory Capital (%) value for all the years", () => {
        it("verify Regulatory Capital (%) lifetime value", () => {
            ProductPage.getValues('Regulatory Capital (%)')
            ProductPage.verifyFloatValue('RegCapPercentage', lifetime,'Lifetime')
        })

        it("verify Regulatory Capital (%) 2023 value", () => {
            ProductPage.verifyFloatValue('RegCapPercentage', yr2023,'2023')
        })

        it("verify Regulatory Capital (%) 2024 value", () => {
            ProductPage.verifyFloatValue('RegCapPercentage', yr2024,'2024')
        })

        it("verify Regulatory Capital (%) 2025 value", () => {
            ProductPage.verifyFloatValue('RegCapPercentage', yr2025,'2025')
        })

        it("verify Regulatory Capital (%) 2026 value", () => {
            ProductPage.verifyFloatValue('RegCapPercentage', yr2026,'2026')
        })

        it("verify Regulatory Capital (%) 2027 value", () => {
            ProductPage.verifyFloatValue('RegCapPercentage', yr2027,'2027')
        })
    })

    describe("verify Exposure value for all the years", () => {
        it("verify Exposure lifetime value", () => {
            ProductPage.getValues('Exposure')
            ProductPage.verifyValue('Ead', lifetime,'Lifetime')
        })

        it("verify Exposure 2023 value", () => {
            ProductPage.verifyValue('Ead', yr2023,'2023')
        })

        it("verify Exposure 2024 value", () => {
            ProductPage.verifyValue('Ead', yr2024,'2024')
        })

        it("verify Exposure 2025 value", () => {
            ProductPage.verifyValue('Ead', yr2025,'2025')
        })

        it("verify Exposure 2026 value", () => {
            ProductPage.verifyValue('Ead', yr2026,'2026')
        })

        it("verify Exposure 2027 value", () => {
            ProductPage.verifyValue('Ead', yr2027,'2027')
        })
    })
