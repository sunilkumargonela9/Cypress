
import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import * as data from'../../fixtures/fitb_qa/config_productwizard.json'


const username = Cypress.env('username')
const password = Cypress.env('password')
before(() => {
    cy.login(username, password)
    TopMenuPage.addDeal()
    TopMenuPage.searchValue('Alpha Consulting')
    TopMenuPage.selectTableValue('Alpha Consulting')
    ClientWizardPage.clickNext()
    cy.wait(2000)
    ClientWizardPage.selectClient('Alpha Consulting Client - 1')
    cy.wait(2000)
    ClientWizardPage.clickNext()
})

describe("Credit category type and its categories and product should be displayed",() => {

    it("Credit class heading should be displayed",() => {
       ProductWizardPage.validateProductName('credit',data)
    })

    it("Commerical Lending category should be displayed", () => {
        ProductWizardPage.validateProductCategory('credit','commercialLending',data)
    })

    it("Commercial Lending category products with description should be displayed", () => {
        ProductWizardPage.validateNamesAndDescription('credit','commercialLending','row1',data)
        ProductWizardPage.validateNamesAndDescription('credit','commercialLending','row2',data)
        ProductWizardPage.validateNamesAndDescription('credit','commercialLending','row3',data)
        ProductWizardPage.validateNamesAndDescription('credit','commercialLending','row4',data)
        ProductWizardPage.validateNamesAndDescription('credit','commercialLending','row5',data)
        ProductWizardPage.validateNamesAndDescription('credit','commercialLending','row6',data)
    })

    it("Equipment Finance category should be displayed", () => {
        ProductWizardPage.validateProductCategory('credit','equipmentFinance',data)
    })

    it("Equipment Finance category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('credit','equipmentFinance',data)
        ProductWizardPage.validateNamesAndDescription('credit','equipmentFinance','row1',data)
        ProductWizardPage.validateNamesAndDescription('credit','equipmentFinance','row2',data)
        ProductWizardPage.validateNamesAndDescription('credit','equipmentFinance','row3',data)
        ProductWizardPage.validateNamesAndDescription('credit','equipmentFinance','row4',data)
        ProductWizardPage.validateNamesAndDescription('credit','equipmentFinance','row5',data)
        ProductWizardPage.validateNamesAndDescription('credit','equipmentFinance','row6',data)
        ProductWizardPage.validateNamesAndDescription('credit','equipmentFinance','row7',data)
    })

    it("Trade Solutions category should be displayed", () => {
        ProductWizardPage.validateProductCategory('credit','tradeSoultions',data)
    })

    it("Trade Solutions category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('credit','tradeSoultions',data)
        ProductWizardPage.validateNamesAndDescription('credit','tradeSoultions','row1',data)
        ProductWizardPage.validateNamesAndDescription('credit','tradeSoultions','row2',data)
        ProductWizardPage.validateNamesAndDescription('credit','tradeSoultions','row3',data)
        ProductWizardPage.validateNamesAndDescription('credit','tradeSoultions','row4',data)
        ProductWizardPage.validateNamesAndDescription('credit','tradeSoultions','row5',data)
        ProductWizardPage.validateNamesAndDescription('credit','tradeSoultions','row6',data)
        ProductWizardPage.validateNamesAndDescription('credit','tradeSoultions','row7',data)
    })

    it("Financial Risk Management category should be displayed", () => {
        ProductWizardPage.validateProductCategory('credit','financialRiskManagement',data)
    })

    it("Financial Risk Management category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('credit','financialRiskManagement',data)
        ProductWizardPage.validateNamesAndDescription('credit','financialRiskManagement','row1',data)
        ProductWizardPage.validateNamesAndDescription('credit','financialRiskManagement','row2',data)
    })

})

describe("Deposit category type with categories and its product details should be displayed", () => {
    
     it("Deposit class heading should be displayed",() => {
        ProductWizardPage.validateProductName('deposit',data)
        ProductWizardPage.selectCategoryType('deposit',data)
    })

    it("Certificates of Deposit category should be displyed", () => {
        ProductWizardPage.validateProductCategory('deposit','certificateofdeposit',data)
    })

    it("Certificates of Deposit category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('deposit','certificateofdeposit',data)
        ProductWizardPage.validateNamesAndDescription('deposit','certificateofdeposit','row1',data)
    })

    it("Deposit category should be displyed", () => {
        ProductWizardPage.validateProductCategory('deposit','deposit',data)
    })

    it("Deposit category products with description should be displayed", () => {
        ProductWizardPage.selectCategoryExactMatch('deposit','deposit',data)
        ProductWizardPage.validateNamesAndDescription('deposit','deposit','row1',data)      
        ProductWizardPage.validateNamesAndDescription('deposit','deposit','row2',data)
        ProductWizardPage.validateNamesAndDescription('deposit','deposit','row3',data)
        ProductWizardPage.validateNamesAndDescription('deposit','deposit','row4',data)
        ProductWizardPage.validateNamesAndDescription('deposit','deposit','row5',data)
        ProductWizardPage.validateNamesAndDescription('deposit','deposit','row6',data)
    })

    it("Savings category should be displyed", () => {
        ProductWizardPage.validateProductCategory('deposit','savings',data)
    })

    it("Savings category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('deposit','savings',data)
        ProductWizardPage.validateNamesAndDescription('deposit','savings','row1',data)
        ProductWizardPage.validateNamesAndDescription('deposit','savings','row2',data)
        ProductWizardPage.validateNamesAndDescription('deposit','savings','row3',data)
    })

})

describe("Service category with category types and its product details should be displayed", () => {
    it("Service class heading should be displayed",() => {
        ProductWizardPage.validateProductName('service',data)
        ProductWizardPage.selectCategoryType('service',data)
    })

    it("Treasury management category should be displayed", () => {
        ProductWizardPage.validateProductCategory('service','treasuryManagement',data)
    })

    it("Treasury maanagement category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('service','treasuryManagement',data)
        ProductWizardPage.validateNamesAndDescription('service','treasuryManagement','row1',data)
        ProductWizardPage.validateNamesAndDescription('service','treasuryManagement','row2',data)
        ProductWizardPage.validateNamesAndDescription('service','treasuryManagement','row3',data)
        ProductWizardPage.validateNamesAndDescription('service','treasuryManagement','row4',data)
        ProductWizardPage.validateNamesAndDescription('service','treasuryManagement','row5',data)
    })
    
    it("Other category should be displayed", () => {
        ProductWizardPage.validateProductCategory('service','other',data)
    })

    it("Other category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('service','other',data)
        ProductWizardPage.validateNamesAndDescription('service','other','row1',data)
        ProductWizardPage.validateNamesAndDescription('service','other','row2',data)
        ProductWizardPage.validateNamesAndDescription('service','other','row3',data)
        ProductWizardPage.validateNamesAndDescription('service','other','row4',data)
        ProductWizardPage.validateNamesAndDescription('service','other','row5',data)
        ProductWizardPage.validateNamesAndDescription('service','other','row6',data)
    })
    
    it("Capital markets category should be displayed", () => {
        ProductWizardPage.validateProductCategory('service','capitalMarkets',data)
    })

    it("Capital markets category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('service','capitalMarkets',data)
        ProductWizardPage.validateNamesAndDescription('service','capitalMarkets','row1',data)
        ProductWizardPage.validateNamesAndDescription('service','capitalMarkets','row2',data)
        ProductWizardPage.validateNamesAndDescription('service','capitalMarkets','row3',data)
        ProductWizardPage.validateNamesAndDescription('service','capitalMarkets','row4',data)
        ProductWizardPage.validateNamesAndDescription('service','capitalMarkets','row5',data)
        ProductWizardPage.validateNamesAndDescription('service','capitalMarkets','row6',data)
        ProductWizardPage.validateNamesAndDescription('service','capitalMarkets','row7',data)
        ProductWizardPage.validateNamesAndDescription('service','capitalMarkets','row8',data)
    })

})