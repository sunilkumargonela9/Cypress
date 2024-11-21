import * as data from "../../fixtures/global_qa/config_termloan.json"
import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import PricingPage from '../../pageObjects/PricingPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import ProductPage from '../../pageObjects/ProductPage'
import dayjs from 'dayjs-with-plugins'

const dateNow = dayjs().unix()
const dateToday = dayjs().tz('Australia/Sydney').format('MMM D, YYYY')
const defaultMaturityDate = dayjs().add(3, 'year').tz('Australia/Sydney').format('MMM D, YYYY')
const username = Cypress.env('username')
const password = Cypress.env('password')
const prdName = Cypress.env('prdName')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const relName = Cypress.env('search_relationship')
const clientName = Cypress.env('search_client')
const validationDeal = "validationDeal" + dateNow

before(() => {
    cy.login(username, password)
    TopMenuPage.searchValue(relName)
    TopMenuPage.selectTableValue(relName)
    TopMenuPage.verifySearch(relName)
    PricingPage.verifyRelationshipName(relName)
    TopMenuPage.addDeal()
    ClientWizardPage.enterDealName(validationDeal)
    ClientWizardPage.selectClient(clientName)
    ClientWizardPage.clickNext()
    ProductWizardPage.selectProduct(prdName, relationshipName, testEnv)
    ProductWizardPage.createDeal()
    ProductPage.validateNewDealPage()
})


describe('Verify that the Pricing Page Wizard Page should have the correct heading labels', () => {
    let headers = ['General', 'Product Attributes', 'Rates', 'Fees & Costs'] // headings that will be tested

    headers.forEach((headers) => {
        it(`Verify ${headers} card headings are displayed`, () => {
            ProductPage.validateHeading(headers, data)
        })
    });
});


describe('Verify Field configurations in General Section', () => {

    // Fields that will be tested
    let dropDownFields = ['productparentEntityId','productcreditRatingCode', 'productindustryCategory', 'productindustryCode', 'productcalcModelType',
        'productcapitalClassCode', 'productproductStatus']

    dropDownFields.forEach((field) => {
        it(`Verify ${field} dropdown field configurations are correct`, () => {
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDdlDefaultValue(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
        })

        it(`Verify ${field} dropdownlist options are correct`, () => {
            ProductPage.validateDdlOptions(field, data)
            ProductPage.validateDdlTotalOptions(field, data)
        })
    })
});


describe('Verify Field configurations in Product Attributes Section', () => {

    // Fields that will be tested
    let inputTextFields = ['productvariantName', 'productname', 'productouterProductId', 'productlimit',
        'productterm', 'productutilisationRate', 'productdrawnAmount', 'producttermInDays']

    let dropDownFields = ['productsubVariant', 'productlgd', 'productcurrencyCode']

    // Tests will loop in each of the fields and check properties against the json file
    inputTextFields.forEach((field) => {
        it(`Verify ${field} input text field configurations are correct`, () => {
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDefaultValue(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
        })
    })

    dropDownFields.forEach((field) => {
        it(`Verify ${field} dropdown field configurations are correct`, () => {
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDdlDefaultValue(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
        })

        it(`Verify ${field} dropdownlist options are correct`, () => {
            ProductPage.validateDdlOptions(field, data)
            ProductPage.validateDdlTotalOptions(field, data)
            ProductPage.validateFieldIsRequired(field, data)
        })
    })

    it(`Verify Start Date configurations are correct`, () => {
        ProductPage.validateFieldName('productstartDate', data)
        ProductPage.validateStartDateField(dateToday)
        ProductPage.validateFieldIsRequired('productstartDate', data)
        ProductPage.validateStartDateFieldIsDisabled('productstartDate', data)
    })

    it(`Verify Maturity Date configurations are correct`, () => {
        ProductPage.validateFieldName('productmaturityDate', data)
        ProductPage.validateMaturityDateField(defaultMaturityDate)
        ProductPage.validateFieldIsRequired('productmaturityDate', data)
        ProductPage.validateMaturityDateFieldIsDisabled('productmaturityDate', data)

    })


});

describe('Verify Field configurations in Rates Section', () => {
    // Fields that will be tested
    let inputTextFields = ['productmarginOverReferenceRate', 'productderivedInterest', 'productderivedCOF', 'productmarginRate']

    let dropDownFields = ['productrefRate', 'productinterestRateType', 'productinterestRateFrequency', 'productrepaymentType', 'productrepaymentFrequency']

    inputTextFields.forEach((field) => {
        it(`Verify ${field} input text field configurations are correct`, () => {
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDefaultValue(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
        })
    })

    dropDownFields.forEach((field) => {
        it(`Verify ${field} dropdown field configurations are correct`, () => {
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDdlDefaultValue(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
        })

        it(`Verify ${field} dropdownlist options are correct`, () => {
            ProductPage.validateDdlOptions(field, data)
            ProductPage.validateDdlTotalOptions(field, data)
            ProductPage.validateFieldIsRequired(field, data)
        })
    })
});

describe('Verify Field configurations in Fees & Costs Section', () => {
    // Fields that will be tested
    let inputTextFields = ['productpromotionAmount']

    let dropDownFields = ['productchannelName','productpromotion']

    inputTextFields.forEach((field) => {
        it(`Verify ${field} input text field configurations are correct`, () => {
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDefaultValue(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
        })
    })

    dropDownFields.forEach((field) => {
        it(`Verify ${field} dropdown field configurations are correct`, () => {
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDdlDefaultValue(field, data)
            ProductPage.validateFieldIsRequired(field, data)
            ProductPage.validateFieldIsDisabled(field, data)
        })

        it(`Verify ${field} dropdownlist options are correct`, () => {
            ProductPage.validateDdlOptions(field, data)
            ProductPage.validateDdlTotalOptions(field, data)
            ProductPage.validateFieldIsRequired(field, data)
        })
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
        ProductPage.validateFeeIfAmortised("Establishment Fee", data, "enabled")
    })

    it('Verify Fees Table Configuration configuration for Liquidity Fee', () => {
        ProductPage.validateFeeName("Liquidity Fee", data)
        ProductPage.validatePaymentFreq("Liquidity Fee", data, "enabled")
        ProductPage.validateTableDdlFieldOptions("Liquidity Fee", data)
        ProductPage.validateStdFee("Liquidity Fee", data, "disabled")
        ProductPage.validateProposedFee("Liquidity Fee", data, "enabled")
        ProductPage.validateFeeIfWaived("Liquidity Fee", data, "enabled")
        ProductPage.validateFeeIfAmortised("Liquidity Fee", data, "disabled")
    });

    it('Verify Fees Table Configuration configuration for Commitment Fee', () => {
        ProductPage.validateFeeName("Commitment Fee", data)
        ProductPage.validatePaymentFreq("Commitment Fee", data, "enabled")
        ProductPage.validateTableDdlFieldOptions("Commitment Fee", data)
        ProductPage.validateStdFee("Commitment Fee", data, "disabled")
        ProductPage.validateProposedFee("Commitment Fee", data, "enabled")
        ProductPage.validateFeeIfWaived("Commitment Fee", data, "enabled")
        ProductPage.validateFeeIfAmortised("Commitment Fee", data, "disabled")
    });
});




