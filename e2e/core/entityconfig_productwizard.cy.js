
import ClientWizardPage from '../../pageObjects/ClientWizardPage'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import * as data from'../../fixtures/global_qa/config_productwizard.json'


const username = Cypress.env('username')
const password = Cypress.env('password')

before(() => {
    cy.login(username, password)
    TopMenuPage.addDeal()
    TopMenuPage.searchRelationship('Alpha Consulting  Imported')
    TopMenuPage.selectRelValue('Alpha Consulting')
    ClientWizardPage.clickNext()
    cy.wait(2000)
    ClientWizardPage.clickNext()
})

describe("Credit category type and its categories and product should be dispalyed",() => {

    it("credit heading should be displayed",() => {
       ProductWizardPage.validateProductName('credit',data)
    })

    it("commerical lending category should be displayed", () => {
        ProductWizardPage.validateProductCategory('credit','commercialLending',data)
    })

    it("commercial lending category products with description should be displayed", () => {
        ProductWizardPage.validateNamesAndDescription('credit','commercialLending','row1',data)
        ProductWizardPage.validateNamesAndDescription('credit','commercialLending','row2',data)
        ProductWizardPage.validateNamesAndDescription('credit','commercialLending','row3',data)
        ProductWizardPage.validateNamesAndDescription('credit','commercialLending','row4',data)
        ProductWizardPage.validateNamesAndDescription('credit','commercialLending','row5',data)
    })

    it("Asset Finance category should be displayed", () => {
        ProductWizardPage.validateProductCategory('credit','assetFinance',data)
    })

    it("asset finance category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('credit','assetFinance',data)
        ProductWizardPage.validateNamesAndDescription('credit','assetFinance','row1',data)
    })

    it("Trade solutions category should be displayed", () => {
        ProductWizardPage.validateProductCategory('credit','tradeSoultions',data)
    })

    it("Trade solutions category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('credit','tradeSoultions',data)
        ProductWizardPage.validateNamesAndDescription('credit','tradeSoultions','row1',data)
    })

})

describe("Deposit category type with categories and its product details should be displayed", () => {
    it("Deposit category type should be displayed", () => {
        ProductWizardPage.validateProductName('deposit',data)
        ProductWizardPage.selectCategoryType('deposit',data)
    })

    it("Deposit category should be displyed", () => {
        ProductWizardPage.validateProductCategory('deposit','deposit',data)
    })

    it("deposit category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('deposit','deposit',data)
        ProductWizardPage.validateNamesAndDescription('deposit','deposit','row1',data)
    })
})

describe("Service category with category types and its product details should be displayed", () => {
    it("Service category type should be displayed", () => {
        ProductWizardPage.validateProductName('service',data)
        ProductWizardPage.selectCategoryType('service',data)
    })

    it("wealth management category should be displayed", () => {
        ProductWizardPage.validateProductCategory('service','wealthManagement',data)
    })

    it("wealth maanagement category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('service','wealthManagement',data)
        ProductWizardPage.validateNamesAndDescription('service','wealthManagement','row1',data)
    })
    
    it("Transaction banking category should be displayed", () => {
        ProductWizardPage.validateProductCategory('service','transactionBanking',data)
    })

    it("Transaction banking category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('service','transactionBanking',data)
        ProductWizardPage.validateNamesAndDescription('service','transactionBanking','row1',data)
    })
    
    it("financial markets category should be displayed", () => {
        ProductWizardPage.validateProductCategory('service','financialMarkets',data)
    })

    it("financial markets category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('service','financialMarkets',data)
        ProductWizardPage.validateNamesAndDescription('service','financialMarkets','row1',data)
    })
    
    it("corporate finance category should be displayed", () => {
        ProductWizardPage.validateProductCategory('service','corporateFinance',data)
    })
    it("corporate category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('service','corporateFinance',data)
        ProductWizardPage.validateNamesAndDescription('service','corporateFinance','row1',data)
    })
    
    it("asset management category should be displayed", () => {
        ProductWizardPage.validateProductCategory('service','assetManagement',data)
    })
    
    it("asset management category products with description should be displayed", () => {
        ProductWizardPage.selectCategory('service','assetManagement',data)
        ProductWizardPage.validateNamesAndDescription('service','assetManagement','row1',data)
    })

})