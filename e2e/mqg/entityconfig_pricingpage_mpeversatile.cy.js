import * as data from "../../fixtures/mqg_qa/config_mpeversatile.json"
import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import PricingPage from '../../pageObjects/PricingPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import ProductPage from '../../pageObjects/ProductPage'
import dayjs from 'dayjs'
import * as product from'../../fixtures/mqg_qa/config_productwizard.json'

const dateToday = dayjs().format('MMM D, YYYY')
const defaultMaturityDate = dayjs().add(1, 'year').format('MMM D, YYYY')
const username = Cypress.env('username')
const password = Cypress.env('password')
const prdName4 = Cypress.env('prdName4')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const relName = Cypress.env('search_relationship')
const clientName = Cypress.env('search_client')

before(() => {
    cy.login(username, password)
    TopMenuPage.searchValue(relName)
    TopMenuPage.selectTableValue(relName)
    TopMenuPage.verifySearch(relName)
    PricingPage.verifyRelationshipName(relName)
    TopMenuPage.addDeal()
    ClientWizardPage.selectClient(clientName)
    ClientWizardPage.clickNext()
    ProductWizardPage.selectCategoryType('lending',product)
    ProductWizardPage.selectNoOfProductPerPage('50') // Select Number of products per page
    cy.wait(1000)
    ProductWizardPage.selectProduct(prdName4, relationshipName, testEnv)
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
    let inputTextFields = ['productvariantName', 'productname', 'productouterProductId', 'productindicativeLimit']

    let dropDownFields = ['productproductStatus', 'productbusinessSegment', 'productoverrideIndicativeLimit']

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
        })
    })
});


describe('Verify Field configurations in Product Attributes Section', () => {

    // Fields that will be tested
    let inputTextFields = ['productlimit', 'productdrawnAmount', 'productlgdPercent']

    let dropDownFields = ['productcurrencyCode', 'productcreditRatingCode', 'producttreatmentType', 'productloanPurpose', 'productmixedSecurityOption',
                        'productsecurityType', 'productlvr', 'productlGDOverride']

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

});

describe('Verify Field configurations in Rates Section', () => {
    // Fields that will be tested
    let inputTextFields = ['productterm', 'productderivedCOF', 'productmarginOverReferenceRate', 'productderivedInterest', 'productmarginRate', 'productpBRate']

    let dropDownFields = ['productrepaymentType', 'productinterestRateType', 'productrefRate']

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

describe('Verify that the Pricing Page Wizard Page should have the Fees and Cost table configuratrion', () => {
    let headers = ['Fee Name', 'Frequency', 'Standard', 'Proposed', "Waive"] // headings that will be tested

    headers.forEach((headers) => {
        it(`Verify ${headers} table headings are displayed`, () => {
            ProductPage.validateTableHeadings(headers, data)
        })
    });

    it('Verify Fees Table Configuration configuration for Commitment Fee', () => {
        ProductPage.validateFeeName("Commitment Fee", data)
        ProductPage.validatePaymentFreq("Commitment Fee", data, "disabled")
        ProductPage.validateTableDdlFieldOptions("Commitment Fee", data)
        ProductPage.validateStdFee("Commitment Fee", data, "disabled")
        ProductPage.validateProposedFee("Commitment Fee", data, "enabled")
        ProductPage.validateFeeIfWaived("Commitment Fee", data, "disabled")
    });

    it('Verify Fees Table Configuration configuration for Renegotiation Fees', () => {
        ProductPage.validateFeeName("Renegotiation Fees", data)
        ProductPage.validatePaymentFreq("Renegotiation Fees", data, "disabled")
        ProductPage.validateStdFee("Renegotiation Fees", data, "disabled")
        ProductPage.validateProposedFee("Renegotiation Fees", data, "enabled")
        ProductPage.validateFeeIfWaived("Renegotiation Fees", data, "enabled")
    });

    it('Verify Fees Table Configuration configuration for Document & Settlement Fees', () => {
        ProductPage.validateFeeName("Document & Settlement Fees", data)
        ProductPage.validatePaymentFreq("Document & Settlement Fees", data, "disabled")
        ProductPage.validateStdFee("Document & Settlement Fees", data, "disabled")
        ProductPage.validateProposedFee("Document & Settlement Fees", data, "enabled")
        ProductPage.validateFeeIfWaived("Document & Settlement Fees", data, "enabled")
    });

    it('Verify Fees Table Configuration configuration for Facility Fees', () => {
        ProductPage.validateFeeName("Facility Fees", data)
        ProductPage.validatePaymentFreq("Facility Fees", data, "disabled")
        ProductPage.validateTableDdlFieldOptions("Facility Fees", data)
        ProductPage.validateStdFee("Facility Fees", data, "disabled")
        ProductPage.validateProposedFee("Facility Fees", data, "enabled")
        ProductPage.validateFeeIfWaived("Facility Fees", data, "enabled")
    });

    it('Verify Fees Table Configuration configuration for Establishment Fee', () => {
        ProductPage.validateFeeName("Establishment Fee", data)
        ProductPage.validatePaymentFreq("Establishment Fee", data, "disabled")
        ProductPage.validateStdFee("Establishment Fee", data, "disabled")
        ProductPage.validateProposedFee("Establishment Fee", data, "enabled")
        ProductPage.validateFeeIfWaived("Establishment Fee", data, "enabled")
    });
});

