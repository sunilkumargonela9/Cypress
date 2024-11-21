import TopMenuPage from '../../pageObjects/TopMenuPage'
import PricingPage from '../../pageObjects/PricingPage'
import dayjs from 'dayjs'


const username = Cypress.env('username')
const password = Cypress.env('password')
const dealName = Cypress.env('search_deal')
const relationshipName = Cypress.env('search_relationship')
const testEnv = Cypress.env('testEnv')
const dateNow = dayjs().unix()

before(() => {
	cy.login(username, password)
	TopMenuPage.searchValue(dealName) // Select Deal to be used in testing
	TopMenuPage.clickDealTab()
	TopMenuPage.selectTableExactVal(dealName)
})

describe('User should be able to copy the deal', () => {
	
	it('User should be able click on the copy icon for a deal', () => {
		PricingPage.clickCopyDeal()
	})

	it('User should be able to validate the text on the pop up and choose cancel', () => {
		let popupTitle= "Copy this deal?"
		PricingPage.verifyPopupTitle(popupTitle)
		PricingPage.cancelDealPopUp()
	})
	
	it('User should be able to copy the deal', () => {
		PricingPage.clickCopyDeal()
		PricingPage.copyDealPopup()
	})
	it('User should be able to rename, save and verify if copied deal is created', () => {
		let copiedDealName= "Copied deal "+ dateNow
		PricingPage.enterCopiedDealName(copiedDealName)
		PricingPage.saveCopiedDeal()
		PricingPage.verifyNewDealName(copiedDealName)
	})
	
})
