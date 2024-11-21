import ApiPage from '../../pageObjects/ApiPage';
import TopMenuPage from '../../pageObjects/TopMenuPage';
import LeftNavigation from '../../pageObjects/LeftNavigation';
import ProductPage from '../../pageObjects/ProductPage';
import dayjs from 'dayjs'



const username = Cypress.env('username')
const password = Cypress.env('password')
const payload_path = 'cypress/fixtures/global_qa/payload_multiscenarioandproducts.json'
const response_path = 'cypress/fixtures/dealDetailResponse.json'
const dateNow = dayjs().unix()
const dealName = "multiproductDeal" + dateNow
const scenario1 = 'Scenario 1'
const scenario2 = 'Scenario 2'
const client1 = "Lakeview Stays Client - 1 Imported"
const product1 = "Commercial Line of Credit"
const client2 = "Lakeview Stays Client - 2 Imported"
const product2 = "Market Rate Loan"
const product3 = "Multi Loan Facility"
const product1_currency = " AUD "
const product2_currency = ' EUR '
const product3_currency = " EUR "


 describe("Create deal using API with multiple clients, products and currencies and verify", () => {
    it('Create deal', () => {
        cy.apiLogin()
        ApiPage.changeClientId1(client1, payload_path) // Update Client 1 Id that was changed due to DB drop during deployment
        ApiPage.changeClientId2(client2, payload_path) // Update Client 2 Id that was changed due to DB drop during deployment
        ApiPage.createDealWithInternalApi(payload_path, dealName)
    })
   
    it("Verify the deal should be created with the given name over API", () => {
        cy.login(username, password)
        TopMenuPage.searchValue(dealName)
        TopMenuPage.clickDealTab()
        TopMenuPage.selectTableValue(dealName)
        TopMenuPage.verifySearch(dealName)
    })

    it("Verify the deal should have scenario1 with a client and one product", () => {
        LeftNavigation.verifyScenario(scenario1)
        LeftNavigation.selectScenario(scenario1)
        LeftNavigation.verifyClientName(client1)
        LeftNavigation.selectClient(client1)
        LeftNavigation.verifyProductName(product1)
        LeftNavigation.selectProduct(product1)
        ProductPage.verifyProductCurrency(product1_currency)
    })

    it("Verify the deal should have scenario2 with a client and two products", () => {
        LeftNavigation.verifyScenario(scenario2)
        LeftNavigation.selectScenario(scenario2)
        LeftNavigation.verifyClientName(client2)
        LeftNavigation.selectClient(client2)
        LeftNavigation.verifyProductName(product2)
        LeftNavigation.selectProduct(product2)
        ProductPage.verifyProductCurrency(product2_currency)
        LeftNavigation.verifyProductName(product3)
        LeftNavigation.selectProduct(product3)
        ProductPage.verifyProductCurrency(product3_currency)
        
    })

    it("Get deal detail response and verify", () => {
        ApiPage.getDealDetails(response_path)
        ApiPage.verifyTwoScenaios(response_path, 'Scenario 1', 'Scenario 2')
        ApiPage.verifyTwoClients(response_path, client1, client2)
        ApiPage.verifyMultipleProducts(response_path, product1, product2, product3)
        ApiPage.verifyMultipleCurrencies(response_path, product1_currency, product2_currency, product3_currency)
    })


}) 