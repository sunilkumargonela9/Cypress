
import LeftNavigation from '../../pageObjects/LeftNavigation';
import ProspectPage from '../../pageObjects/ProspectPage';
import ClientPage from '../../pageObjects/ClientPage';
import ProductWizardPage from '../../pageObjects/ProductWizardPage';
import ClientWizardPage from '../../pageObjects/ClientWizardPage';
import ProductPage from '../../pageObjects/ProductPage';
import TopMenuPage from '../../pageObjects/TopMenuPage';
import PricingPage from '../../pageObjects/PricingPage'
import * as data from '../../fixtures/suncorp/config_termloan.json'
import dayjs from 'dayjs-with-plugins'



const dateNow = dayjs().unix()
const dateToday = dayjs().tz('Australia/Sydney').format('MMM D, YYYY')
const defaultMaturityDate = dayjs().add(3, 'year').tz('Australia/Sydney').format('MMM D, YYYY')
const username = Cypress.env('username')
const password = Cypress.env('password')
const testEnv = Cypress.env('testEnv')
const client_name = "suncorp_client" + dateNow
const deal_name = "Suncorp_deal" + dateNow
const product = "Term Loan"
const pricingModel = 'Commercial'
const creditRatingCode = '1'
const lgd = 'A'
const pricingModel2 = 'Development Finance'



before(() => {
    cy.login(username, password)
})


//pricing page entity configration

describe('Verify that the Product Page should have the correct heading labels', () => {

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
    })


    let headers = ['General', 'Product Attributes', 'Rates', 'Fees & Costs'] // headings that will be tested

    headers.forEach((headers) => {
        it(`Verify ${headers} card headings are displayed`, () => {
            ProductPage.validateHeading(headers, data)
        })
    });
});

describe('Verify Field configurations in General Section', () => {

    // Fields that will be tested
    let dropDownFields = ['productcreditRatingCode', 'productlgd', 'productcapitalClassCode',
        'productindustryCategory', 'productproductStatus', 'productbusinessSegment']

    it("verify productparentEntityId dropdown field configuration is correct", () => {
        let field = 'productparentEntityId'
        ProductPage.validateFieldName(field, data)
        ProductPage.validateFieldIsRequired(field, data)
        ProductPage.validateFieldIsDisabled(field, data)
        ProductPage.validateFieldIsVisible(field, data)
        ProductPage.validateClientName(field, client_name)

    })

    dropDownFields.forEach((field) => {
        it(`Verify ${field} dropdown field configurations are correct`, () => {
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDdlDefaultValue(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
            ProductPage.validateFieldIsVisible(field, data)
        })

        it(`Verify ${field} dropdownlist options are correct`, () => {
            ProductPage.validateDdlOptions(field, data)
            ProductPage.validateDdlTotalOptions(field, data)
        })
    })
});

describe('Verify Field configurations in Product Attributes Section', () => {

    // Fields that will be tested
    let checkboxes = ['productpackage', 'productredraw']
    let inputTextFields = ['productname', 'productouterProductId', 'productlimit', 'productterm',
        'productdrawnAmount', 'productutilisationRate']

    checkboxes.forEach((field) => {
        it(`verify ${field} checkbox configurations are correct`, () => {
            ProductPage.validateCheckBoxFieldName(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
            ProductPage.validateFieldIsVisible(field, data)
        })
    })


    // Tests will loop in each of the fields and check properties against the json file
    inputTextFields.forEach((field) => {
        it(`Verify ${field} input text field configurations are correct`, () => {
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDefaultValue(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
            ProductPage.validateFieldIsVisible(field, data)
        })
    })


    it("verify utilization rate field rule ", () => {
        ProductPage.verifyUtilisationRateFieldRule('productutilisationRate', pricingModel, product)
    })


    it(`Verify Start Date configurations are correct`, () => {
        ProductPage.validateFieldName('productstartDate', data)
        ProductPage.validateStartDateField(dateToday)
        ProductPage.validateFieldIsRequired('productstartDate', data)
        ProductPage.validateStartDateFieldIsDisabled('productstartDate', data)
        ProductPage.validateFieldIsVisible('productstartDate', data)
    })

    it(`Verify Maturity Date configurations are correct`, () => {
        ProductPage.validateFieldName('productmaturityDate', data)
        ProductPage.validateMaturityDateField(defaultMaturityDate)
        ProductPage.validateFieldIsRequired('productmaturityDate', data)
        ProductPage.validateMaturityDateFieldIsDisabled('productmaturityDate', data)
        ProductPage.validateFieldIsVisible('productmaturityDate', data)

    })

});

describe('Verify Field configurations in Rates Section', () => {
    // Fields that will be tested
    let inputTextFields = ['productmarginOverReferenceRate', 'productderivedCOF', 'productderivedInterest']

    let dropDownFields = ['productrepaymentType', 'productrefRate']

    inputTextFields.forEach((field) => {
        it(`Verify ${field} input text field configurations are correct`, () => {
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDefaultValue(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
            ProductPage.validateFieldIsVisible(field, data)
        })
    })

    dropDownFields.forEach((field) => {
        it(`Verify ${field} dropdown field configurations are correct`, () => {
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDdlDefaultValue(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
            ProductPage.validateFieldIsVisible(field, data)
        })

        it(`Verify ${field} dropdownlist options are correct`, () => {
            ProductPage.validateDdlOptions(field, data)
            ProductPage.validateDdlTotalOptions(field, data)
        })
    })

    it("verify Interest Rate Type dropdown field configurations and rules are correct", () => {
        let field = 'productinterestRateType'
        ProductPage.validateFieldName(field, data)
        ProductPage.validateDdlDefaultValue(field, data)
        ProductPage.validateFieldIsRequired(field, data)
        ProductPage.validateFieldIsDisabled(field, data)
        ProductPage.validateFieldIsVisible(field, data)

    })

    it("verify Timing dropdown field configurations and rules are correct", () => {
        let field = "producttiming"
        ProductPage.validateFieldName(field, data)
        ProductPage.validateDdlDefaultValue(field, data)
        ProductPage.validateFieldIsRequired(field, data)
        ProductPage.validateFieldIsDisabled(field, data)
        ProductPage.validateFieldIsVisible(field, data)

    })

    it("verify Repayment frequency dropdown field configurations and rules are corrrect", () => {
        let field = "productrepaymentFrequency"
        ProductPage.validateFieldName(field, data)
        ProductPage.validateDdlDefaultValue(field, data)
        ProductPage.validateFieldIsRequired(field, data)
        ProductPage.validateFieldIsDisabled(field, data)
        ProductPage.validateFieldIsVisible(field, data)
    })

    it("Verify Residual value and Balloon value rules", () => {
        ProductPage.verifyResidualAndBallonValueFieldRules('productresidualValue', 'productballoonValue')
    })

});

describe('Verify Field configurations in Fees & Costs Section', () => {

    it(`Verify Is Brokerage Dollar Amount checkbox field configuration`, () => {
        let field = 'productisBrokerageDollarAmount'
        ProductPage.validateCheckBoxFieldName(field, data)
        ProductPage.validateFieldIsRequired(field, data)
        ProductPage.validateFieldIsDisabled(field, data)
        ProductPage.validateFieldIsVisible(field, data)
    })

    it("Verify Brokerage percent amount field configuration and rule is correct", () => {
        let field = "productbrokeragePercentAmount"
        ProductPage.validateFieldName(field, data)
        ProductPage.validateDefaultValue(field, data)
        ProductPage.validateFieldIsRequired(field, data)
        ProductPage.validateFieldIsDisabled(field, data)
        ProductPage.verifyBrokeragePercentAmountFieldRule(field, 'productlimit')
    })

    it("Verify Brokerage field configuration and rule is correct", () => {
        let field = "productbrokerage"
        let field2 = 'productbrokerageDollarAmount'
        // ProductPage.verifyBrokerageFieldRule(field, field2)
        ProductPage.validateFieldName(field, data)
        ProductPage.validateDefaultValue(field, data)
        ProductPage.validateFieldIsRequired(field, data)
        ProductPage.validateFieldIsDisabled(field, data)
    })

    it("Verify Trail field configuration and rule is correct", () => {
        let field = "producttrail"
        ProductPage.validateFieldName(field, data)
        ProductPage.validateDefaultValue(field, data)
        ProductPage.validateFieldIsRequired(field, data)
        ProductPage.validateFieldIsVisible(field, data)
        ProductPage.verifyTrailFieldRule(field, product)
    })

});

describe('Verify that the Pricing Page Wizard Page should have the Fees and Cost table configuratrion', () => {
    let headers = ['Fee Name', 'Frequency', 'Standard', 'Proposed', "Waive", "Amortise"] // headings that will be tested

    headers.forEach((headers) => {
        it(`Verify ${headers} table headings are displayed`, () => {
            ProductPage.validateTableHeadings(headers, data)
        })
    });

    it('Verify Fees Table Configuration configuration for Establishment Fee', () => {
        ProductPage.validateFeeName("Establishment Fee", data)
        ProductPage.validatePaymentFreq("Establishment Fee", data, "disabled")
        ProductPage.validateStdFee("Establishment Fee", data, "disabled")
        ProductPage.validateProposedFee("Establishment Fee", data, "enabled")
        ProductPage.validateFeeIfWaived("Establishment Fee", data, "enabled")
        ProductPage.validateFeeIfAmortised("Establishment Fee", data, "disabled")
    })

    it('Verify Fees Table Configuration configuration for Line Fee', () => {
        ProductPage.validateFeeName("Line Fee", data)
        ProductPage.validatePaymentFreq("Line Fee", data, "enabled")
        ProductPage.validateTableDdlFieldOptions("Line Fee", data)
        ProductPage.validateStdFee("Line Fee", data, "disabled")
        ProductPage.validateProposedFee("Line Fee", data, "enabled")
        ProductPage.validateFeeIfWaived("Line Fee", data, "enabled")
        ProductPage.validateFeeIfAmortised("Line Fee", data, "disabled")
    });

    it('Verify Fees Table Configuration configuration for Account Maintenance Fee', () => {
        ProductPage.validateFeeName("Account Maintenance Fee", data)
        ProductPage.validatePaymentFreq("Account Maintenance Fee", data, "enabled")
        ProductPage.validateTableDdlFieldOptions("Account Maintenance Fee", data)
        ProductPage.validateStdFee("Account Maintenance Fee", data, "disabled")
        ProductPage.validateProposedFee("Account Maintenance Fee", data, "enabled")
        ProductPage.validateFeeIfWaived("Account Maintenance Fee", data, "enabled")
        ProductPage.validateFeeIfAmortised("Account Maintenance Fee", data, "disabled")
    });

    it('Verify Fees Table Configuration configuration for Unused Limit Fee', () => {
        ProductPage.validateFeeName("Unused Limit Fee", data)
        ProductPage.validatePaymentFreq("Unused Limit Fee", data, "enabled")
        ProductPage.validateTableDdlFieldOptions("Unused Limit Fee", data)
        ProductPage.validateStdFee("Unused Limit Fee", data, "disabled")
        ProductPage.validateProposedFee("Unused Limit Fee", data, "enabled")
        ProductPage.validateFeeIfWaived("Unused Limit Fee", data, "enabled")
        ProductPage.validateFeeIfAmortised("Unused Limit Fee", data, "disabled")
    });

    it("verify Brokerage dollar amount field configuration and rule is correct", () => {
        ProductPage.enterMandatoryFields('suncorp_qa', 'Commercial Term Loan')
        PricingPage.selectProduct('Commercial Term Loan')
        let field = 'productbrokerageDollarAmount'
        let field2 = 'productisBrokerageDollarAmount'
        ProductPage.verifyBrokerageDollarAmountfield(field, field2)
    })

    it("verify Eligible for 100% Res RW field configuration is and rule is correct", () => {
        ProductPage.selectPricingModel(pricingModel2)
        let field = "producteligibleForResidentialRW"
        ProductPage.validateFieldName(field, data)
        ProductPage.validateFieldIsRequired(field, data)
        ProductPage.verifyTrailFieldRule(field, product)
        ProductPage.clickSave()
    })

})






