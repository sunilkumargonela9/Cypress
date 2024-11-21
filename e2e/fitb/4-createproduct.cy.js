import LeftNavigation from '../../pageObjects/LeftNavigation'
import ProspectPage from '../../pageObjects/ProspectPage'
import TopMenuPage from '../../pageObjects/TopMenuPage'
import ProductWizardPage from '../../pageObjects/ProductWizardPage'
import ProductPage from '../../pageObjects/ProductPage'

const username = Cypress.env('username')
const password = Cypress.env('password')
const dealName = Cypress.env('search_deal')
const scenarioName = Cypress.env('scenario_one')
const clientName = Cypress.env('search_client')
const prdName = Cypress.env('prdName')
const creditRatng = Cypress.env('creditrating')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')



before(() => {
	cy.login(username, password)
	TopMenuPage.searchValue(dealName) 	// Select Deal to be used in testing
	TopMenuPage.clickDealTab()
	TopMenuPage.selectTableExactVal(dealName)

})

describe('User should be able to add a product on existing deal', () => {

	it('User should be able to select a scenario and client', () => {
		LeftNavigation.selectScenario(scenarioName)
		LeftNavigation.selectClient(clientName)
	})

	it('User should be able to Add product and choose product', () => {
		ProductWizardPage.clickAddProduct()
		ProductWizardPage.selectProduct(prdName)
		ProductWizardPage.createDeal()
	})

	it('Validate the inherited fields', () => {
		ProductPage.verifyClientName(testEnv,clientName)
		ProductPage.verifyInheritedFields(testEnv)	
	})

	it('Validate Error Message if required fields are not populated', () => {
		ProductPage.verifyErrorMessage('Please fill in all mandatory fields to proceed.')	
	})

	it('User should be able to successfully input field values and save the deal', () => {
		ProductPage.enterMandatoryFields(testEnv, prdName)
	})
})


