import * as data from "../../fixtures/fitb_qa/config_supplychainfinance.json"
import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import PricingPage from '../../pageObjects/PricingPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import ProductPage from '../../pageObjects/ProductPage'
import dayjs from 'dayjs'

const dateNow = dayjs().unix()
const dateToday = dayjs().format('MMM D, YYYY')
const defaultMaturityDate = dayjs().add(3, 'year').format('MMM D, YYYY')
const username = Cypress.env('username')
const password = Cypress.env('password')
const prdCategory = "Trade Solutions"
const prdName = "Supply Chain Finance"
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const relName = Cypress.env('search_relationship')
const clientName = Cypress.env('search_client')
const validationDeal = "validateSupplyChainFinance" + dateNow

before(() => {
    cy.login(username, password)
    TopMenuPage.searchValue(relName)
    TopMenuPage.selectTableExactVal(relName)
    TopMenuPage.verifySearch(relName)
    PricingPage.verifyRelationshipName(relName)
    TopMenuPage.addDeal()
    ClientWizardPage.enterDealName(validationDeal)
    ClientWizardPage.selectClient(clientName)
    ClientWizardPage.clickNext()
    ProductWizardPage.selectProductCat(prdCategory)
    ProductWizardPage.selectProduct(prdName, relationshipName, testEnv)
    ProductWizardPage.createDeal()
    ProductPage.validateNewDealPage()
})


describe('Verify that the Pricing Page Wizard Page should have the correct heading labels', () => {
    let headers = ['General', 'Product Attributes','Fees & Costs'] // headings that will be tested

    headers.forEach((headers) => {
        it(`Verify ${headers} card headings are displayed`, () => {
            ProductPage.validateHeading(headers, data)
        })
    });
});


describe('Verify Field configurations in General Section', () => {

    // Fields that will be tested
    let inputTextFields = data.fieldsData["GeneralInputFields"]
    let dropDownFields = data.fieldsData["GeneralDropDownFields"]

    // Tests will loop in each of the fields and check properties against the json file
    inputTextFields.forEach((field) => {
        it(`Verify ${field} input text field configurations are correct`, () => {
            ProductPage.validateFieldName(field, data)
            ProductPage.validateDefaultTextValue(field, data)
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
    let inputTextFields = data.fieldsData["ProdAttrInputFields"]
    let dropDownFields = data.fieldsData["ProdAttrDropDownFields"]

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


describe('Verify that the Pricing Page Wizard Page should have the Fees and Cost table configuratrion', () => {
    let headers = ['Fee Name', 'Frequency', 'Proposed', "Waive"] // headings that will be tested

    headers.forEach((headers) => {
        it(`Verify ${headers} table headings are displayed`, () => {
            ProductPage.validateTableHeadings(headers, data)
        })
    });

    it('Verify Fees Table Configuration configuration for Other - One Time', () => {
        ProductPage.validateFeeName("Other - One Time", data)
        ProductPage.validatePaymentFreq("Other - One Time", data, "enabled")
        ProductPage.validateTableDdlFieldOptions("Other - One Time", data)
        ProductPage.validateProposedFee("Other - One Time", data, "enabled")
        ProductPage.validateFeeIfWaived("Other - One Time", data, "enabled")
    })

    it('Verify Fees Table Configuration configuration for Arranger Fee - Syndication', () => {
        ProductPage.validateFeeName("Arranger Fee - Syndication", data)
        ProductPage.validatePaymentFreq("Arranger Fee - Syndication", data, "enabled")
        ProductPage.validateTableDdlFieldOptions("Arranger Fee - Syndication", data)
        ProductPage.validateProposedFee("Arranger Fee - Syndication", data, "enabled")
        ProductPage.validateFeeIfWaived("Arranger Fee - Syndication", data, "enabled")
    })

    it('Verify Fees Table Configuration configuration for Syndication Servicing Fee ', () => {
        ProductPage.validateFeeName("Syndication Servicing Fee", data)
        ProductPage.validatePaymentFreq("Syndication Servicing Fee", data, "enabled")
        ProductPage.validateTableDdlFieldOptions("Syndication Servicing Fee", data)
        ProductPage.validateProposedFee("Syndication Servicing Fee", data, "enabled")
        ProductPage.validateFeeIfWaived("Syndication Servicing Fee", data, "enabled")
    })

});

describe('Verify user should be able to save product on existing deal', () => {

    it('Validate Error Message if required fields are not populated', () => {
		ProductPage.verifyErrorMessage('Please fill in all mandatory fields to proceed.')	
	})

	it('User should be able to successfully input mandatory field values and save the deal', () => {
		ProductPage.enterMandatoryFields(testEnv, prdName)
	})

});